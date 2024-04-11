
from typing import List
from fastapi import HTTPException
from sqlalchemy.orm import Session
from starlette import status
import database.models as models
from controllers.author_controller import get_author, get_author_by_name
import database.schemas as schemas




def get_all_posts(db:Session):
    posts=db.query(models.PostModel).all()
    return posts




def create_posts(db: Session, post: schemas.PostBase, author:str):
    
    db_post = models.PostModel(title=post.title,body=post.body, author_id=get_author_by_name(db=db,author_name=author).id)
    print(db_post.author)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    posts =get_all_posts(db=db)
    return posts


def update(post:schemas.PostCreate,id:int,db:Session):
    
    post_to_update =db.query(models.PostModel).filter(models.PostModel.id ==id).first()
    post_to_update.title = post.title
    post_to_update.body = post.body
    db.commit()
    return post_to_update
     



