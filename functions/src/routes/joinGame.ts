import { roomsRef } from "../database";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  const { roomId, userId }: JoinGameRequest = req.body;
  if (!roomId) {
    res.status(400).send({ error: "No room specified" });
    return;
  }
  if (!userId) {
    res.status(400).send({ error: "No user specified" });
    return;
  }

  try {
    const roomRef = roomsRef.doc(roomId);
    const roomPlayersRef = roomRef.collection("roomPlayers").doc(roomId);
    const roomPlayers = await roomPlayersRef.get();
    const {
      whitePlayerId,
      blackPlayerId
    } = roomPlayers.data() as RoomPlayersModel;
    if (whitePlayerId === userId || blackPlayerId === userId) {
      res.status(403).send({ error: "You have already joined the game" });
      return;
    }
    if (whitePlayerId && blackPlayerId) {
      res.status(403).send({ error: "Can't join a full game" });
      return;
    }
    await roomPlayersRef.update({
      [whitePlayerId ? "blackPlayerId" : "whitePlayerId"]: userId
    });
    await roomRef.update({ isGameFull: true });
    res.send({
      success: "You have joined the game",
      role: whitePlayerId ? "black" : "white"
    });
  } catch (error) {
    console.error("Error getting document: ", error);
    res.status(500).send({ error: "Error getting document" });
  }
}