import {graphqlHTTP} from 'express-graphql';
import express from 'express';
import {buildSchema} from 'graphql';
import {createUser, deleteUser, getAllUser, getUserByUsername, increaseScore} from './dynamoDb';
import {User} from '../types/types';

const schema = buildSchema(`
  type User {
    id: ID
    name: String
    score: Int
  }

  type Query {
    users: [User],
    user(name: String): User
  }

  type Mutation {
    createUser(name: String): User,
    increaseScore(name: String): User,
    deleteUser(name: String): Boolean
  }
`);

const root = {
    // {
    //   user(name: "missjennbo") {
    //     id,
    //     name
    //     score
    //   }
    // }
    user: async ({name}: User) => {
        return await getUserByUsername(name);
    },
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
    //     createUser(name: "maluc") {
    //         id
    //         name
    //         score
    //     }
    // }
    createUser: async ({name}: User) => {
        return await createUser(name);
    },
    // mutation {
    //     deleteUser(name: "maluc")
    // }
    deleteUser: async ({name}: User) => {
        return await deleteUser(name);
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
        existingUser ? await increaseScore(existingUser) : await createUser(name);
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
