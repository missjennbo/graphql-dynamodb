import {graphqlHTTP} from 'express-graphql';
import express from 'express';
import {buildSchema} from 'graphql';
import {createUser, getAllUser, getUserByUsername, updateUser} from './mongoApi';
import {User} from '../types/types';

const schema = buildSchema(`
  type User {
    _id: ID!
    name: String
    score: Int
  }

  type Query {
    users: [User]
  }

  type Mutation {
    increaseScore(name: String): User
  }
`);

const root = {
    // {
    //   users {
    //     id,
    //     name
    //     score
    //   }
    // }
    users: async () => {
        return await getAllUser();
    },
    // mutation {
    //     increaseScore(name: "maluc") {
    //         id
    //         name
    //         score
    //     }
    // }
    increaseScore: async ({name}: User) => {
        const existingUser = await getUserByUsername(name);
        existingUser ? await updateUser(existingUser) : await createUser(name);
    },
};

const app = express();
app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
);
app.listen(80, () => {
    console.log('Running a GraphQL API server at http://localhost:80/graphql');
});
