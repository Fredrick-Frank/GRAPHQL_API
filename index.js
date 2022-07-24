//importing the dependencies:
import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';

const app = express();
const port = 4000;

//using the cors & express middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//create an executable Graphql schema: representing a database table called 'customers'
const data = {
    customers: [
        {id: '001', name:'John'},
        {id: '002', name:'Jerry'},
    ],
}

//schema using the type system:
const typeDefs = `
type customer {
    id: ID!
    name: String!
}
type Query {
    customers: [customer]
}
`

//resolvers:
const resolvers = {
    Query: {
        customers: (obj,args,context,info) => context.customers,
    },
}

//
const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
})



//graphql single entrypoint:
app.use(
    '/graphql',
    graphqlHTTP({
        schema: executableSchema,
        context: data,
        graphiql: true,
    })
)


app.listen(port, () => { console.log(`Running server at http://localhost:${port}`)})
