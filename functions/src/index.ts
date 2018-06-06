import * as functions from "firebase-functions";
import * as express from "express";

import createRoom from "./routes/createRoom";
import roomInfo from "./routes/roomInfo";
import joinGame from "./routes/joinGame";
import movePiece from "./routes/movePiece";
import surrender from "./routes/surrender";

const findMissingFields = (fields: object, requiredFields: string[]) => {
  const foundFields = Object.keys(fields);
  return requiredFields.filter(
    requiredField => !foundFields.includes(requiredField)
  );
};

const validateBodyMiddleware = (requiredFields: string[]) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const missingFields = findMissingFields(req.body, requiredFields);
  if (!missingFields.length) {
    next();
  } else {
    res
      .status(400)
      .send({ error: `Missing body fields: ${missingFields.join(", ")}` });
  }
};

const validateQueryMiddleware = (requiredFields: string[]) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const missingFields = findMissingFields(req.query, requiredFields);
  if (!missingFields.length) {
    next();
  } else {
    res
      .status(400)
      .send({ error: `Missing query params: ${missingFields.join(", ")}` });
  }
};

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