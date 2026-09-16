import 'dotenv/config';
const mongo = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/devesh_podcast';
if (process.env.RENDER && /^mongodb:\/\/mongodb(?::\d+)?(?:\/|$)/.test(mongo)) {
  throw new Error('Invalid MONGODB_URI: "mongodb" is a Docker-only hostname. In Render Environment, set MONGODB_URI to your MongoDB Atlas mongodb+srv connection string.');
}
export const env = { port: Number(process.env.PORT || 9090), mongo, jwt: process.env.JWT_SECRET || 'development-only-change-me', client: process.env.CLIENT_URL || 'http://localhost:5173', stun: process.env.STUN_SERVER || 'stun:stun.l.google.com:19302', turn: process.env.TURN_SERVER, turnUser: process.env.TURN_USERNAME, turnPassword: process.env.TURN_PASSWORD };
