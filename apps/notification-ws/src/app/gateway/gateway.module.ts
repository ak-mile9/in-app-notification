import { Module } from '@nestjs/common';
import { KafkaConsumerService } from '../notification-kafka/consumer.service';
import { MyGateway } from './gateway';
import { GateWayService } from './gateway.service';

@Module({
  providers: [MyGateway, KafkaConsumerService, GateWayService],
})
export class GatewayModule { }
