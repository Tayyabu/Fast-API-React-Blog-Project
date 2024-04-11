from typing import Annotated
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import routes.author_route as author_router
import routes.post_route as post_router
import routes.login_route as login_router
import routes.refresh_route as refresh_router
from database.database import SessionLocal,engine
from fastapi import Depends, FastAPI, HTTPException, Request, Response
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from database.models import Base
import time
from starlette import status
from middlewares.log_middleware import add_logs
from controllers.post_controller import get_all_posts
from starlette.middleware.base import BaseHTTPMiddleware
Base.metadata.create_all(bind=engine)
def get_db():
    db =SessionLocal()
    try:
        yield db
    finally:
        db.close()
db_dependency =Annotated[Session,Depends(get_db)]


app =FastAPI()
app.add_middleware(BaseHTTPMiddleware,dispatch=add_logs)
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

origins = [
  
    "http://localhost:5173",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router=author_router.router)
app.include_router(router=login_router.router)
app.include_router(router=refresh_router.router)

app.include_router(router=post_router.router)

app.mount("/static", StaticFiles(directory="static"), name="static")


templates = Jinja2Templates(directory="templates")


@app.get("/post", response_class=HTMLResponse)
async def read_item(request: Request,db:db_dependency ):

    return templates.TemplateResponse(
        request=request, name="index.html", context={"posts":get_all_posts(db=db)}
    )