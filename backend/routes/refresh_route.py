
from fastapi.security import OAuth2PasswordBearer
from controllers.login_controller import ALGORITUM, create_access_token
from datetime import timedelta
from controllers.refresh_controller import REFRESH_SECRET, get_author_by_refresh_token
from jose import JWTError
from fastapi import APIRouter,Depends, HTTPException,Request
from starlette import status
from sqlalchemy.orm import Session
from typing import Annotated
from database.models import AuthorModel, Base
from database.database import engine,SessionLocal
router =APIRouter(prefix='/api/refresh',tags=['Refresh'])
Base.metadata.create_all(bind=engine)
oauth_bearer =OAuth2PasswordBearer(tokenUrl='/api/refresh')
def get_db():
    db =SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency =Annotated[Session,Depends(get_db)]


@router.get("/")
def refresh(db:db_dependency,request:Request):

    token = str(request.cookies.get('jwt'))
    
    author = db.query(AuthorModel).filter(AuthorModel.name=="Tayyab").first()
    print(author.refresh_token,token)
    if not token :
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    try:
      user =get_author_by_refresh_token(db,token)
    except JWTError:
      raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    
    
    
    access_token =create_access_token({"name":user.name},expires=timedelta(minutes=20))
    return{"accessToken":access_token}





