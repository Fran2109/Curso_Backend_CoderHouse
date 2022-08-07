import twilio from 'twilio'

const accountSid = 'AC429651f99e462fbfa8dcd49223746d53'
const authToken = '5e5a30332db84a38fb217d867bcf9682'

const client = twilio(accountSid, authToken)

const options = {
    body: 'Hola soy un SMS desde Node.js para la comision 31825!',
    from: '+18593408177',
    to: '+541137783394'
}

try {
    const message = await client.messages.create(options)
    console.log(message)
} catch (error) {
    console.log(error)
}
