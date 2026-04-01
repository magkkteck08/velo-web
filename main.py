from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import bcrypt
import jwt
from datetime import datetime, timedelta
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker, Session
import random

# ==========================================
# 1. CONFIGURATION & SECURITY
# ==========================================
SECRET_KEY = "velo_super_secret_key_2026" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7

SQLALCHEMY_DATABASE_URL = "sqlite:///./velo.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ==========================================
# 2. DATABASE MODELS (The Blueprint)
# ==========================================
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    hashed_password = Column(String)
    velo_coins = Column(Integer, default=0) # Economy System

class SquadPlayer(Base):
    __tablename__ = "squad_players"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True) # Ties player to specific user
    name = Column(String)
    position = Column(String)
    pace = Column(Integer)
    shooting = Column(Integer)
    passing = Column(Integer)
    defense = Column(Integer)
    overall = Column(Integer)

class MatchRecord(Base):
    __tablename__ = "match_records"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    opponent = Column(String)
    home_score = Column(Integer)
    away_score = Column(Integer)
    result = Column(String) # "Win", "Loss", "Draw"
    coins_earned = Column(Integer)
    played_at = Column(DateTime, default=datetime.utcnow)

# --- NEW: CatalogPal Models ---
class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, index=True)
    name = Column(String)
    price = Column(Integer) # Stored in kobo
    stock = Column(Integer)

class Sale(Base):
    __tablename__ = "sales"
    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, index=True)
    product_id = Column(Integer)
    quantity = Column(Integer)
    revenue = Column(Integer)
    sold_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ==========================================
# 3. PYDANTIC SCHEMAS
# ==========================================
class UserCreate(BaseModel):
    email: str
    password: str
    name: str

class UserLogin(BaseModel):
    email: str
    password: str

class MatchResultPayload(BaseModel):
    opponent: str
    home_score: int
    away_score: int

# --- NEW: CatalogPal Schemas ---
class ProductCreate(BaseModel):
    name: str
    price: int
    stock: int
    owner_id: int

class ProductUpdate(BaseModel):
    name: str
    price: int
    stock: int
    owner_id: int

class SaleCreate(BaseModel):
    product_id: int
    quantity: int
    owner_id: int

# ==========================================
# 4. APP INIT & CORS
# ==========================================
app = FastAPI(title="VELO Master API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# 5. AUTHENTICATION ENDPOINTS
# ==========================================
@app.post("/api/auth/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # THE FIX IS BACK: Truncate to 72 chars to prevent Bcrypt crash
    safe_password = user.password[:72].encode('utf-8')
    hashed_pwd = bcrypt.hashpw(safe_password, bcrypt.gensalt()).decode('utf-8')
    
    new_user = User(email=user.email, hashed_password=hashed_pwd, name=user.name, velo_coins=500)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully"}

@app.post("/api/auth/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    # THE FIX IS BACK: Truncate to 72 chars before verifying
    safe_password = user.password[:72].encode('utf-8')
    
    if not bcrypt.checkpw(safe_password, db_user.hashed_password.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = jwt.encode({"sub": str(db_user.id), "exp": datetime.utcnow() + timedelta(days=7)}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "user": {"id": db_user.id, "name": db_user.name, "email": db_user.email}}

# ==========================================
# 6. GAME ENGINE ENDPOINTS
# ==========================================
@app.get("/api/game/squad/{user_id}")
def get_squad(user_id: int, db: Session = Depends(get_db)):
    # Pull the exact squad for this user from the database
    squad = db.query(SquadPlayer).filter(SquadPlayer.user_id == user_id).all()
    return squad

@app.post("/api/game/draft/{user_id}")
def draft_squad(user_id: int, db: Session = Depends(get_db)):
    # Check if they already have a squad to prevent drafting twice
    existing = db.query(SquadPlayer).filter(SquadPlayer.user_id == user_id).first()
    if existing:
        return {"message": "Squad already exists"}

    names = ["Eze", "Adebayo", "Fosu", "Awoniyi", "Chukwueze", "Iheanacho", "Ajayi", "Balogun", "Sanusi", "Ndidi", "Iwobi"]
    positions = ["GK", "DEF", "DEF", "DEF", "DEF", "MID", "MID", "MID", "FWD", "FWD", "FWD"]
    
    for i in range(11):
        player = SquadPlayer(
            user_id=user_id,
            name=names[i],
            position=positions[i],
            pace=random.randint(60, 90),
            shooting=random.randint(50, 90),
            passing=random.randint(60, 90),
            defense=random.randint(40, 90),
            overall=random.randint(65, 85)
        )
        db.add(player)
    
    db.commit()
    return {"message": "Starting XI Drafted and Saved!"}

@app.post("/api/game/match-result/{user_id}")
def save_match_result(user_id: int, payload: MatchResultPayload, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Calculate result and coins
    if payload.home_score > payload.away_score:
        result = "Win"
        coins = 150
    elif payload.home_score < payload.away_score:
        result = "Loss"
        coins = 25
    else:
        result = "Draw"
        coins = 50

    # Save Match
    match = MatchRecord(
        user_id=user_id, opponent=payload.opponent, 
        home_score=payload.home_score, away_score=payload.away_score, 
        result=result, coins_earned=coins
    )
    db.add(match)
    
    # Update User Wallet
    user.velo_coins += coins
    db.commit()
    
    return {"message": "Match saved", "coins_earned": coins, "new_balance": user.velo_coins}

# ==========================================
# 7. DASHBOARD ENDPOINT
# ==========================================
@app.get("/api/dashboard/{user_id}")
def get_dashboard_data(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404)
        
    matches = db.query(MatchRecord).filter(MatchRecord.user_id == user_id).order_by(MatchRecord.played_at.desc()).limit(5).all()
    squad_count = db.query(SquadPlayer).filter(SquadPlayer.user_id == user_id).count()
    
    wins = db.query(MatchRecord).filter(MatchRecord.user_id == user_id, MatchRecord.result == "Win").count()
    draws = db.query(MatchRecord).filter(MatchRecord.user_id == user_id, MatchRecord.result == "Draw").count()
    losses = db.query(MatchRecord).filter(MatchRecord.user_id == user_id, MatchRecord.result == "Loss").count()

    return {
        "user": {"name": user.name, "email": user.email, "coins": user.velo_coins},
        "stats": {"wins": wins, "draws": draws, "losses": losses, "total_matches": wins + draws + losses},
        "squad_status": "Drafted" if squad_count >= 11 else "Empty",
        "recent_matches": matches
    }

# ==========================================
# 8. CATALOGPAL INVENTORY & SALES ENDPOINTS
# ==========================================
@app.get("/api/inventory/{user_id}")
def get_inventory(user_id: int, db: Session = Depends(get_db)):
    return db.query(Product).filter(Product.owner_id == user_id).all()

@app.post("/api/inventory/add")
def add_product(prod: ProductCreate, db: Session = Depends(get_db)):
    new_prod = Product(name=prod.name, price=prod.price, stock=prod.stock, owner_id=prod.owner_id)
    db.add(new_prod)
    db.commit()
    return {"message": "Product Added"}

@app.put("/api/inventory/{product_id}")
def update_product(product_id: int, prod: ProductUpdate, db: Session = Depends(get_db)):
    db_prod = db.query(Product).filter(Product.id == product_id, Product.owner_id == prod.owner_id).first()
    if not db_prod:
        raise HTTPException(status_code=404, detail="Product not found")
    db_prod.name = prod.name
    db_prod.price = prod.price
    db_prod.stock = prod.stock
    db.commit()
    return {"message": "Product Updated"}

@app.get("/api/sales/{user_id}")
def get_sales_stats(user_id: int, db: Session = Depends(get_db)):
    sales = db.query(Sale).filter(Sale.owner_id == user_id).all()
    revenue = sum(s.revenue for s in sales)
    return {"revenue": revenue, "receipts_issued": len(sales)}

@app.post("/api/sales/new")
def process_sale(sale: SaleCreate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == sale.product_id, Product.owner_id == sale.owner_id).first()
    if not product or product.stock < sale.quantity:
        raise HTTPException(status_code=400, detail="Not enough stock")
    
    product.stock -= sale.quantity
    revenue = product.price * sale.quantity
    new_sale = Sale(owner_id=sale.owner_id, product_id=sale.product_id, quantity=sale.quantity, revenue=revenue)
    db.add(new_sale)
    db.commit()
    return {"message": "Sale processed"}