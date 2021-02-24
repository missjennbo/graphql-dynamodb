# graphql-mongodb

Simple GraphQL API using DynamoDB to manage user scores for my TicTacToe sample application.

* Starts express server forever with `npm run start`
* Use `npm run start-dev` for development 
* Saves data to AWS dynamo DB 

###GraphQL API usage

* getAllUser(): User[]
``` 
{
    users {
        id,
        name
        score
    }
}
```

* getUserByUsername(name: string): User
``` 
{
    user(name: "missjennbo") {
        id,
        name
        score
    }
}
```

* createUser(name: String): User
``` 
mutation {
    createUser(name: "maluc")
}
```
* increaseScore(name: String): User
``` 
mutation {
    increaseScore(name: "maluc") {
        id
        name
        score
    }
}
```

* deleteUser(name: String): Boolean
``` 
mutation {
    deleteUser(name: "maluc")
}
```