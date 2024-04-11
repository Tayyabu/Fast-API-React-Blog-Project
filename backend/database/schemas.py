from datetime import datetime
from typing import Union
from pydantic import BaseModel


class PostBase(BaseModel):
    title: str
    body: str 


class PostCreate(PostBase):
    pass

class Post(PostBase):
    id: int
    authorName: str
    date:datetime

    class Config:
        from_attributes = True






class AuthorBase(BaseModel):
    name: str
class AuthorCreate(AuthorBase):
    password:str


class Author(AuthorBase):
    id: int
    posts: list[Post] = []
    class Config:
        from_attributes = True
        


class Login(AuthorCreate):
    pass