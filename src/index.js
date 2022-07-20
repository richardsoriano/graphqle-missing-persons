import { GraphQLServer, PubSub } from "graphql-yoga"

import db from "./db"
import Query from "./resolvers/Query"

import MissingPerson from "./resolvers/MissingPerson"
import Guardian from "./resolvers/Guardian"
import Witness from "./resolvers/Witness"
import Message from "./resolvers/Message"

const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    MissingPerson,
    Guardian,
    Message,
    Witness,
  },
  context: {
    db,
    pubsub,
  },
})

server.start(() => {
  console.log("The server is up")
})
