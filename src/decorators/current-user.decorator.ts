import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'src/interceptors/jwt-payload.interceptor';

// Decorador Param de acuerdo a lo que le pase por parametro: 'sub','id','email','rol'
// solicito o devuelvo todo el jwtPayload
export const CurrentUser = createParamDecorator(
  (field: keyof JwtPayload | undefined, contexto: ExecutionContext) => {
    const request = contexto.switchToHttp().getRequest<Request>();
    const user = request.user as JwtPayload;

    return field ? user?.[field] : user;
  },
);
