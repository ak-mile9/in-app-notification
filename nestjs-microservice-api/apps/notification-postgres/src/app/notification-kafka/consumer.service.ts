import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka } from "kafkajs";

@Injectable()
export class KafkaConsumerService implements OnApplicationShutdown {


    private readonly kafka = new Kafka({

        brokers: ['localhost:9092']
    })
    private readonly consumers: Consumer[] = []

    async consume(groupId: string, topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
        const consumer = this.kafka.consumer({ groupId });
        await consumer.connect().catch(e => console.log('Consumer connection error', e));
        await consumer.subscribe(topic)
        await consumer.run(config)
        this.consumers.push(consumer)
    }
    async onApplicationShutdown() {
        for (const consumer of this.consumers) {
            await consumer.disconnect();
        }
    }

}