import * as functions from "firebase-functions";
import * as express from "express";

import createRoom from "./routes/createRoom";
import roomInfo from "./routes/roomInfo";
import joinGame from "./routes/joinGame";
import movePiece from "./routes/movePiece";
import surrender from "./routes/surrender";

const cors = require("cors")({ origin: true });
const app = express();
app.use(cors);

app.post("/addRoom", createRoom);
app.post("/joinGame", joinGame);
app.get("/roomInfo", roomInfo);
app.post("/movePiece", movePiece);
app.post('/surrender', surrender)

exports.app = functions.https.onRequest(app);