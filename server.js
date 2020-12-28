import {getAllUser, getUserByUsername} from './mongoApi';
import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import {buildSchema} from 'graphql';

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

class User {
    constructor(id, name, score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }
}

let userList = [];

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
    increaseScore: async ({name}) => {
        const existing = userList.findIndex((user) => user.name === name);
        if (existing !== -1) {
            userList[existing].score++;
            return userList[existing];
        }
        const id = require('crypto').randomBytes(10).toString('hex');
        const newUser = new User(id, name, 1);
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
