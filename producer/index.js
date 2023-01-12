console.log("producer...");
import Kafka from "node-rdkafka";
import eventType from "../eventType.js";

const stream = Kafka.Producer.createWriteStream({
    "metadata.broker.list": "localhost:9092"}, {}, {topic: "test"});

const getRandomElem = (lst) => {
    return lst[Math.floor(Math.random()*lst.length)];
}

const getTransactionType = () => {
    const transactionTypes = ["Debit", "Credit"];
    return getRandomElem(transactionTypes);
}

const getRandomTransaction = (transactionType) => {
    if (transactionType === "Debit") {
        return Math.floor(Math.random() * 100000);
    } else {
        return Math.floor(Math.random() * 100000) * -1;
    } 
}

const queueMessage = () => {
    const transactionType = getTransactionType();
    console.log(transactionType);
    const amount = getRandomTransaction(transactionType);
    const event = { transactionType, amount };
    const success = stream.write(eventType.toBuffer(event));
    if (success) {
        console.log("Message wrote successfully to stream");
    } else {
        console.log("Something went wrong...");
    }
}

setInterval(() => {
    queueMessage();
}, 3000);