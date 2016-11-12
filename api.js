import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    trip(id: ID!): Trip
    policyHolder(id: ID!): PolicyHolder
  }

  type Trip {
    id: ID!
    start: String
    end: String
    policyHolder: PolicyHolder
  }

  type PolicyHolder {
    id: ID!,
    imei: String
    policyNumber: String
    name: String
    address: String
    trips: [Trip]
  }
`);

const getPolicyHolder = async id => (id === 'a' ? {
  id: 'a',
  policyNumber: 'pol-1',
  name: 'Matthew',
  address: 'Aylesbury',
  imei: '11111'
} : { id });

const getTrip = async id => (id === '1' ? {
  id: 1,
  start: '2016-11-10T13:00:00',
  end: '2016-11-10T14:00:00',
  policyHolderId: ''
} : { id });

const getTrips = async () => [
  getTrip('1'),
  getTrip('2')
];

const root = {
  trip: async (args) => {
    const trip = await getTrip(args.id);
    const policyHolder = await getPolicyHolder('a');
    return {
      ...trip,
      policyHolder
    };
  },
  policyHolder: async (args) => {
    const holder = await getPolicyHolder(args.id);
    const trips = await getTrips(holder.imei);
    return {
      ...holder,
      trips
    };
  }
};

const app = express();
app.use('/', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

export default app;
