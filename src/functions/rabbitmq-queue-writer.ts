import * as path from 'path'
import { Channel, ConfirmChannel, Connection, Message } from 'amqplib'

export default async function(sourceConnection: Connection, targetConnection: Connection, queue: string) {
  console.log('Attempting to prefetch source queue...')
  try {
    const sourceChannel: Channel = await sourceConnection.createChannel()
    const targetChannel: ConfirmChannel = await targetConnection.createConfirmChannel()
    if (sourceChannel && targetChannel) {
      const targ = await targetChannel.assertQueue(queue)
      sourceChannel.prefetch(20)
      sourceChannel.consume(queue, (message: Message | null) => {
        if (message) {
          targetChannel.sendToQueue(queue, message.content, {}, (err, ok) => {
            if (!err) {
              process.stdout.write('.')
              sourceChannel.ack(message)
            } else {
              process.stdout.write('-')
              sourceChannel.nack(message)
            }
          })
        }
      })
    } else {
      throw new Error("Can't create channel. Giving up.")
    }
  } catch (err) {
    console.error(err)
  }
}