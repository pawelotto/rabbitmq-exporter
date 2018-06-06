import * as config from 'config'
import { Connection } from 'amqplib'
import connectRabbitMQ from './functions/connect-rabbitmq'
import rabbitMQQueueWriter from './functions/rabbitmq-queue-writer'

main()

async function main() {
  const rabbitMQString = config.get("rabbitMQString") as string
  const rabbitMQConnection: Connection | undefined = await connectRabbitMQ(rabbitMQString)
  const rabbitMQQueue: string = config.get('rabbitMQQueue')
  const outDir: string = './data/'
  if (rabbitMQConnection) {
    rabbitMQQueueWriter(rabbitMQConnection, rabbitMQQueue, outDir)
  } else {
    console.error('No RabbitMQ connection. Giving up.')
  }
}
