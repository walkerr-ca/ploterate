import path from "path";
import express from "express";
import { config } from "dotenv";

import AuthController from "@/controllers/auth";
import { authorize } from "@/middleware/authorization";

config({ path: path.resolve("..", "..", ".env") });

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const frontendFolder = path.resolve(__dirname, "../../client/dist");
app.use(express.static(frontendFolder));
app.use("/api", authorize);
app.use("/api/auth", AuthController);
app.get("/api/*endpoint", (_, response) => {
  return response.status(404).json({
    success: false,
    data: {
      error: "The resource requested could not be found",
    },
  });
});

app.get("/api", (_, response) => {
  response.json({ success: true });
});

app.get("*page", (_, response) => {
  response.sendFile("index.html", {
    root: frontendFolder,
  });
});

app.listen(port, async () => {
  console.log(`[PloterateAPI] The server is now listening on PORT::${port}!`);
});
