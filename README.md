# Devesh Podcast Studio

A real browser-based multi-camera podcast MVP: a director creates an authenticated private session; up to three paired phones expose camera/microphone streams through WebRTC; Socket.IO handles pairing, signalling, heartbeats, and recording control.

## Run locally

1. Copy `.env.example` to `backend/.env` and set `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_URL`. For phone pairing on local Wi-Fi, `CLIENT_URL` must be the laptop's LAN address, for example `http://192.168.1.25:5173`—never `localhost`.
2. Install dependencies: `npm install && npm run install:all`.
3. Start MongoDB, then run `npm run dev`.
4. Open `http://localhost:5173/director`, register, create a session, and use the QR pairing link on each phone.

For Docker: `docker compose up --build`. The director is at port 5173 and API at port 9090.

## Recording and export

The director sends real `recording:start` / `recording:stop` events. Each mobile browser records its actual camera/microphone stream using `MediaRecorder` and downloads its WebM when stopped. The API includes authenticated recording upload storage for director-side ingestion and exposes static files from `/uploads`. The browser cannot silently write a phone’s recording to the director disk: user interaction/download or a mobile upload token is required by browser security; the UI does not claim frame-perfect synchronization.

## Networking / production

Use the same Wi-Fi network for local WebRTC. The phone must be able to open the laptop's `CLIENT_URL`; allow ports 5173 and 9090 through Windows Firewall. Camera access requires HTTPS outside localhost (use a trusted HTTPS reverse proxy or tunnel for testing phones). Provide `TURN_SERVER`, `TURN_USERNAME`, and `TURN_PASSWORD` for restrictive networks; STUN is configured by default. Terminate TLS at a reverse proxy and set `CLIENT_URL` to the production HTTPS origin. Bluetooth input pairing happens in the operating system; browsers can select an already-paired input via `enumerateDevices`.

## Tests and limitations

Run `npm test`. The backend is structured for unit/API tests (authentication, validation, session state, and socket events); add a MongoDB test URI for integration runs. Safari support for WebM/MediaRecorder differs by version, battery data is not broadly exposed by browsers, and browsers cannot guarantee low-latency or frame-perfect multi-device sync.
