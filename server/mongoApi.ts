import {MongoClient, UpdateWriteOpResult} from 'mongodb';
import {v4 as uuid} from 'uuid';
import {User} from './server';

const mongoUrl = 'mongodb://localhost:27017/';

const ticTacToeDatabase = 'ticTacToe';
const userCollection = 'user';

export const getAllUser = async (): Promise<User[] | undefined> => {
    let mongoClient, db;
    try {
        mongoClient = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
        db = mongoClient.db(ticTacToeDatabase);
        const coll = db.collection(userCollection);
        return await coll.find({}).toArray();
    } catch (e) {
        console.error(e);
    } finally {
        await mongoClient?.close();
    }
};

export const getUserByUsername = async (name: string): Promise<User | null | undefined> => {
    let mongoClient, db;
    try {
        mongoClient = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
        db = mongoClient.db(ticTacToeDatabase);
        const coll = db.collection(userCollection);
        return await coll.findOne({name});
    } catch (e) {
        console.error(e);
    } finally {
        await mongoClient?.close();
    }
};

export const createUser = async (name: string): Promise<void> => {
    let mongoClient, db;
    try {
        mongoClient = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
        db = mongoClient.db(ticTacToeDatabase);
        const coll = db.collection(userCollection);
        const id = uuid();
        await coll.insertOne({id, name, score: 1});
    } catch (e) {
        console.error(e);
    } finally {
        await mongoClient?.close();
    }
};

export const updateUser = async (user: User): Promise<void> => {
    let mongoClient, db;
    try {
        mongoClient = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
        db = mongoClient.db(ticTacToeDatabase);
        const coll = db.collection(userCollection);
        await coll.updateOne({id: user._id}, {$set: {score: ++user.score}});
    } catch (e) {
        console.error(e);
    } finally {
        await mongoClient?.close();
    }
};
