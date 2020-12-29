import {MongoClient} from 'mongodb';
import {v4 as uuid} from 'uuid';

const mongoUrl = 'mongodb://localhost:27017/';

const ticTacToeDatabase = 'ticTacToe';
const userCollection = 'user';

export const getAllUser = async () => {
    let mongoClient, db;
    try {
        mongoClient = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
        db = mongoClient.db(ticTacToeDatabase);
        const coll = db.collection(userCollection);
        return await coll.find().toArray();
    } catch (e) {
        console.error(e);
    } finally {
        await mongoClient?.close();
    }
};

export const getUserByUsername = async (name: string) => {
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

export const createUser = async (name: string) => {
    let mongoClient, db;
    try {
        mongoClient = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
        db = mongoClient.db(ticTacToeDatabase);
        const coll = db.collection(userCollection);
        const id = uuid();
        return await coll.insertOne({id, name, score: 1});
    } catch (e) {
        console.error(e);
    } finally {
        await mongoClient?.close();
    }
};

export const updateUser = async (name: string, score: number) => {
    let mongoClient, db;
    try {
        mongoClient = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
        db = mongoClient.db(ticTacToeDatabase);
        const coll = db.collection(userCollection);
        return await coll.findOneAndUpdate({name}, {score});
    } catch (e) {
        console.error(e);
    } finally {
        await mongoClient?.close();
    }
};
