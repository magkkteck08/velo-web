"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// --- TYPES ---
type Player = { id: number; name: string; position: string; pace: number; shooting: number; passing: number; defense: number; overall: number; };

// --- CONSTANTS ---
const AI_CLUBS = ["Neon City FC", "Quantum United", "Cyber Titans", "Apex Rovers", "Lagos Giants", "Abuja Rangers", "Kano Pillars United", "Enyimba Reborn"];
const STADIUMS = ["Velo Arena, Lagos", "Quantum Stadium, Abuja", "Neon Park, Kano", "Cyber Bowl, Port Harcourt"];
const WEATHER = ["🌤 Clear", "⛅ Overcast", "🌧 Light Rain", "🌞 Sunny", "💨 Windy"];
const COMMENTARIES_ATTACK = [ (n:string)=>`${n} surges forward with purpose!`, (n:string)=>`Beautiful footwork from ${n}!`, (n:string)=>`${n} looking for a gap in the defense...`, (n:string)=>`${n} brings it forward.` ];
const COMMENTARIES_PASS = [ (a:string,b:string)=>`${a} threads it through to ${b}.`, (a:string,b:string)=>`Crisp pass from ${a} to ${b}.`, (a:string,b:string)=>`${a} switches play to ${b}.`, (a:string,b:string)=>`${a} keeps possession, finds ${b}.` ];
const COMMENTARIES_SHOOT = [ (n:string)=>`${n} winds up and SHOOTS!`, (n:string)=>`${n} tries his luck!`, (n:string)=>`A strike from ${n}!!!` ];
const COMMENTARIES_TACKLE = [ (n:string)=>`Crucial tackle by ${n}!`, (n:string)=>`${n} wins the ball back.`, (n:string)=>`Great interception from ${n}.` ];
const COMMENTARIES_MISS = [ "The keeper saves it easily.", "Just wide of the post!", "Over the bar. Goal kick.", "Blocked by the defense!" ];

export default function GamePage() {
  // Dynamic User ID
  const [userId, setUserId] = useState<number | null>(null);
  const [squad, setSquad] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [drafting, setDrafting] = useState(false);
  
  // App Navigation State
  const [screen, setScreen] = useState<"boot" | "squad" | "prematch" | "match" | "result">("boot");
  
  // Match Configuration
  const [formation, setFormation] = useState("4-3-3");
  const [aiName, setAiName] = useState("");
  const [aiOvr, setAiOvr] = useState(0);
  const [matchDetails, setMatchDetails] = useState<any>({});
  
  // Post-Match State
  const [matchResult, setMatchResult] = useState<any>(null);

  // --- 0. AUTHENTICATION CHECK ---
  useEffect(() => {
    const savedUser = localStorage.getItem("velo_user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUserId(parsedUser.id);
    } else {
      window.location.href = "/login"; 
    }
  }, []);

  // --- 1. BOOT SEQUENCE ---
  const [bootStep, setBootStep] = useState(0);
  const bootMessages = ["Loading player database...", "Initialising match engine...", "Connecting to Python Backend...", "Calibrating physics...", "Ready."];

  useEffect(() => {
    if (userId === null) return; // Wait until we know who is logged in

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setBootStep(step);
      if (step >= bootMessages.length) {
        clearInterval(interval);
        fetchSquad(); 
      }
    }, 400);
    return () => clearInterval(interval);
  }, [userId]);

  const fetchSquad = async () => {
    try {
      const res = await fetch(`https://velo-backend-ajjw.onrender.com/api/game/squad/${userId}`);
      if (res.ok) setSquad(await res.json());
    } catch (e) { console.error(e); } 
    finally { setLoading(false); setScreen("squad"); }
  };

  const handleDraftSquad = async () => {
    setDrafting(true);
    // FIXED: Updated endpoint to match the new backend route
    const res = await fetch(`https://velo-backend-ajjw.onrender.com/api/game/draft/${userId}`, { method: "POST" });
    if (res.ok) await fetchSquad();
    setDrafting(false);
  };

  // --- 2. PREMATCH SETUP ---
  const setupPrematch = () => {
    setAiName(AI_CLUBS[Math.floor(Math.random() * AI_CLUBS.length)]);
    setAiOvr(Math.floor(Math.random() * 15) + 65);
    setMatchDetails({
      stadium: STADIUMS[Math.floor(Math.random() * STADIUMS.length)],
      weather: WEATHER[Math.floor(Math.random() * WEATHER.length)],
      attendance: (Math.floor(Math.random() * 30000) + 15000).toLocaleString(),
      kickoff: `${19 + Math.floor(Math.random() * 3)}:${Math.random() > 0.5 ? '30' : '00'}`,
      league: `VELO Premier League · Matchday ${Math.floor(Math.random() * 20) + 1}`
    });
    setScreen("prematch");
  };

  // --- 3. LIVE MATCH ENGINE (CANVAS) ---
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<any>({
    homeScore: 0, awayScore: 0, minute: 0, isHalftime: false, matchOver: false,
    stats: { shots: [0,0], passes: [0,0], poss: [50,50] },
    scorers: [] as any[], ratings: {} as any, goals: {} as any
  });

  useEffect(() => {
    if (screen !== "match") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    let clockInterval: NodeJS.Timeout;
    const wrap = document.getElementById('canvasWrap');
    if (wrap) { canvas.width = wrap.offsetWidth; canvas.height = wrap.offsetHeight; }
    const W = canvas.width, H = canvas.height;

    // Reset Engine Data
    const eng = engineRef.current;
    eng.homeScore = 0; eng.awayScore = 0; eng.minute = 0; eng.isHalftime = false; eng.matchOver = false;
    eng.stats = { shots: [0,0], passes: [0,0], poss: [50,50] };
    eng.scorers = []; eng.ratings = {}; eng.goals = {};
    squad.forEach(p => { eng.ratings[p.name] = 6.0; eng.goals[p.name] = 0; });

    // Generate Teams based on Formation
    const generateAI = () => {
      const positions = ["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "FWD", "FWD", "FWD"];
      return positions.map((pos, i) => ({ id: i, name: `AI ${i+1}`, position: pos, pace: 70, shooting: 65, passing: 65, defense: 65, overall: aiOvr }));
    };
    const aiSquad = generateAI();

    const FORMATIONS: any = { '4-3-3': [[1],[4],[3],[3]], '4-4-2': [[1],[4],[4],[2]], '3-5-2': [[1],[3],[5],[2]], '4-2-3-1': [[1],[4],[2],[3],[1]] };
    const homeRows = FORMATIONS[formation] || FORMATIONS['4-3-3'];
    const awayRows = FORMATIONS['4-3-3']; 

    // BUILD TEAM WITH PROPER KICKOFF ZONING (No overlap)
    const buildTeam = (isHome: boolean, data: any[], struct: number[][]) => {
      const team: any[] = []; let pi = 0;
      const roleNames = ['GK','DEF','MID','FWD'];
      struct.forEach((count: number[], r: number) => {
        const roleName = roleNames[Math.min(r, roleNames.length - 1)];
        for(let i=0; i<count[0]; i++) {
          const depthSpacing = 0.12; 
          const startX = 0.05 + (r * depthSpacing); 
          const baseX = isHome ? W * startX : W * (1 - startX);
          const baseY = (H / (count[0] + 1)) * (i + 1);
          
          const p = data[pi] || { name: 'Player', pace: 65, overall: 65 };
          team.push({
            id: `${isHome?'H':'A'}${pi}`, x: baseX, y: baseY, baseX, baseY,
            isHome, role: roleName,
            name: p.name.split(' ')[0], fullName: p.name, overall: p.overall,
            speed: (p.pace/100)*2.5 + 0.5, 
            shooting: p.shooting || 65, passing: p.passing || 65
          });
          pi++;
        }
      });
      return team;
    };

    const homePlayers = buildTeam(true, squad, homeRows);
    const awayPlayers = buildTeam(false, aiSquad, awayRows);
    const allPlayers = [...homePlayers, ...awayPlayers];

    // Physics Variables
    let ball = { x: W/2, y: H/2, vx: 0, vy: 0, isFree: true, owner: null as any };
    let ballCarrier: any = null;
    let possHome = true;
    let actionCD = 0;
    let possFrames = [0,0];
    let frame = 0, lastCommFrame = 0;
    
    // UI Helpers
    const setDOM = (id: string, text: string | number) => { const el = document.getElementById(id); if(el) el.textContent = String(text); };
    const setWidth = (id: string, pct: number) => { const el = document.getElementById(id); if(el) el.style.width = `${pct}%`; };
    const commHistArr: string[] = [];
    const setComm = (text: string) => {
        const current = document.getElementById('commText')?.textContent;
        if (current && current !== "Waiting for kick off...") {
            if(commHistArr.length >= 2) commHistArr.shift();
            commHistArr.push(current);
            const histEl = document.getElementById('commHist');
            if(histEl) histEl.innerHTML = commHistArr.map(t => `<div class="comm-hist-item">${t}</div>`).join('');
        }
        setDOM('commText', text);
    };

    // --- REALISTIC MATCH CLOCK & DB SAVING ---
    clockInterval = setInterval(() => {
      if (eng.matchOver) return;
      eng.minute++;
      setDOM('sbMin', `${String(eng.minute).padStart(2, '0')}:00`);
      
      if (eng.minute === 45 && !eng.isHalftime) {
        eng.isHalftime = true;
        document.getElementById('htOverlay')?.classList.add('show');
        setDOM('htScore', `${eng.homeScore} — ${eng.awayScore}`);
        setDOM('htDominance', eng.homeScore > eng.awayScore ? "Your team leading at the break!" : eng.awayScore > eng.homeScore ? `${aiName} ahead at halftime.` : "Level at the break — tense!");
        setComm("HALF TIME WHISTLE! Players head to the tunnel.");
      }
      
      if (eng.minute >= 90) {
        clearInterval(clockInterval);
        eng.matchOver = true;
        cancelAnimationFrame(rafId);
        
        // SECURE: Send Match Result to Python Database & Collect Coins
        fetch(`https://velo-backend-ajjw.onrender.com/api/game/match-result/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                opponent: aiName, 
                home_score: eng.homeScore, 
                away_score: eng.awayScore 
            })
        })
        .then(res => res.json())
        .then(data => {
            setTimeout(() => {
                setMatchResult({
                    score: { home: eng.homeScore, away: eng.awayScore },
                    stats: eng.stats, scorers: eng.scorers, ratings: eng.ratings, goals: eng.goals,
                    coinsEarned: data.coins_earned // Catch the coins from Python!
                });
                setScreen("result");
            }, 800);
        })
        .catch(err => {
            console.error("Failed to save match:", err);
            // Fallback if backend drops so player doesn't get stuck
            setTimeout(() => {
                setMatchResult({ score: { home: eng.homeScore, away: eng.awayScore }, stats: eng.stats, scorers: eng.scorers, ratings: eng.ratings, goals: eng.goals, coinsEarned: 0 });
                setScreen("result");
            }, 800);
        });
      }
    }, 1300); 

    const drawPitch = () => {
      for(let i=0; i<8; i++) { ctx.fillStyle = i%2===0 ? '#011a0e' : '#012212'; ctx.fillRect(i*(W/8), 0, W/8, H); }
      ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 2;
      ctx.strokeRect(4,4,W-8,H-8); ctx.beginPath(); ctx.moveTo(W/2,4); ctx.lineTo(W/2,H-4); ctx.stroke();
      ctx.beginPath(); ctx.arc(W/2,H/2,H*0.22,0,Math.PI*2); ctx.stroke();
      const pa=H*0.44, px=W*0.14, py=(H-pa)/2; ctx.strokeRect(4,py,px,pa); ctx.strokeRect(W-4-px,py,px,pa);
      const sb=H*0.22, sx=W*0.06, sy=(H-sb)/2; ctx.strokeRect(4,sy,sx,sb); ctx.strokeRect(W-4-sx,sy,sx,sb);
      ctx.fillStyle = 'rgba(255,255,255,.12)'; const gh=H*0.18, gy=(H-gh)/2; ctx.fillRect(0,gy,8,gh); ctx.fillRect(W-8,gy,8,gh);
    };

    const triggerGoal = (isHome: boolean) => {
      ball.isFree = true; ball.vx = 0; ball.vy = 0;
      const forwards = (isHome ? homePlayers : awayPlayers).filter(p => p.role === 'FWD' || p.role === 'MID');
      const scorer = forwards.length > 0 ? forwards[Math.floor(Math.random()*forwards.length)] : (isHome?homePlayers:awayPlayers)[0];
      
      if (isHome) {
        eng.homeScore++; eng.scorers.push({ name: scorer.fullName, min: eng.minute, isHome: true });
        eng.goals[scorer.fullName] += 1; eng.ratings[scorer.fullName] += 1.5;
      } else {
        eng.awayScore++; eng.scorers.push({ name: scorer.name, min: eng.minute, isHome: false });
      }

      setDOM('goalScorerText', `${scorer.name} · ${eng.minute}'`);
      document.getElementById('goalFlash')?.classList.add('show');
      setComm(`⚽ GOOOAL! ${scorer.name} scores! ${eng.homeScore} — ${eng.awayScore}!`);
      setDOM('sbScore', `${eng.homeScore} — ${eng.awayScore}`);

      setTimeout(() => {
        document.getElementById('goalFlash')?.classList.remove('show');
        ball = { x: W/2, y: H/2, vx: 0, vy: 0, isFree: true, owner: null };
        ballCarrier = null; possHome = true;
        allPlayers.forEach(p => { p.x = p.baseX; p.y = p.baseY; }); 
      }, 3000);
    };

    const loop = () => {
      if (eng.matchOver && !eng.isHalftime) return;
      if (eng.isHalftime) { rafId = requestAnimationFrame(loop); return; }
      frame++; ctx.clearRect(0,0,W,H); drawPitch(); actionCD--;

      // BALL PHYSICS
      if (ball.isFree) {
        ball.x += ball.vx; ball.y += ball.vy; 
        ball.vx *= 0.95; ball.vy *= 0.95; 
        if(ball.x <= 8 || ball.x >= W-8) { ball.vx *= -1; ball.x = Math.max(8, Math.min(W-8, ball.x)); }
        if(ball.y <= 8 || ball.y >= H-8) { ball.vy *= -1; ball.y = Math.max(8, Math.min(H-8, ball.y)); }
      }

      // GOAL DETECTION
      const gh = H * 0.18, gy = (H - gh) / 2;
      if (ball.isFree) {
        if(ball.x <= 8 && ball.y > gy && ball.y < gy+gh) { triggerGoal(false); return; }
        if(ball.x >= W-8 && ball.y > gy && ball.y < gy+gh) { triggerGoal(true); return; }
      }

      // FIND CLOSEST FIELD PLAYER
      let cHome = null, cAway = null, mhd = Infinity, mad = Infinity;
      allPlayers.forEach(p => {
        const d = Math.hypot(p.x - ball.x, p.y - ball.y);
        if(p.isHome && p.role !== 'GK' && d < mhd) { mhd = d; cHome = p; }
        if(!p.isHome && p.role !== 'GK' && d < mad) { mad = d; cAway = p; }
      });

      // STATS TRACKING
      if (ballCarrier) { if(ballCarrier.isHome) possFrames[0]++; else possFrames[1]++; }
      const totalPF = possFrames[0] + possFrames[1] || 1;
      const possH = Math.round((possFrames[0] / totalPF) * 100);
      if (frame % 30 === 0) {
        eng.stats.poss = [possH, 100 - possH];
        setDOM('sbPossH', `${possH}%`); setDOM('sbPossA', `${100-possH}%`);
        setWidth('fillPossH', possH/2); setWidth('fillPossA', (100-possH)/2);
        const sH = eng.stats.shots[0], sA = eng.stats.shots[1], maxS = Math.max(sH+sA, 2);
        setDOM('sbShotsH', sH); setDOM('sbShotsA', sA); setWidth('fillShotsH', (sH/maxS)*48); setWidth('fillShotsA', (sA/maxS)*48);
        const pH = eng.stats.passes[0], pA = eng.stats.passes[1], maxP = Math.max(pH+pA, 2);
        setDOM('sbPassH', pH); setDOM('sbPassA', pA); setWidth('fillPassH', (pH/maxP)*48); setWidth('fillPassA', (pA/maxP)*48);
      }

      // --- MOVEMENT LOGIC ---
      allPlayers.forEach(p => {
        let tx = p.baseX;
        let ty = p.baseY;

        if (p.role === 'GK') {
           tx = p.baseX;
           ty = Math.max(H/2 - 30, Math.min(H/2 + 30, ball.y)); 
        } else {
           let shiftX = 0;
           if (p.role === 'DEF') {
             shiftX = (ball.x - W/2) * 0.15; 
             if (possHome !== p.isHome) ty += (H/2 - p.baseY) * 0.3; 
           } else if (p.role === 'MID') {
             shiftX = (ball.x - W/2) * 0.4; 
             ty += (ball.y - p.baseY) * 0.25; 
           } else if (p.role === 'FWD') {
             shiftX = (ball.x - W/2) * 0.25; 
             if (possHome === p.isHome) shiftX += p.isHome ? 60 : -60; 
             ty += (ball.y - p.baseY) * 0.15; 
           }

           tx += shiftX;

           if (p.role === 'DEF') {
               if (p.isHome) tx = Math.min(tx, W * 0.55);
               else tx = Math.max(tx, W * 0.45);
           }

           if (ballCarrier === p) {
             tx = p.isHome ? W*0.92 : W*0.08; 
             ty = H/2 + (Math.random()-0.5)*H*0.1;
             ball.x = p.x + (p.isHome ? 8 : -8);
             ball.y = p.y;
           } else if (p === (p.isHome ? cHome : cAway) && possHome !== p.isHome) {
             tx = ball.x;
             ty = ball.y;
           }
        }

        const dx = tx - p.x, dy = ty - p.y, dist = Math.hypot(dx, dy);
        let spd = p.speed;
        if(ballCarrier === p) spd *= 0.85; 
        if((p === cHome || p === cAway) && !ballCarrier && p.role !== 'GK') spd *= 1.4; 
        
        if(dist > 2) { p.x += (dx/dist)*spd; p.y += (dy/dist)*spd; }

        if (ball.isFree && Math.hypot(p.x - ball.x, p.y - ball.y) < 14 && p.role !== 'GK') {
          ball.isFree = false; ballCarrier = p; possHome = p.isHome;
          if (frame - lastCommFrame > 60) { setComm(COMMENTARIES_TACKLE[Math.floor(Math.random()*COMMENTARIES_TACKLE.length)](p.name)); lastCommFrame = frame; }
          if (eng.ratings[p.fullName]) eng.ratings[p.fullName] += 0.1;
        }

        ctx.beginPath(); ctx.ellipse(p.x, p.y + (p.role==='GK'?9:7), (p.role==='GK'?9:7)*0.9, (p.role==='GK'?9:7)*0.3, 0, 0, Math.PI*2); ctx.fillStyle='rgba(0,0,0,.3)'; ctx.fill(); 
        const r = p.role === 'GK' ? 9 : 7;
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI*2);
        ctx.fillStyle = p.isHome ? '#0a1525' : '#1a0505'; ctx.strokeStyle = p.isHome ? '#a3e635' : '#ef4444';
        ctx.lineWidth = ballCarrier === p ? 3 : 2; ctx.fill(); ctx.stroke();

        if (ballCarrier === p) {
          ctx.beginPath(); ctx.arc(p.x, p.y, r+5, 0, Math.PI*2); ctx.strokeStyle = p.isHome ? 'rgba(163,230,53,.4)' : 'rgba(239,68,68,.4)'; ctx.lineWidth=2; ctx.stroke();
          ctx.fillStyle = '#ffffff'; ctx.font = 'bold 9px "Cabinet Grotesk", sans-serif'; ctx.textAlign = 'center'; ctx.fillText(p.name.toUpperCase(), p.x, p.y+r+13);
        }
        if (p.role === 'GK') {
          ctx.fillStyle = p.isHome ? 'rgba(163,230,53,.9)' : 'rgba(239,68,68,.9)';
          ctx.font = 'bold 7px "Cabinet Grotesk", sans-serif'; ctx.textAlign = 'center'; ctx.fillText('GK', p.x, p.y+3);
        }
      });

      if (ballCarrier && actionCD <= 0) {
        const atRight = ballCarrier.isHome;
        const distGoal = atRight ? W - ballCarrier.x : ballCarrier.x;
        const shootChance = distGoal < W*0.25 ? (ballCarrier.shooting/100)*0.7 : 0.02; 

        if (Math.random() < shootChance) {
          setComm(COMMENTARIES_SHOOT[Math.floor(Math.random()*COMMENTARIES_SHOOT.length)](ballCarrier.name)); lastCommFrame = frame;
          if(ballCarrier.isHome) eng.stats.shots[0]++; else eng.stats.shots[1]++;
          ball.vx = atRight ? 12 : -12; ball.vy = (Math.random() - 0.5) * 8; ball.isFree = true; ballCarrier = null; actionCD = 60;
          setTimeout(() => { if(ball.isFree && Math.abs(ball.vx)>2) setComm(COMMENTARIES_MISS[Math.floor(Math.random()*COMMENTARIES_MISS.length)]); }, 800);
        } else if (Math.random() < 0.4) { 
          const teammates = allPlayers.filter(p => p.isHome === ballCarrier.isHome && p.id !== ballCarrier.id && (atRight ? p.x > ballCarrier.x+10 : p.x < ballCarrier.x-10));
          if (teammates.length > 0) {
            const target = teammates[Math.floor(Math.random()*teammates.length)];
            if(frame - lastCommFrame > 30) { setComm(COMMENTARIES_PASS[Math.floor(Math.random()*COMMENTARIES_PASS.length)](ballCarrier.name, target.name)); lastCommFrame = frame; }
            const pdx = target.x - ballCarrier.x, pdy = target.y - ballCarrier.y, pd = Math.hypot(pdx, pdy);
            ball.vx = (pdx/pd)*9; ball.vy = (pdy/pd)*9; 
            ball.isFree = true; ballCarrier = null; actionCD = 40; 
            if(atRight) eng.stats.passes[0]++; else eng.stats.passes[1]++;
          }
        }
      }

      if (ball.isFree) {
        ctx.beginPath(); ctx.ellipse(ball.x, ball.y+6, 4.5, 1.5, 0, 0, Math.PI*2); ctx.fillStyle='rgba(0,0,0,.3)'; ctx.fill(); 
        ctx.beginPath(); ctx.arc(ball.x, ball.y, 5, 0, Math.PI*2); ctx.fillStyle = '#ffffff'; ctx.fill();
        ctx.beginPath(); ctx.arc(ball.x, ball.y, 5, 0, Math.PI*2); ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth=1; ctx.stroke();
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(rafId); clearInterval(clockInterval); };
  }, [screen, formation, squad, aiName, aiOvr]);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&family=Cabinet+Grotesk:wght@400;700;800;900&display=swap');
        :root{ --navy:#020509;--navy2:#060d1a;--navy3:#0a1525; --el:#00e5ff;--lime:#a3e635;--org:#ff5722;--red:#ef4444;--gold:#ffd700; --w:#f0f4ff;--g:#5a6a8a;--b:rgba(0,229,255,0.15); }
        .screen-container { width: 100%; min-height: calc(100vh - 100px); display: flex; flex-direction: column; animation: fadeIn 0.6s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .boot-logo{font-family:'Bebas Neue',sans-serif;font-size:clamp(5rem,12vw,11rem);letter-spacing:.08em;color:var(--w);line-height:.9;text-align:center}
        .boot-logo em{color:var(--el);font-style:normal;text-shadow:0 0 60px rgba(0,229,255,.5)}
        .scoreboard{background:rgba(2,5,9,.95);border-bottom:1px solid var(--b);padding:10px 28px;display:flex;align-items:center;justify-content:space-between;z-index:5}
        .sb-score{font-family:'Bebas Neue',sans-serif;font-size:3rem;line-height:1;letter-spacing:.08em;color:var(--w);text-shadow:0 0 30px rgba(0,229,255,.2)}
        .sb-min{font-family:'Share Tech Mono',monospace;font-size:.78rem;color:var(--el);letter-spacing:.05em}
        .stat-bars{background:rgba(2,5,9,.9);border-bottom:1px solid rgba(0,229,255,.06);padding:6px 28px;display:flex;gap:20px;align-items:center;}
        .sbar-track{flex:1;height:3px;background:rgba(255,255,255,.06);position:relative;overflow:visible}
        .sbar-fill-home{position:absolute;right:50%;top:0;height:100%;background:var(--lime);transition:width .5s ease;transform-origin:right}
        .sbar-fill-away{position:absolute;left:50%;top:0;height:100%;background:var(--red);transition:width .5s ease}
        .goal-flash{position:absolute;inset:0;pointer-events:none;z-index:100;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .3s}
        .goal-flash.show{opacity:1}
        .goal-text{font-family:'Bebas Neue',sans-serif;font-size:clamp(4rem,12vw,10rem);color:var(--gold);text-shadow:0 0 60px rgba(255,215,0,.8),0 0 120px rgba(255,215,0,.4);animation:goalPop .5s cubic-bezier(.34,1.56,.64,1)}
        @keyframes goalPop{0%{transform:scale(.3) rotate(-8deg);opacity:0}100%{transform:scale(1) rotate(0);opacity:1}}
        .commentary{background:rgba(2,5,9,.95);border-top:1px solid rgba(0,229,255,.07);padding:10px 28px;display:flex;align-items:center;gap:14px;min-height:48px}
        .halftime-overlay{position:absolute;inset:0;background:rgba(2,5,9,.96);display:flex;align-items:center;justify-content:center;z-index:200;opacity:0;pointer-events:none;transition:opacity .5s;flex-direction:column;gap:16px}
        .halftime-overlay.show{opacity:1;pointer-events:all}
      `}</style>

      <div className="min-h-screen bg-[#020509] pt-[100px] pb-[60px] text-w">
        <div className="px-7 lg:px-20 max-w-[1400px] mx-auto relative">
          
          {screen === "boot" && (
            <div className="screen-container items-center justify-center pt-20">
              <div className="boot-logo">VE<em>LO</em><br/>FM</div>
              <div style={{ fontSize:'.72rem', fontWeight:800, letterSpacing:'.3em', textTransform:'uppercase', color:'var(--g)', marginTop:16, textAlign:'center' }}>Football Manager · Season 2025/26</div>
              <div style={{ width:300, height:2, background:'rgba(255,255,255,.08)', marginTop:48, overflow:'hidden' }}>
                <div style={{ height:'100%', background:'var(--el)', boxShadow:'0 0 12px var(--el)', width:`${(bootStep / bootMessages.length) * 100}%`, transition:'width .1s linear' }}></div>
              </div>
              <div style={{ fontSize:'.62rem', fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--g)', marginTop:10 }}>{bootMessages[Math.min(bootStep, bootMessages.length - 1)]}</div>
            </div>
          )}

          {screen === "squad" && (
            <div className="screen-container">
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid var(--b)', paddingBottom:16, marginBottom:28 }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'2.2rem', letterSpacing:'.1em', color:'var(--w)' }}>VELO <em style={{color:'var(--el)', fontStyle:'normal'}}>FM</em></div>
                <div style={{ display:'flex', alignItems:'center', gap:20 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontSize:'.62rem', fontWeight:800, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--g)' }}>Formation:</span>
                    {['4-3-3', '4-4-2', '3-5-2', '4-2-3-1'].map(f => (
                      <button key={f} onClick={() => setFormation(f)} style={{ fontSize:'.7rem', fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', padding:'7px 16px', border:'1px solid var(--b)', background: formation === f ? 'var(--el)' : 'transparent', color: formation === f ? 'var(--navy)' : 'var(--g)', transition:'all .2s' }}>{f}</button>
                    ))}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <span style={{ fontSize:'.62rem', fontWeight:800, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--g)' }}>Team OVR</span>
                    <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'2.4rem', color:'var(--lime)', lineHeight:1 }}>{squad.length > 0 ? Math.round(squad.reduce((a,p)=>a+p.overall,0)/squad.length) : '—'}</span>
                  </div>
                </div>
              </div>
              
              {squad.length === 0 ? (
                <div style={{ textAlign:'center', padding:'100px 0' }}>
                  <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'4rem', marginBottom:20 }}>YOUR CLUB IS EMPTY</h2>
                  <button onClick={handleDraftSquad} disabled={drafting} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.4rem', letterSpacing:'.2em', color:'var(--navy)', background:'var(--lime)', border:'none', padding:'18px 56px' }}>{drafting ? "DRAFTING..." : "▶ DRAFT STARTING XI"}</button>
                </div>
              ) : (
                <>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:16, marginBottom:28 }}>
                    {squad.slice(0, 11).map(p => (
                      <div key={p.id} style={{ background:'var(--navy2)', border:'1px solid var(--b)', padding:16, position:'relative', overflow:'hidden' }}>
                        <div style={{ position:'absolute', right:-8, top:-16, fontFamily:"'Bebas Neue',sans-serif", fontSize:'6rem', color:'rgba(255,255,255,.03)', lineHeight:1, pointerEvents:'none' }}>{p.overall}</div>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'2.4rem', lineHeight:1, color: p.overall >= 80 ? 'var(--gold)' : p.overall >= 72 ? 'var(--el)' : 'var(--w)' }}>{p.overall}</div>
                          <div style={{ fontSize:'.65rem', fontWeight:900, letterSpacing:'.12em', background:'var(--w)', color:'var(--navy)', padding:'2px 7px' }}>{p.position}</div>
                        </div>
                        <div style={{ fontWeight:800, fontSize:'.9rem', textTransform:'uppercase', letterSpacing:'.04em', marginBottom:10, color:'var(--w)' }}>{p.name}</div>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4px 10px', fontSize:'.65rem', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--g)', borderTop:'1px solid var(--b)', paddingTop:8 }}>
                          <div>PAC <span style={{color:'var(--w)'}}>{p.pace}</span></div><div>SHO <span style={{color:'var(--w)'}}>{p.shooting}</span></div>
                          <div>PAS <span style={{color:'var(--w)'}}>{p.passing}</span></div><div>DEF <span style={{color:'var(--w)'}}>{p.defense}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:'flex', justifyContent:'center', paddingBottom:32 }}>
                    <button onClick={setupPrematch} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.4rem', letterSpacing:'.2em', color:'var(--navy)', background:'var(--lime)', border:'none', padding:'18px 56px' }}>▶ SELECT MATCH</button>
                  </div>
                </>
              )}
            </div>
          )}

          {screen === "prematch" && (
            <div className="screen-container items-center justify-center border border-[var(--b)] bg-[#010812] relative overflow-hidden" style={{ minHeight: '600px' }}>
              <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(0,229,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,.04) 1px,transparent 1px)', backgroundSize:'48px 48px' }}></div>
              <div style={{ position:'relative', zIndex:2, textAlign:'center', width:'100%', maxWidth:800, padding:'0 32px' }}>
                <div style={{ fontSize:'.65rem', fontWeight:800, letterSpacing:'.3em', textTransform:'uppercase', color:'var(--el)', marginBottom:20 }}>{matchDetails.league}</div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:40, marginBottom:32 }}>
                  <div style={{ flex:1, maxWidth:280, textAlign:'right' }}>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(2rem,5vw,4rem)', letterSpacing:'.06em', lineHeight:'.95', color:'var(--lime)' }}>YOUR CLUB</div>
                    <div style={{ fontSize:'.65rem', fontWeight:800, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--g)', marginTop:8 }}>OVR {Math.round(squad.reduce((a,p)=>a+p.overall,0)/squad.length)}</div>
                  </div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(3rem,8vw,6rem)', color:'var(--el)', letterSpacing:'.05em', textShadow:'0 0 40px rgba(0,229,255,.4)', flexShrink:0 }}>VS</div>
                  <div style={{ flex:1, maxWidth:280, textAlign:'left' }}>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(2rem,5vw,4rem)', letterSpacing:'.06em', lineHeight:'.95', color:'var(--red)' }}>{aiName}</div>
                    <div style={{ fontSize:'.65rem', fontWeight:800, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--g)', marginTop:8 }}>OVR {aiOvr}</div>
                  </div>
                </div>
                <div style={{ display:'flex', justifyContent:'center', gap:32, marginBottom:40 }}>
                  <div style={{ textAlign:'center' }}><div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.2rem', color:'var(--w)', letterSpacing:'.08em' }}>{matchDetails.stadium}</div><div style={{ fontSize:'.58rem', fontWeight:700, letterSpacing:'.15em', textTransform:'uppercase', color:'var(--g)', marginTop:2 }}>Venue</div></div>
                  <div style={{ textAlign:'center' }}><div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.2rem', color:'var(--w)', letterSpacing:'.08em' }}>{matchDetails.weather}</div><div style={{ fontSize:'.58rem', fontWeight:700, letterSpacing:'.15em', textTransform:'uppercase', color:'var(--g)', marginTop:2 }}>Weather</div></div>
                  <div style={{ textAlign:'center' }}><div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.2rem', color:'var(--w)', letterSpacing:'.08em' }}>{matchDetails.attendance}</div><div style={{ fontSize:'.58rem', fontWeight:700, letterSpacing:'.15em', textTransform:'uppercase', color:'var(--g)', marginTop:2 }}>Attendance</div></div>
                </div>
                <button onClick={() => setScreen("match")} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.1rem', letterSpacing:'.2em', color:'var(--navy)', background:'var(--el)', border:'none', padding:'16px 48px', boxShadow:'0 0 30px rgba(0,229,255,.5)' }}>⚽ KICK OFF</button>
              </div>
            </div>
          )}

          {screen === "match" && (
            <div className="screen-container border border-[var(--b)]" style={{ minHeight: '650px' }}>
              <div className="scoreboard">
                <div style={{ display:'flex', flexDirection:'column' }}><div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.1rem', letterSpacing:'.1em', color:'var(--lime)' }}>YOUR CLUB</div><div style={{ fontSize:'.55rem', fontWeight:700, letterSpacing:'.15em', textTransform:'uppercase', color:'var(--g)' }}>OVR {Math.round(squad.reduce((a,p)=>a+p.overall,0)/squad.length)}</div></div>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}><div className="sb-score" id="sbScore">0 — 0</div><div style={{ display:'flex', alignItems:'center', gap:8 }}><div style={{ display:'flex', alignItems:'center', gap:5, fontSize:'.55rem', fontWeight:800, letterSpacing:'.15em', textTransform:'uppercase', color:'var(--red)' }}><div style={{ width:6, height:6, background:'var(--red)', borderRadius:'50%' }}></div>LIVE</div><div className="sb-min" id="sbMin">00:00</div></div></div>
                <div style={{ display:'flex', flexDirection:'column', textAlign:'right' }}><div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.1rem', letterSpacing:'.1em', color:'var(--red)' }}>{aiName}</div><div style={{ fontSize:'.55rem', fontWeight:700, letterSpacing:'.15em', textTransform:'uppercase', color:'var(--g)' }}>OVR {aiOvr}</div></div>
              </div>

              <div className="stat-bars">
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'.62rem', color:'var(--w)', width:28, textAlign:'right' }} id="sbPossH">50%</div>
                <div style={{ display:'flex', alignItems:'center', gap:8, flex:1 }}><span style={{ fontSize:'.55rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--g)', width:72, textAlign:'right' }}>Possession</span><div className="sbar-track"><div style={{ width:1, height:8, background:'var(--g)', position:'absolute', left:'50%', top:-2.5 }}></div><div className="sbar-fill-home" id="fillPossH" style={{ width:'25%' }}></div><div className="sbar-fill-away" id="fillPossA" style={{ width:'25%' }}></div></div></div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'.62rem', color:'var(--w)', width:28 }} id="sbPossA">50%</div>&nbsp;&nbsp;
                
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'.62rem', color:'var(--w)', width:28, textAlign:'right' }} id="sbShotsH">0</div>
                <div style={{ display:'flex', alignItems:'center', gap:8, flex:1 }}><span style={{ fontSize:'.55rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--g)', width:72, textAlign:'right' }}>Shots</span><div className="sbar-track"><div style={{ width:1, height:8, background:'var(--g)', position:'absolute', left:'50%', top:-2.5 }}></div><div className="sbar-fill-home" id="fillShotsH" style={{ width:'0%' }}></div><div className="sbar-fill-away" id="fillShotsA" style={{ width:'0%' }}></div></div></div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'.62rem', color:'var(--w)', width:28 }} id="sbShotsA">0</div>&nbsp;&nbsp;
                
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'.62rem', color:'var(--w)', width:28, textAlign:'right' }} id="sbPassH">0</div>
                <div style={{ display:'flex', alignItems:'center', gap:8, flex:1 }}><span style={{ fontSize:'.55rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--g)', width:72, textAlign:'right' }}>Passes</span><div className="sbar-track"><div style={{ width:1, height:8, background:'var(--g)', position:'absolute', left:'50%', top:-2.5 }}></div><div className="sbar-fill-home" id="fillPassH" style={{ width:'0%' }}></div><div className="sbar-fill-away" id="fillPassA" style={{ width:'0%' }}></div></div></div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'.62rem', color:'var(--w)', width:28 }} id="sbPassA">0</div>
              </div>

              <div id="canvasWrap" style={{ flex:1, position:'relative', overflow:'hidden', minHeight:'400px' }}>
                <canvas ref={canvasRef} id="mc" style={{ width:'100%', height:'100%', display:'block' }}></canvas>
                
                <div className="goal-flash" id="goalFlash"><div style={{ textAlign:'center' }}><div className="goal-text">GOAL!</div><div id="goalScorerText" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(1.2rem,4vw,2.5rem)', letterSpacing:'.15em', color:'var(--w)', marginTop:8, textAlign:'center' }}></div></div></div>
                
                <div className="halftime-overlay" id="htOverlay">
                  <div style={{ fontSize:'.65rem', fontWeight:800, letterSpacing:'.3em', textTransform:'uppercase', color:'var(--g)' }}>Half Time</div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(3rem,8vw,7rem)', letterSpacing:'.08em', color:'var(--w)' }}>WHISTLE!</div>
                  <div id="htScore" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(2rem,6vw,5rem)', color:'var(--el)', letterSpacing:'.1em' }}>0 — 0</div>
                  <div id="htDominance" style={{ fontSize:'.65rem', fontWeight:800, letterSpacing:'.3em', textTransform:'uppercase', color:'var(--g)' }}></div>
                  <button 
                    onClick={() => { 
                      document.getElementById('htOverlay')?.classList.remove('show'); 
                      engineRef.current.isHalftime = false;
                      const commEl = document.getElementById('commText');
                      if (commEl) commEl.textContent = "THE SECOND HALF IS UNDERWAY!";
                    }} 
                    style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1rem', letterSpacing:'.18em', color:'var(--navy)', background:'var(--el)', border:'none', padding:'14px 40px', marginTop:8 }}>
                    ▶ SECOND HALF
                  </button>
                </div>
              </div>

              <div className="commentary">
                <div style={{ width:7, height:7, borderRadius:'50%', background:'var(--lime)', boxShadow:'0 0 8px var(--lime)', flexShrink:0 }}></div>
                <div id="commText" style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'.78rem', color:'var(--w)', textTransform:'uppercase', letterSpacing:'.06em' }}>Waiting for kick off...</div>
                <div id="commHist" style={{ display:'flex', gap:12, overflow:'hidden', flex:1, justifyContent:'flex-end' }}></div>
              </div>
            </div>
          )}

          {screen === "result" && matchResult && (
            <div className="screen-container">
              <div style={{ textAlign:'center', marginBottom:40, paddingBottom:32, borderBottom:'1px solid var(--b)' }}>
                <div style={{ fontSize:'.65rem', fontWeight:800, letterSpacing:'.3em', textTransform:'uppercase', color:'var(--g)', marginBottom:12 }}>Full Time · VELO Premier League</div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(2rem,6vw,5rem)', letterSpacing:'.05em', marginBottom:16, color: matchResult.score.home > matchResult.score.away ? 'var(--lime)' : matchResult.score.home < matchResult.score.away ? 'var(--red)' : 'var(--el)' }}>
                    {matchResult.score.home > matchResult.score.away ? 'VICTORY' : matchResult.score.home < matchResult.score.away ? 'DEFEAT' : 'DRAW'}
                </div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:32, marginBottom:16 }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(1.5rem,4vw,3rem)', letterSpacing:'.06em', color:'var(--lime)' }}>YOUR CLUB</div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(3rem,8vw,6rem)', color:'var(--el)', border:'1px solid var(--b)', padding:'8px 32px', lineHeight:1, background:'var(--navy2)', letterSpacing:'.08em', textShadow:'0 0 30px rgba(0,229,255,.3)' }}>{matchResult.score.home} — {matchResult.score.away}</div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(1.5rem,4vw,3rem)', letterSpacing:'.06em', color:'var(--red)' }}>{aiName}</div>
                </div>
                
                {/* --- NEW: VELO COINS REWARD BADGE --- */}
                {matchResult.coinsEarned !== undefined && (
                  <div style={{ marginTop: 24, display: 'inline-block', background: 'rgba(163,230,53,0.05)', border: '1px solid var(--lime)', padding: '12px 32px' }}>
                    <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize: '1.8rem', color: 'var(--lime)', letterSpacing: '0.1em' }}>
                      +{matchResult.coinsEarned} VELO COINS EARNED
                    </span>
                  </div>
                )}
              </div>
              
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginBottom:28 }}>
                <div style={{ background:'var(--navy2)', border:'1px solid var(--b)', padding:28 }}>
                  <div style={{ fontSize:'.62rem', fontWeight:800, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--el)', borderBottom:'1px solid var(--b)', paddingBottom:10, marginBottom:16 }}>⚽ Goalscorers</div>
                  {matchResult.scorers.length === 0 ? <div style={{ color:'var(--g)', fontSize:'.82rem', fontStyle:'italic' }}>No goals</div> : matchResult.scorers.map((s:any, i:number) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'6px 0', borderBottom:'1px solid rgba(255,255,255,.04)', fontSize:'.82rem', color:'var(--w)' }}>
                      <span style={{ fontSize:'1rem' }}>⚽</span><span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'.65rem', color:'var(--el)', width:32 }}>{s.min}&apos;</span><span style={{ color: s.isHome ? 'var(--lime)' : 'var(--red)' }}>{s.name}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background:'var(--navy2)', border:'1px solid var(--b)', padding:28 }}>
                  <div style={{ fontSize:'.62rem', fontWeight:800, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--el)', borderBottom:'1px solid var(--b)', paddingBottom:10, marginBottom:16 }}>📊 Match Stats</div>
                  {[ ['Possession', matchResult.stats.poss[0]+'%', matchResult.stats.poss[1]+'%'], ['Shots on Target', matchResult.stats.shots[0], matchResult.stats.shots[1]], ['Passes Completed', matchResult.stats.passes[0], matchResult.stats.passes[1]] ].map(([l,h,a], i) => (
                    <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,.04)' }}>
                      <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'.82rem', color:'var(--lime)' }}>{h}</span><span style={{ fontSize:'.68rem', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--g)' }}>{l}</span><span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:'.82rem', color:'var(--red)' }}>{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background:'var(--navy2)', border:'1px solid var(--b)', padding:28, marginBottom:20 }}>
                <div style={{ fontSize:'.62rem', fontWeight:800, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--el)', borderBottom:'1px solid var(--b)', paddingBottom:10, marginBottom:16 }}>📈 Player Ratings</div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:8 }}>
                  {squad.slice(0, 11).map((p, i) => {
                    let r = matchResult.ratings[p.name] || 6.0;
                    if(matchResult.score.home > matchResult.score.away) r += Math.random() * 0.5; else if(matchResult.score.home < matchResult.score.away) r -= Math.random() * 0.5;
                    r = Math.min(9.9, Math.max(5.0, r + (Math.random() - 0.4)));
                    const goals = matchResult.goals[p.name] || 0;
                    return (
                      <div key={i} style={{ background:'var(--navy3)', border:'1px solid var(--b)', padding:'10px 12px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <div>
                          <div style={{ fontSize:'.72rem', fontWeight:700, color:'var(--w)' }}>{p.name.split(' ')[0]}</div>
                          {goals > 0 && <div style={{ fontSize:'.58rem', color:'var(--lime)' }}>⚽ {goals} goal{goals>1?'s':''}</div>}
                        </div>
                        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1rem', letterSpacing:'.05em', color: r >= 7.5 ? 'var(--lime)' : r >= 6.5 ? 'var(--g)' : 'var(--red)' }}>{r.toFixed(1)}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div style={{ display:'flex', gap:14, justifyContent:'center', paddingTop:8, paddingBottom:8 }}>
                <button onClick={() => setScreen("prematch")} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.1rem', letterSpacing:'.18em', padding:'14px 40px', border:'none', background:'var(--el)', color:'var(--navy)' }}>▶ PLAY AGAIN</button>
                <button onClick={() => setScreen("squad")} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.1rem', letterSpacing:'.18em', padding:'14px 40px', border:'1px solid var(--b)', background:'transparent', color:'var(--g)' }}>← Squad</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}