import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { KafkaConsumerService } from '../notification-kafka/consumer.service';
@WebSocketGateway({ cors: true })


export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly consumer: KafkaConsumerService) { }
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('socket.id', socket.id);
      console.log('connected');
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
        console.log('-----message in ws----', message)
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

    console.log('Body', body.toString())
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: isDirect ? JSON.stringify({
        data: {
          notifications: [JSON.parse(body.toString())]
        }
      }) : JSON.parse(JSON.stringify(body, null, 2))
    });
  }
}

