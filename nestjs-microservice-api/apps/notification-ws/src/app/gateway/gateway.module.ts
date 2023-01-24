import { Module } from '@nestjs/common';
import { KafkaConsumerService } from '../notification-kafka/consumer.service';
import { MyGateway } from './gateway';

@Module({
  providers: [MyGateway, KafkaConsumerService],
})
export class GatewayModule { }
