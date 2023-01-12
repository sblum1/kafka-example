console.log('consumer...');
import Kafka from 'node-rdkafka';
import eventType from '../eventType.js';

const consumer = Kafka.Consumer({
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092'}, {});

consumer.connect();

consumer.on('ready', () => {
    console.log('consumer ready');
    // Takes array of topics
    consumer.subscribe(['test']);
    consumer.consume();
}).on('data', (data) => {
    console.log(`received message: ${eventType.fromBuffer(data.value)}`);
});