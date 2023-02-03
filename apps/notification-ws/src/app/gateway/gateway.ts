import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { KafkaConsumerService } from '../notification-kafka/consumer.service';
import { GateWayService } from './gateway.service';
@WebSocketGateway({ cors: true })


export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly consumer: KafkaConsumerService, private readonly service: GateWayService) { }
  onModuleInit() {
    this.server.on('connection', async (socket) => {
      // console.log('socket.id', socket);
      // console.log('connected');

      console.log(`${socket.getMaxListeners()} max listler`)
    });
    /**
     * 
     * emit the message to browser via websocket
     */
    this.consumer.consume('group-create-notification', {
      topics: ['create-notification']
    }, {
      eachMessage: async ({ topic, partition, message }) => {
        // console.log('-----message in ws----', message)
        // console.log({
        //   source: 'Create-Consumer in websocket',
        //   message: message.value.toString(),
        //   partition: partition.toString()
        // })
        this.onNewMessage(message.value, true)
      }
    })
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any, isDirect: boolean) {
    const room = JSON.parse(body.toString()).for_role;
    console.log('roomroom', room)
    this.server.to(room).emit('onMessage', {
      msg: 'New Message',
      content: isDirect ? JSON.stringify({
        data: {
          notifications: [JSON.parse(body.toString())]
        }
      }) : JSON.parse(JSON.stringify(body, null, 2))
    });

  }

  @SubscribeMessage('storeClientInfo')

  onClientInfoReceived(@MessageBody() body: { userId: number, feature_roles: string[] }, @ConnectedSocket() socket: Socket) {
    const { userId, feature_roles } = body;
    const rooms = feature_roles;
    console.log('feature_roles', rooms)
    socket['userId'] = userId
    socket.join(rooms)
    console.log(`roomName=${socket.rooms} and userId ${socket['userId']}`)

  }
}

