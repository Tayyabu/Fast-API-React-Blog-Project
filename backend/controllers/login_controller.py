from datetime import timedelta
import datetime
from typing import Annotated
from fastapi import Depends, HTTPException,status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from dotenv import load_dotenv

from jose import jwt,JWTError
import os
load_dotenv()
ACCESS_SECRET =os.getenv('ACCESS_SECRET')
ALGORITUM =os.getenv('ALGORITUM')
oauth_bearer =OAuth2PasswordBearer(tokenUrl='/login')


def verify_pwd(plain_pwd,hashed_pwd):
    bcrypt =CryptContext(schemes=['bcrypt'],deprecated='auto')
    return bcrypt.verify(plain_pwd,hash=hashed_pwd)

def create_refresh_token(payload:dict,expires:timedelta):
    REFRESH_SECRET =os.getenv('REFRESH_SECRET')
    ALGORITUM =os.getenv('ALGORITUM')
    payload.update({'exp':datetime.datetime.utcnow()+expires})
    return jwt.encode(payload,REFRESH_SECRET,algorithm=ALGORITUM)
    

def create_access_token(payload:dict,expires:timedelta):
    payload.update({'exp':datetime.datetime.utcnow()+expires})
    return jwt.encode(payload,ACCESS_SECRET,algorithm=ALGORITUM)
    



def get_current_user(token:Annotated[str,Depends(oauth_bearer)]):
    try:
        payload:dict =jwt.decode(token,ACCESS_SECRET,algorithms=[ALGORITUM])
        name=payload.get("name")
        if not name:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
        return{'name':name}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)





