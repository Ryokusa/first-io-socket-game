import express from "express";
import fetch from "node-fetch";
import http from "node:http";
import { createServer as createViteServer } from "vite";
import { useServerSocket } from "./serverSocket";
const app = express();
const port = 3001;

// Allow express to parse JSON bodies
app.use(express.json());

app.post("/api/token", async (req, res) => {
  // Exchange the code for an access_token
  const response = await fetch(`https://discord.com/api/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.VITE_DISCORD_CLIENT_ID,
      client_secret: process.env.VITE_DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code: req.body.code,
    }),
  });

  // Retrieve the access_token from the response
  const { access_token } = (await response.json()) as { access_token: string };

  // Return the access_token to our client as { access_token: "..."}
  res.send({ access_token });
});

const server = http.createServer(app);
const vite = await createViteServer({
  server: { middlewareMode: true, hmr: { server } },
  appType: "custom",
});
app.use(vite.middlewares);

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

useServerSocket(server);
