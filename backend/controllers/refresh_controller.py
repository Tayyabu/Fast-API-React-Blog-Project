from sqlalchemy.orm import Session
from database.models import AuthorModel
from jose import jwt
from dotenv import load_dotenv
import os
load_dotenv()
REFRESH_SECRET =os.getenv('REFRESH_SECRET')
ALGORITUM =os.getenv('ALGORITUM')
def get_author_by_refresh_token(db:Session,token:str):
    payload:dict =jwt.decode(token,REFRESH_SECRET,algorithms=[ALGORITUM])
    name =payload.get("name")
    return db.query(AuthorModel).filter(AuthorModel.name==name).first()

