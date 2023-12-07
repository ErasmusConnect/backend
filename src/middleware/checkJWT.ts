import { NextFunction, Request, Response } from 'express';
import { parseJWT } from '../utils/parseJWT';
import { createJWT } from '../utils/createJWT';
import { logger } from '../utils/logger';

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res
            .status(401)
            .json({ message: 'Authorization header not provided' });
    }

    const authHeaderParts = authHeader.split(' ');
    if (authHeaderParts.length !== 2) {
        return res
            .status(401)
            .json({ message: 'Authorization header of wrong format' });
    }

    const token = authHeaderParts[1];

    const parsedData = parseJWT(token);

    if (parsedData.isTokenValid === false) {
        return res
            .status(400)
            .json({ message: parsedData, error: parsedData.error });
    }

    const { jwtPayload } = parsedData;

    if (jwtPayload.tokenType !== 'api-key') {
        return res.status(400).json({ message: 'JWT wrong token type' });
    }

    req.jwtPayload = jwtPayload;

    try {
        // Refresh
        const newToken = createJWT(
            jwtPayload,
            process.env.JWT_EXPIRATION as string
        );
        res.setHeader('token', `Bearer ${newToken}`);
        return next();
    } catch (error) {
        logger.log('error', error);
        return next();
    }
};
