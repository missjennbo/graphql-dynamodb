import {User} from '../types/types';
import {DynamoDB} from 'aws-sdk';
import {PutItemOutput, UpdateItemOutput} from 'aws-sdk/clients/dynamodb';
import AWS from 'aws-sdk';
import {v4} from 'uuid';

AWS.config.update({region: 'eu-central-1'});

const TABLE_NAME: string = 'tictactoe-user';
const DOC_CLIENT = new DynamoDB.DocumentClient({region: 'eu-central-1'});

// const db = new AWS.DynamoDB.DocumentClient({
//     accessKeyId: 'AKID',
//     endpoint: 'http://localhost:8000',
//     region: 'REGION',
//     secretAccessKey: 'SECRET'
// });

export const getAllUser = async (): Promise<User[]> => {
    const params = {
        TableName: TABLE_NAME,
    };
    const users = await DOC_CLIENT.scan(params).promise();
    return new Promise((resolve) => {
        resolve(users.Items as User[]);
    });
};

export const getUserByUsername = async (username: String): Promise<User> => {
    // type matching issue in aws-sdk package
    const params: any = {
        TableName: TABLE_NAME,
        Key: {
            name: username,
        },
    };
    return DOC_CLIENT.get(params)
        .promise()
        .then((user) => user.Item as User);
};

export const createUser = async (username: String): Promise<PutItemOutput> => {
    const params: any = {
        TableName: TABLE_NAME,
        Item: {
            id: v4(),
            name: username,
            score: 0,
        },
    };
    return DOC_CLIENT.put(params)
        .promise()
        .then((user) => {
            return user;
        });
};

export const deleteUser = async (username: String): Promise<boolean> => {
    const params: any = {
        TableName: TABLE_NAME,
        Key: {
            name: username,
        },
    };
    return DOC_CLIENT.delete(params)
        .promise()
        .then(() => true)
        .catch(() => false);
};

export const increaseScore = async (user: User): Promise<UpdateItemOutput> => {
    const params: any = {
        TableName: TABLE_NAME,
        Key: {
            name: user.name,
        },
        UpdateExpression: 'set score = :s',
        ExpressionAttributeValues: {
            ':s': ++user.score,
        },
        ReturnValues: 'UPDATED_NEW',
    };
    return DOC_CLIENT.update(params)
        .promise()
        .then((user) => user);
};
