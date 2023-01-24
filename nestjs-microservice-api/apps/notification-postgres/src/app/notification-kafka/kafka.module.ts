import { Module } from "@nestjs/common";
import { KafkaConsumerService } from "./consumer.service";
import { KafkaController } from "./producer.controler";
import { KafkaProducerService } from "./producer.service";


@Module({
    controllers: [KafkaController]
    // providers: [KafkaProducerService, KafkaConsumerService],
    // exports: [KafkaProducerService, KafkaConsumerService]
})
export class KafkaModule { }