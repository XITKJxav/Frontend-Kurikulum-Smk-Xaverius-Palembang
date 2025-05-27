import { jwtDecode } from "jwt-decode";

type JWTPayload = {
  exp: number;
  [key: string]: any;
};

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
}
