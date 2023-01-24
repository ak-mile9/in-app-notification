import { Injectable, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer, ProducerRecord } from "kafkajs";

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnApplicationShutdown {

    private readonly kafka = new Kafka({

        brokers: ['localhost:9092']
    })
    private readonly producer: Producer = this.kafka.producer()
    async onModuleInit() {
        console.log('Producer Service onModuleInit')

        await this.producer.connect();
    }

    async produce(record: ProducerRecord) {
        console.log('Producer Service Produce')

        await this.producer.send(record)
    }

    async onApplicationShutdown(signal?: string) {
        console.log('Signal on shutDown', signal)
        await this.producer.disconnect()
    }
}

