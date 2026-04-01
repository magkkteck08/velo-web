from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
import datetime

# Create a local SQLite database file named 'velo.db'
SQLALCHEMY_DATABASE_URL = "sqlite:///./velo.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# ==========================================
# TRACK 0: PUBLIC WEBSITE TABLES
# ==========================================
class DBInquiry(Base):
    __tablename__ = "inquiries"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    project_type = Column(String)
    budget = Column(String)
    details = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class DBApplication(Base):
    __tablename__ = "applications"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    role = Column(String)
    links = Column(String)
    message = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

# ==========================================
# TRACK A: SAAS & FINTECH TABLES
# ==========================================
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    company_name = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    products = relationship("Product", back_populates="owner")

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    price = Column(Integer) 
    stock = Column(Integer, default=0)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="products")

class Sale(Base):
    __tablename__ = "sales"
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    owner_id = Column(Integer, ForeignKey("users.id"))
    quantity = Column(Integer)
    total_price = Column(Integer) 
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

# ==========================================
# TRACK B: GAME ENGINE TABLES
# ==========================================
class Player(Base):
    __tablename__ = "players"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    position = Column(String)
    
    # Core Attributes (0-99 Scale)
    pace = Column(Integer)
    shooting = Column(Integer)
    passing = Column(Integer)
    defense = Column(Integer)
    
    # Calculated Average Rating
    overall = Column(Integer)
    
    # Which user manages this player?
    owner_id = Column(Integer, ForeignKey("users.id"))

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()