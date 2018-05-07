import { roomsRef } from "../database";

export default async (req, res) => {
  const { userId }: CreateRoomRequest = req.body;
  if (!userId) {
    res.status(400).send({ error: "User is missing" });
    return;
  }

  try {
    const isWhite = Math.random() < 0.5;
    const doc = await roomsRef.add({ moves: [], isGameFull: false });
    await doc
      .collection("roomPlayers")
      .doc(doc.id)
      .set({
        [isWhite ? "whitePlayerId" : "blackPlayerId"]: userId
      });
    res.send({ roomId: doc.id });
  } catch (error) {
    console.error("Error creating room", error);
    res.status(500).send({ error: "Error creating room" });
  }
}