import { Request, Response, NextFunction } from 'express'; import jwt from 'jsonwebtoken'; import { env } from '../config/env.js';
export interface AuthRequest extends Request { userId?:string }
export function auth(req:AuthRequest,res:Response,next:NextFunction){ const token=req.headers.authorization?.replace('Bearer ',''); if(!token) return res.status(401).json({error:'Authentication required.'}); try { req.userId=(jwt.verify(token,env.jwt) as {sub:string}).sub; next(); } catch { res.status(401).json({error:'Invalid or expired session.'}); } }
