import { Injectable, OnModuleInit } from "@nestjs/common";

import { KafkaConsumerService } from "../notification-kafka/consumer.service";


@Injectable()
export class CreateConsumer implements OnModuleInit {

    constructor(private readonly consumer: KafkaConsumerService) { }



    onModuleInit() {
        this.consumer.consume('group-create-notification', {
            topics: ['create-notification']
        }, {
            eachMessage: async ({ topic, partition, message }) => {
                console.log('-----message in pg----', message)
                console.log({
                    source: 'Create-Consumer',
                    message: message.value.toString(),
                    partition: partition.toString()
                })
            }
        })
    }



}