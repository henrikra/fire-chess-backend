import * as functions from "firebase-functions";
import * as express from "express";

import calculateNewBoard from "./calculateNewBoard";
import {
  checkIfMoveIsValid,
  isAnyBlackPiece,
  isAnyWhitePiece
} from "./moveValidation";
import { initialBoard } from "./initialBoard";
import createRoom from "./routes/createRoom";
import roomInfo from "./routes/roomInfo";
import joinGame from "./routes/joinGame";
import movePiece from "./routes/movePiece";

const cors = require("cors")({ origin: true });
const app = express();
app.use(cors);

app.post("/addRoom", createRoom);
app.post("/joinGame", joinGame);
app.get("/roomInfo", roomInfo);
app.post("/movePiece", movePiece);

exports.app = functions.https.onRequest(app);
