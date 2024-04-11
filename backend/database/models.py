from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, ForeignKey, String,DateTime,Integer,func
from sqlalchemy.orm import relationship
Base =declarative_base()

class AuthorModel(Base):
    __tablename__ = 'author'
    id = Column(Integer,primary_key=True) 
    name = Column(String(length=40),index=True) 
    password = Column(String(length=100),nullable=False)
    refresh_token=Column(String,nullable=True)
    posts =relationship("PostModel",back_populates='author')
    

class PostModel(Base):
    __tablename__ = 'post'
    id = Column(Integer,primary_key=True)
    title =Column(String(length=30),index=True)
    body =Column(String(length=600),index=True)
    date = Column(DateTime,default=func.now())
    author_id =Column(Integer,ForeignKey('author.id'))  
    author = relationship("AuthorModel",back_populates='posts')
    @property
    def authorName(self):
        return self.author.name
    @authorName.setter
    def authorName(self,value):
        self.author =value

