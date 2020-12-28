const MongoClient = require('mongodb').MongoClient;
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
        await mongoClient.close();
    }
};

export const getUserByUsername = async (name) => {
    let mongoClient, db;
    try {
        mongoClient = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
        db = mongoClient.db(ticTacToeDatabase);
        const coll = db.collection(userCollection);
        return await coll.findOne({name});
    } catch (e) {
        console.error(e);
    } finally {
        await mongoClient.close();
    }
};

export const createUser = async (name) => {
    let mongoClient, db;
    try {
        mongoClient = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
        db = mongoClient.db(ticTacToeDatabase);
        const coll = db.collection(userCollection);
        const id = require('crypto').randomBytes(10).toString('hex');
        return await coll.insertOne({id, name, score: 1});
    } catch (e) {
        console.error(e);
    } finally {
        await mongoClient.close();
    }
};

export const updateUser = async (name, score) => {
    let mongoClient, db;
    try {
        mongoClient = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
        db = mongoClient.db(ticTacToeDatabase);
        const coll = db.collection(userCollection);
        return await coll.findOneAndUpdate({name}, {score});
    } catch (e) {
        console.error(e);
    } finally {
        await mongoClient.close();
    }
};
