import { NextFunction, Request, Response } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
    const newDate = new Date()
    const date = newDate.toLocaleDateString();
    const time = newDate.toLocaleTimeString();

  console.log(
    `Estas ejecutado un método ${req.method}, en la ruta ${req.url}, con fecha del ${date} y la hora ${time}.`,
  );

  next()
}
