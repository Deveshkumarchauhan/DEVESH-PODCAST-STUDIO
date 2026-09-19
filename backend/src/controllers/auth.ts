import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { User } from "../models/User.js";
import { env } from "../config/env.js";
const input = z.object({
  name: z.string().min(2).max(80).optional(),
  email: z.string().email(),
  password: z.string().min(8).max(128),
});
const issue = (id: string) =>
  jwt.sign({ sub: id }, env.jwt, { expiresIn: "7d" });
export async function register(req: Request, res: Response) {
  const data = input.safeParse(req.body);
  if (!data.success || !data.data.name)
    return res
      .status(400)
      .json({ error: "Name, valid email and 8+ character password required." });
  if (await User.exists({ email: data.data.email }))
    return res.status(409).json({ error: "Email is already registered." });
  const user = await User.create({
    ...data.data,
    passwordHash: await bcrypt.hash(data.data.password, 12),
  });
  res
    .status(201)
    .json({
      token: issue(String(user._id)),
      user: { id: user.id, name: user.name, email: user.email },
    });
}
export async function login(req: Request, res: Response) {
  const data = input.pick({ email: true, password: true }).safeParse(req.body);
  if (!data.success)
    return res
      .status(400)
      .json({ error: "Valid email and password required." });
  const user = await User.findOne({ email: data.data.email });
  if (!user || !(await bcrypt.compare(data.data.password, user.passwordHash)))
    return res.status(401).json({ error: "Incorrect email or password." });
  res.json({
    token: issue(String(user._id)),
    user: { id: user.id, name: user.name, email: user.email },
  });
}
