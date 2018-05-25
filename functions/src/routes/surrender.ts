import { Response, Request } from "express";
import { roomsRef } from "../database";

export default async (req: Request, res: Response) => {
  const { userId, roomId }: SurrenderRequest = req.body;
  const roomRef = roomsRef.doc(roomId);
  const roomPlayers = await roomRef
    .collection("roomPlayers")
    .doc(roomId)
    .get();
  const {
    whitePlayerId,
    blackPlayerId
  } = roomPlayers.data() as RoomPlayersModel;

  if (userId !== whitePlayerId && userId !== blackPlayerId) {
    res
      .status(403)
      .send({ error: "Can't surrender from a game where you are not playing" });
    return;
  }
  const room = await roomRef.get();
  const { isGameFull, winnerColor } = room.data() as RoomModel;
  if (!isGameFull) {
    res
      .status(403)
      .send({ error: "Can't surrender from a game which is not full yet" });
    return;
  } else if (!!winnerColor) {
    res
      .status(403)
      .send({ error: "Can't surrender from a game which is over" });
    return;
  }

  await roomRef.update({
    winnerColor: whitePlayerId === userId ? "black" : "white"
  });
  res.send({ success: "You have surrendered" });
};
