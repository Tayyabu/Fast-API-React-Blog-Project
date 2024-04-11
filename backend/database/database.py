from os import getenv
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
load_dotenv()
SQLALCHEMY_DATABASE_URI:(str|None)=getenv('SQLALCHEMY_DATABASE_URI')

if SQLALCHEMY_DATABASE_URI:
 engine=create_engine(SQLALCHEMY_DATABASE_URI) 
 SessionLocal =sessionmaker(autoflush=False,bind=engine,autocommit=False)
 


