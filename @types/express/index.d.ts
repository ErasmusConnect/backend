import { TJWTPayload } from '../../src/types/JWTPayload';

declare global {
    namespace Express {
        interface Request {
            jwtPayload: TJWTPayload;
        }
    }
}
