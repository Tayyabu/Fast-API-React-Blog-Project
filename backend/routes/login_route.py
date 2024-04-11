
from datetime import timedelta
from controllers.login_controller import verify_pwd,create_refresh_token,create_access_token
from database.schemas import Login

from controllers.author_controller import get_author_by_name
from jose import jwt
from fastapi import APIRouter,Depends, HTTPException,Response
from starlette import status
from sqlalchemy.orm import Session
from typing import Annotated
from database.models import Base
from database.database import engine,SessionLocal
router =APIRouter(prefix='/api/login',tags=['Auth'])
Base.metadata.create_all(bind=engine)
def get_db():
    db =SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency =Annotated[Session,Depends(get_db)]


@router.post('/')
async def login_user(db:db_dependency,user:Login,response:Response):
    author = get_author_by_name(db=db,author_name=user.name)

    if (not author) or (not verify_pwd(user.password,author.password)):
        raise  HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    refresh_token =create_refresh_token({'name':author.name},expires=timedelta(days=1))
    author.refresh_token =refresh_token
    db.commit()
    access_token =create_access_token({'name':author.name},expires=timedelta(seconds=60))
    response.set_cookie(key="jwt",value=refresh_token,samesite='none',httponly=True,secure=True)
    return {"accessToken":access_token}


   
    

