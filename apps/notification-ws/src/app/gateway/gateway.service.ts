import { Socket } from "socket.io";

export class GateWayService {
    createOrJoinRoom(socket: Socket, rooms: string[]) {

        return { event: "roomCreated", rooms }
    }
}