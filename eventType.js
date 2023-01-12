// import avro from 'avro-js';
import avro from 'avsc';

export default avro.Type.forSchema({
    type: 'record',
    fields: [
      {
        name: 'transactionType', 
        type: { type: 'enum', symbols: ['Debit', 'Credit'] }
      },
      {
        name: 'amount', 
        type: 'int'
      },
    ],
});
