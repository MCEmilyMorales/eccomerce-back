//Al estar en un .d.ts, TypeScript agregará esto a los tipos globales.
import { JwtPayload } from 'src/interceptors/jwt-payload.interceptor';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
