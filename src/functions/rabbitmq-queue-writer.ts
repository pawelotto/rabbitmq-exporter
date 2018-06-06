import * as fs from 'fs-extra'
import * as ho from 'object-hash'
import * as path from 'path'
import { Channel, Connection, Message } from 'amqplib'

export default async function(connection: Connection, queue: string, outDir: string) {
  try {
    fs.ensureDirSync(outDir)
    const channel: Channel = await connection.createChannel()
    if (channel) {
      channel.prefetch(1)
      channel.consume(queue, (message: Message | null) => {
        if (message) {
          const obj = message.content.toString()
          console.log(obj)
          const fn = path.join(outDir, `${ho.sha1(obj)}.json`)
          fs.writeJSONSync(fn, obj)
          channel.ack(message)
        }
      })
    } else {
      throw new Error("Can't create channel. Giving up.")
    }
  } catch (err) {
    console.error(err)
  }
}