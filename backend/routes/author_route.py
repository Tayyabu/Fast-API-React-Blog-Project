from fastapi import APIRouter,Depends, HTTPException
from starlette import status
from sqlalchemy.orm import Session
from typing import Annotated
from database.models import Base
from database.database import engine,SessionLocal
import database.schemas as schemas
from controllers.author_controller import get_all_authors,create_author
router =APIRouter(prefix='/api/register',tags=['authors'])
Base.metadata.create_all(bind=engine)
def get_db():
    db =SessionLocal()
    try:
        yield db
    finally:
        db.close()
db_dependency =Annotated[Session,Depends(get_db)]






@router.get('/',response_model=list[schemas.Author])
def read_authors(db:db_dependency):
    authors=get_all_authors(db=db) 
    return authors

@router.post('/')
def create(db:db_dependency,author:schemas.AuthorCreate):
    print(author)
    new_author =create_author(db=db,author=author)
    if not new_author:
       return HTTPException(status_code=status.HTTP_409_CONFLICT)
    return {'message':"you are registered"}






