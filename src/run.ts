import * as config from 'config'
import connectRabbitMQ from './functions/connect-rabbitmq'
import rabbitMQQueueWriter from './functions/rabbitmq-queue-writer'
import { Connection } from 'amqplib'

main();

async function main() {
  const rabbitMQSourceString = config.get("rabbitMQSourceString") as string;
  const rabbitMQTargetString = config.get("rabbitMQTargetString") as string;
  const rabbitMQSourceConnection:
    | Connection
    | undefined = await connectRabbitMQ(rabbitMQSourceString);
  const rabbitMQTargetConnection:
    | Connection
    | undefined = await connectRabbitMQ(rabbitMQTargetString);
  const rabbitMQQueue: string = config.get("rabbitMQQueue");
  if (rabbitMQSourceConnection && rabbitMQTargetConnection) {
    rabbitMQQueueWriter(
      rabbitMQSourceConnection,
      rabbitMQTargetConnection,
      rabbitMQQueue
    );
  } else {
    console.error("No RabbitMQ connection. Giving up.");
  }
}
