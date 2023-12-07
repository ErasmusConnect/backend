import {TJWTPayload} from "../types/JWTPayload";
import  jwt from 'jsonwebtoken'

type TParseJWTResponse =
    | {
        isTokenValid: true
        jwtPayload: TJWTPayload
    }
    | {
        isTokenValid: false
        message: string
        error: unknown
}

export const parseJWT = (token: string): TParseJWTResponse => {
    type TJWTPayloadRaw = {[key: string]: string}
    let jwtPayloadRaw: TJWTPayloadRaw
    let jwtPayload: TJWTPayload

    try {
        jwtPayloadRaw = jwt.verify(
            token,
            process.env.JWT_TOKEN_SECRET
        );
        ['iat', 'exp'].forEach(key => delete jwtPayloadRaw[key])
        jwtPayload = jwtPayloadRaw as unknown as TJWTPayload

        return {isTokenValid: true, jwtPayload}

    } catch (error) {
        return {isTokenValid: false, message: "JWT validation failed", error}
    }
}