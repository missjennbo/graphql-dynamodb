# graphql-dynamodb

Simple GraphQL API using DynamoDB to manage user scores for my TicTacToe sample application.
The app is deployed to AWS EC2 instacnes using Github Actions and AWS CodeDeploy.

* Starts express server forever with `npm run start`
* Use `npm run start-dev` for development 
* Saves data to AWS dynamo DB 

###GraphQL API usage

* getAllUser(): User[]
``` 
{
    users {
        id,
        username
        score
    }
}
```

* getUserByUsername(username: string): User
``` 
{
    user(username: "missjennbo") {
        id,
        username,
        score
    }
}
```

* createUser(username: String): User
``` 
mutation {
    createUser(username: "maluc") {
        id,
        username,
        score
    }
}
```
* increaseScore(username: String): User
``` 
mutation {
    increaseScore(username: "maluc") {
        id
        username
        score
    }
}
```

* deleteUserByUsername(username: String): Boolean
``` 
mutation {
    deleteUserByUsername(username: "maluc")
}
```