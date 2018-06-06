import { roomsRef } from "../database";
import { Response, Request } from "express";

const myRole = (userId: string, roomPlayers: RoomPlayersModel) => {
  if (userId === roomPlayers.blackPlayerId) {
    return "black";
  } else if (userId === roomPlayers.whitePlayerId) {
    return "white";
  } else {
    return "spectator";
  }
};

export default async (req: Request, res: Response) => {
  const { roomId, userId }: WhoAmIRequest = req.query;
  
  try {
    const roomPlayers = await roomsRef
      .doc(roomId)
      .collection("roomPlayers")
      .doc(roomId)
      .get();
    res.send({ role: myRole(userId, roomPlayers.data()) });
  } catch (error) {
    console.error("Error getting document: ", error);
    res.status(500).send({ error: "Error getting document" });
  }
}