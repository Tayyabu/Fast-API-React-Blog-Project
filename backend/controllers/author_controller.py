
from typing import List
from fastapi import HTTPException
from sqlalchemy.orm import Session
from starlette import status
import database.models as models
from passlib.context import CryptContext
import database.schemas as schemas
bcrypt =CryptContext(schemes=['bcrypt'],deprecated='auto')
def hash_pwd(plaintext):
    return bcrypt.hash(plaintext)
def get_author(db:Session,author_id:int)-> (models.AuthorModel | None):
    author=db.query(models.AuthorModel).filter(models.AuthorModel.id==author_id).first()
    return author
def get_author_by_name(db:Session,author_name:str)-> (models.AuthorModel | None):
    author=db.query(models.AuthorModel).filter(models.AuthorModel.name==author_name).first()
    return author
def get_all_authors(db:Session) -> List[models.AuthorModel]:
    authors=db.query(models.AuthorModel).all()
    return authors
def create_author(db:Session,author:schemas.AuthorCreate):
    if  author.password:
        new_author=models.AuthorModel(name=author.name,password=hash_pwd(author.password))
        already_author =  get_author_by_name(db=db,author_name=author.name)
        if already_author:
            return HTTPException(status_code=status.HTTP_409_CONFLICT)    
        db.add(new_author)
        db.commit()
        db.refresh(new_author)
        return get_author_by_name(db=db,author_name=author.name)
    else:
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
      

