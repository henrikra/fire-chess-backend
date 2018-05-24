interface Square {
  file: "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
  rank: number;
}

interface MovePieceRequest {
  from: Square;
  to: Square;
  roomId: string;
  userId: string;
}

interface CreateRoomRequest {
  userId: string;
}

interface JoinGameRequest {
  roomId: string;
  userId: string;
}

interface Move {
  from: Square;
  to: Square;
}

interface RoomPlayersModel {
  whitePlayerId?: string;
  blackPlayerId?: string;
}

interface WhoAmIRequest {
  roomId: string;
  userId: string;
}

interface SurrenderRequest {
  roomId: string;
  userId: string;
}

interface RoomModel {
  isGameFull: boolean;
  moves: Move[];
  surrenderColor?: string;
}
