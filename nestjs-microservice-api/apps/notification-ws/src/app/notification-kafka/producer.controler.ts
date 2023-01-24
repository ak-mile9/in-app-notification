import { Body, Controller, Post } from "@nestjs/common";
import { RecordsInterface } from "./models/interface";


@Controller('v1/kafka')
export class KafkaController {


    @Post('produce')
    produce(@Body() payload: RecordsInterface) {
        return payload;
    }

}