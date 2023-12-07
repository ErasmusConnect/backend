import { TJWTPayload } from '../types/JWTPayload';
import jwt from 'jsonwebtoken';

export const createJWT = (payload: TJWTPayload, expiresIn: string) => {
    return jwt.sign(payload, process.env.JWT_TOKEN_SECRET as string, {
        expiresIn,
    });
};
