const express = require('express')
const kafka = require('kafka-node')
const { default: mongoose } = require('mongoose')
const app = express()

app.use(express.json())

const isRunning = () => {
    mongoose.connect(process.env.MONGO_URL)
    const User = new mongoose.model('user',{
        name: String,
        email: String,
        password: String
    })

    const options = {
        kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS,
        groupId:"user-consumer-group",
        autoCommit:true,
        fromOffset:"earliest"
    }

    const consumer = new kafka.ConsumerGroup(options,process.env.KAFKA_TOPIC);

    // const client = new kafka.KafkaClient({kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS})
    // console.log(client)
    // const consumer = new kafka.Consumer(client, [{topic: process.env.KAFKA_TOPIC}], {
    //     autoCommit: false
    // })

    consumer.on('message', async(message) => {
        try{
            const user = new User(JSON.parse(message.value))
            await user.save()
        } catch(err){
            console.error("❌ Error saving user:", err.message);
        }
        
        
    })

    consumer.on('error', (err) => {
        console.log(err)
    })
}
setTimeout(isRunning, 2000)

app.listen(process.env.PORT)