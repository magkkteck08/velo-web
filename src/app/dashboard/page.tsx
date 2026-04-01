"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Product = { id: number; name: string; price: number; stock: number };
type Stats = { revenue: number; receipts_issued: number };

export default function DashboardPage() {
  const router = useRouter();
  
  // Dynamic User State
  const [userId, setUserId] = useState<number | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [dashData, setDashData] = useState<any>(null); // For VELO Coins & Match Stats

  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<Stats>({ revenue: 0, receipts_issued: 0 });
  const [loading, setLoading] = useState(true);
  
  // UI States
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSelling, setIsSelling] = useState(false);
  const [saleData, setSaleData] = useState({ productId: "", quantity: 1 });
  const [saleStatus, setSaleStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  
  // Add Item State
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", price: "", stock: "" });

  // 1. AUTHENTICATION CHECK
  useEffect(() => {
    const savedUser = localStorage.getItem("velo_user");
    if (!savedUser) {
      router.push("/login");
      return;
    }
    const user = JSON.parse(savedUser);
    setUserData(user);
    setUserId(user.id);
  }, [router]);

  // 2. FETCH ALL DATA
  useEffect(() => {
    if (userId === null) return;

    const fetchData = async () => {
      try {
        const [prodRes, statsRes, dashRes] = await Promise.all([
          fetch(`http://127.0.0.1:8000/api/inventory/${userId}`),
          fetch(`http://127.0.0.1:8000/api/sales/${userId}`),
          fetch(`http://127.0.0.1:8000/api/dashboard/${userId}`) // The new endpoint!
        ]);
        
        // We only log errors if they fail, we don't crash the whole page
        if (prodRes.ok) setProducts(await prodRes.json());
        if (statsRes.ok) setStats(await statsRes.json());
        if (dashRes.ok) setDashData(await dashRes.json());
        
      } catch (e) {
        console.error("Data fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("velo_user");
    localStorage.removeItem("velo_token");
    router.push("/login");
  };

  // --- ACTIONS (Untouched Inventory Logic) ---
  const handleAddNewItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price || !newItem.stock || !userId) return;
    const priceInKobo = Math.round(parseFloat(newItem.price) * 100);

    const res = await fetch("http://127.0.0.1:8000/api/inventory/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newItem.name, price: priceInKobo, stock: parseInt(newItem.stock), owner_id: userId }),
    });

    if (res.ok) {
      setIsAdding(false);
      setNewItem({ name: "", price: "", stock: "" });
      // Quick re-fetch for products
      const pRes = await fetch(`http://127.0.0.1:8000/api/inventory/${userId}`);
      if (pRes.ok) setProducts(await pRes.json());
    }
  };

  const handleSaveEdit = async (product: Product) => {
    if(!userId) return;
    await fetch(`http://127.0.0.1:8000/api/inventory/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...product, owner_id: userId }),
    });
    setEditingId(null);
    const pRes = await fetch(`http://127.0.0.1:8000/api/inventory/${userId}`);
    if (pRes.ok) setProducts(await pRes.json());
  };

  const handleProcessSale = async () => {
    if (!saleData.productId || !userId) return;
    setSaleStatus("loading");
    
    const res = await fetch("http://127.0.0.1:8000/api/sales/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: parseInt(saleData.productId), quantity: saleData.quantity, owner_id: userId }),
    });

    if (res.ok) {
      setSaleStatus("success");
      const [pRes, sRes] = await Promise.all([fetch(`http://127.0.0.1:8000/api/inventory/${userId}`), fetch(`http://127.0.0.1:8000/api/sales/${userId}`)]);
      if(pRes.ok) setProducts(await pRes.json());
      if(sRes.ok) setStats(await sRes.json());
      
      setTimeout(() => {
        setSaleStatus("idle");
        setIsSelling(false);
        setSaleData({ productId: "", quantity: 1 });
      }, 2000);
    } else {
      setSaleStatus("error");
      setTimeout(() => setSaleStatus("idle"), 2000);
    }
  };

  const downloadCSV = () => {
    const headers = ["Product ID,Name,Price (NGN),Stock Level\n"];
    const rows = products.map(p => `${p.id},"${p.name}",${p.price / 100},${p.stock}\n`);
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "velo_inventory_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="min-h-screen bg-[#020509] flex items-center justify-center text-el font-bebas text-4xl tracking-widest animate-pulse">LOADING SECURE DATA...</div>;
  }

  return (
    <div className="min-h-screen bg-[#020509] pt-[100px] pb-[60px] text-w">
      <div className="px-7 lg:px-20 max-w-[1400px] mx-auto">
        
        {/* --- NEW: USER PROFILE & GAME STATS BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[var(--color-b)] pb-8 gap-6 bg-[#010812] p-8">
          <div>
            <div className="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-g mb-2">Authenticated Session</div>
            <h1 className="font-bebas text-5xl tracking-widest text-w leading-none">{userData?.name}</h1>
            <p className="text-el text-[0.8rem] mt-2 font-mono">{userData?.email}</p>
          </div>
          
          <div className="flex gap-8 items-end">
            <div className="text-right border-r border-[var(--color-b)] pr-8">
              <div className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-g mb-1">VELO FM Record</div>
              <div className="flex gap-4 text-sm font-bold tracking-widest mt-2">
                <span className="text-lime">{dashData?.stats?.wins || 0} W</span>
                <span className="text-w">{dashData?.stats?.draws || 0} D</span>
                <span className="text-red-500">{dashData?.stats?.losses || 0} L</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-g mb-1">VELO Wallet</div>
              <div className="font-bebas text-4xl text-gold tracking-widest">{dashData?.user?.coins || 0} <span className="text-lg">VLC</span></div>
            </div>
            
            <button onClick={handleLogout} className="border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-w font-bold text-[0.7rem] px-6 py-3 uppercase tracking-widest transition-colors ml-4">
              LOG OUT
            </button>
          </div>
        </div>

        {/* --- ORIGINAL CATALOG PAL HEADER --- */}
        <div className="flex justify-between items-end mb-8 border-b border-[var(--color-b)] pb-6 mt-12">
          <h2 className="font-bebas text-[3rem] leading-none">CATALOG<span className="text-el">PAL</span></h2>
          <button 
            onClick={() => setIsAdding(!isAdding)} 
            className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-navy bg-el px-6 py-3 hover:bg-w transition-all"
          >
            {isAdding ? "Cancel" : "+ Add New Item"}
          </button>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-navy border border-[var(--color-b)] p-6">
            <div className="text-[0.65rem] font-extrabold tracking-[0.2em] uppercase text-g mb-2">Total Revenue</div>
            <div className="text-3xl font-bebas text-lime">₦{(stats.revenue / 100).toLocaleString()}</div>
          </div>
          <div className="bg-navy border border-[var(--color-b)] p-6">
            <div className="text-[0.65rem] font-extrabold tracking-[0.2em] uppercase text-g mb-2">Receipts Issued</div>
            <div className="text-3xl font-bebas text-w">{stats.receipts_issued}</div>
          </div>
          <div className="bg-navy border border-[var(--color-b)] p-6">
            <div className="text-[0.65rem] font-extrabold tracking-[0.2em] uppercase text-g mb-2">Inventory Items</div>
            <div className="text-3xl font-bebas text-el">{products.length}</div>
          </div>
          <div className="bg-navy border border-[var(--color-b)] p-6">
            <div className="text-[0.65rem] font-extrabold tracking-[0.2em] uppercase text-g mb-2">Stock Value</div>
            <div className="text-3xl font-bebas text-w">
              ₦{(products.reduce((acc, p) => acc + (p.price * p.stock), 0) / 100).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
          
          {/* Inventory Table Area */}
          <div className="bg-navy border border-[var(--color-b)] p-8">
            <h3 className="font-bebas text-2xl mb-6">PRODUCT CATALOG</h3>
            
            {/* Slide-down Add Item Form */}
            {isAdding && (
              <form onSubmit={handleAddNewItem} className="mb-8 p-6 border border-el bg-el/5 flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full">
                  <label className="block text-[0.65rem] font-extrabold tracking-widest text-el uppercase mb-2">Product Name</label>
                  <input type="text" required value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} className="w-full bg-navy border border-[var(--color-b)] p-2 text-[0.85rem] text-w focus:outline-none focus:border-el" placeholder="e.g. Wireless Mouse" />
                </div>
                <div className="w-full md:w-[150px]">
                  <label className="block text-[0.65rem] font-extrabold tracking-widest text-el uppercase mb-2">Price (₦)</label>
                  <input type="number" required min="0" step="0.01" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})} className="w-full bg-navy border border-[var(--color-b)] p-2 text-[0.85rem] text-w focus:outline-none focus:border-el" placeholder="2500" />
                </div>
                <div className="w-full md:w-[120px]">
                  <label className="block text-[0.65rem] font-extrabold tracking-widest text-el uppercase mb-2">Stock</label>
                  <input type="number" required min="1" value={newItem.stock} onChange={(e) => setNewItem({...newItem, stock: e.target.value})} className="w-full bg-navy border border-[var(--color-b)] p-2 text-[0.85rem] text-w focus:outline-none focus:border-el" placeholder="50" />
                </div>
                <button type="submit" className="w-full md:w-auto bg-el text-navy font-bold uppercase text-[0.7rem] tracking-widest px-6 py-3 hover:bg-w transition-colors">
                  Save Item
                </button>
              </form>
            )}

            <table className="w-full text-left text-[0.85rem]">
              <thead>
                <tr className="text-g uppercase text-[0.65rem] font-bold border-b border-[var(--color-b)]">
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Price</th>
                  <th className="pb-4">Stock</th>
                  <th className="pb-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 && (
                  <tr><td colSpan={4} className="py-8 text-center text-g">No products found. Add an item above.</td></tr>
                )}
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-[var(--color-b)]/50 hover:bg-navy3">
                    <td className="py-4">
                      {editingId === p.id ? <input className="bg-navy2 text-w border border-el p-1 w-[120px]" value={p.name} onChange={(e) => setProducts(products.map(item => item.id === p.id ? {...item, name: e.target.value} : item))} /> : p.name}
                    </td>
                    <td className="py-4 text-el">
                      {editingId === p.id ? <input type="number" className="bg-navy2 text-w border border-el p-1 w-[80px]" value={p.price / 100} onChange={(e) => setProducts(products.map(item => item.id === p.id ? {...item, price: Math.round(parseFloat(e.target.value) * 100)} : item))} /> : `₦${(p.price / 100).toLocaleString()}`}
                    </td>
                    <td className="py-4">
                      {editingId === p.id ? <input type="number" className="bg-navy2 text-w border border-el p-1 w-[60px]" value={p.stock} onChange={(e) => setProducts(products.map(item => item.id === p.id ? {...item, stock: parseInt(e.target.value)} : item))} /> : `${p.stock} units`}
                    </td>
                    <td className="py-4 text-right">
                      {editingId === p.id ? (
                        <button onClick={() => handleSaveEdit(p)} className="text-lime text-[0.6rem] font-bold uppercase hover:underline">Save</button>
                      ) : (
                        <button onClick={() => setEditingId(p.id)} className="text-g text-[0.6rem] font-bold uppercase hover:text-w hover:underline">Edit</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Receipta Checkout Tools */}
          <div className="bg-navy2 border border-[var(--color-b)] p-8 h-fit">
            <h4 className="font-bebas text-xl mb-4">RECEIPTA POS</h4>
            
            {isSelling ? (
              <div className="flex flex-col gap-4 mb-6 p-4 border border-lime/30 bg-lime/5">
                <select className="bg-navy p-2 text-[0.8rem] border border-[var(--color-b)] focus:outline-none text-w" onChange={(e) => setSaleData({...saleData, productId: e.target.value})}>
                  <option value="">Select Product...</option>
                  {products.filter(p => p.stock > 0).map(p => <option key={p.id} value={p.id}>{p.name} - ₦{(p.price/100)}</option>)}
                </select>
                
                {/* --- THE FIX IS APPLIED ON THIS EXACT LINE BELOW --- */}
                <input 
                  type="number" 
                  min="1" 
                  placeholder="Quantity" 
                  className="bg-navy p-2 text-[0.8rem] border border-[var(--color-b)] focus:outline-none text-w" 
                  value={saleData.quantity || ""} 
                  onChange={(e) => setSaleData({...saleData, quantity: parseInt(e.target.value) || 0})} 
                />
                
                <button onClick={handleProcessSale} disabled={saleStatus === "loading"} className="w-full py-3 bg-lime text-navy font-bold text-[0.7rem] uppercase">
                  {saleStatus === "loading" ? "Processing..." : saleStatus === "success" ? "Receipt Generated ✓" : saleStatus === "error" ? "Stock Error!" : "Confirm Sale"}
                </button>
                <button onClick={() => setIsSelling(false)} className="text-[0.65rem] text-g hover:text-w uppercase tracking-widest text-center mt-2">Cancel</button>
              </div>
            ) : (
              <button onClick={() => setIsSelling(true)} className="w-full py-4 mb-3 bg-lime/10 border border-lime/30 text-lime text-[0.7rem] font-bold uppercase tracking-widest hover:bg-lime hover:text-navy transition-all">
                New Sale Transaction
              </button>
            )}

            <button onClick={downloadCSV} className="w-full py-4 border border-[var(--color-b)] text-g text-[0.7rem] font-bold uppercase tracking-widest hover:border-w hover:text-w transition-all">
              Download Sales Report
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}