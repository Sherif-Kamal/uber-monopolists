import { createParamDecorator } from "@nestjs/common";

// custom decorator to get user payload from request;
export const GetTokenUser = createParamDecorator((data,req)=>{
    return req.user;
})