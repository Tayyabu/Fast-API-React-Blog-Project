from fastapi import Request
from logs.logger import logger

async def add_logs(request:Request,call_next):
    
    log_dict ={
        "url":request.url
        ,"method":request.method
        ,'headers':request.headers.get("authorization")
    }
    logger.info(log_dict)
    response = await call_next(request)
    return response