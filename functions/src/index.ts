import * as functions from "firebase-functions";
import * as express from "express";

import createRoom from "./routes/createRoom";
import roomInfo from "./routes/roomInfo";
import joinGame from "./routes/joinGame";
import movePiece from "./routes/movePiece";
import surrender from "./routes/surrender";
import { validateBodyMiddleware, validateQueryMiddleware } from "./middlewares";

const cors = require("cors")({ origin: true });
const app = express();
app.use(cors);

app.post("/addRoom", validateBodyMiddleware(["userId"]), createRoom);
app.post("/joinGame", validateBodyMiddleware(["userId", "roomId"]), joinGame);
app.get("/roomInfo", validateQueryMiddleware(["userId", "roomId"]), roomInfo);
app.post(
  "/movePiece",
  validateBodyMiddleware(["userId", "roomId", "from", "to"]),
  movePiece
);
app.post("/surrender", validateBodyMiddleware(["userId", "roomId"]), surrender);

exports.app = functions.https.onRequest(app);