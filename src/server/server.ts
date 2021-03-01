import {graphqlHTTP} from 'express-graphql';
import express from 'express';
import {buildSchema} from 'graphql';
import {createUser, deleteUser, getAllUser, getUserByUsername, increaseScore} from './dynamoDb';
import {User} from '../types/types';

const schema = buildSchema(`
  type User {
    id: String
    username: String
    score: Int
  }

  type Query {
    users: [User],
    user(username: String): User
  }

  type Mutation {
    createUser(username: String): User,
    increaseScore(username: String): User,
    deleteUserByName(username: String): Boolean
  }
`);

const root = {
    user: async ({username}: User) => {
        return await getUserByUsername(username);
    },
    users: async () => {
        return await getAllUser();
    },
    createUser: async ({username}: User) => {
        return await createUser(username);
    },
    deleteUserByName: async ({username}: User) => {
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            return deleteUser(existingUser);
        }
        return false;
    },
    increaseScore: async ({username}: User) => {
        const existingUser = await getUserByUsername(username);
        return existingUser ? await increaseScore(existingUser) : await createUser(username);
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
    console.log('Running a GraphQL API server at localhost:80/graphql');
});
