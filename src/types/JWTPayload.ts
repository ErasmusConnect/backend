// This is here to that jwt's can be used to verify email or reset passwords
export type TJWTType =
    'verify-email' |
    'api-key' |
    'password-reset'

// format of payload encoded in the token
export type TJWTPayload = {
    id: number,
    email: string,
    tokenType: TJWTType
}