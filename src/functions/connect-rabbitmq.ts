import { connect, Connection } from 'amqplib'

export default async function(rabbitMQString: string) {
  try {
    const connection: Connection = await connect(rabbitMQString)
    connection.on("error", err => console.error(err))
    if (connection) {
      console.log('[AMQP Info]: Connection open')
      return connection
    }
  } catch (err) {
    console.error(err)
  }
}