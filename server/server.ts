import {graphqlHTTP} from 'express-graphql';
import express from 'express';
import {buildSchema} from 'graphql';
import {v4 as uuid} from 'uuid';
import {getAllUser} from './mongoApi';

const schema = buildSchema(`
  type User {
    id: ID!
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

interface User {
    id: string;
    name: string;
    score: number;
}

const userList: User[] = [];

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
        const existing = userList.findIndex((user) => user.name === name);
        if (existing !== -1) {
            userList[existing].score++;
            return userList[existing];
        }
        const id = uuid();
        const newUser = {id, name, score: 1};
        userList.push(newUser);
        return newUser;
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
app.listen(4000, () => {
    console.log('Running a GraphQL API server at localhost:4000/graphql');
});
