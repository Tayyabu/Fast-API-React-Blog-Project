from fastapi import APIRouter,Depends, HTTPException, Response,status

from sqlalchemy.orm import Session
from typing import Annotated
from database.models import Base, PostModel
from database.database import engine,SessionLocal
import database.schemas as schemas

from controllers.post_controller import get_all_posts,create_posts,update
from controllers.login_controller import get_current_user
router =APIRouter(prefix='/api/posts',tags=['posts'])
Base.metadata.create_all(bind=engine)
def get_db():
    db =SessionLocal()
    try:
        yield db
    finally:
        db.close()
db_dependency =Annotated[Session,Depends(get_db)]
user_dependency=Annotated[dict,Depends(get_current_user)]
@router.get('/',response_model=list[schemas.Post])
def read_posts(db:db_dependency,user:user_dependency):
    posts=get_all_posts(db=db) 
    return posts

@router.post('/',response_model=list[schemas.Post])
def create_post(db:db_dependency,user:user_dependency,post:schemas.PostBase):
    posts= create_posts(db=db,post=post,author=user.get("name"))
    return posts
@router.put('/{id}')
def update_post(id:int,post:schemas.PostCreate,db:db_dependency):
    try:
        update(post,id,db)
    except :
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    return Response(status_code=status.HTTP_200_OK)
@router.delete('/{id}')
def delete_post(db:db_dependency,id:int,user:user_dependency):
    post = db.query(PostModel).filter(PostModel.id==id).first()
    if post:
        db.delete(post)
        db.commit()
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

