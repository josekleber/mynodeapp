const MongoClient = require('mongodb');

const mongo_uri = process.env.MONGO_URI || '';
const mongo_db = process.env.MONGO_DB_NAME || '';

if (mongo_uri === '' || mongo_db === '')
    throw new Error('Variáveis do banco não definidas.');

const connectDb = async () => {

    const client = await MongoClient.connect(mongo_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // return handle to database
    return client;
};

const createCollection = async (
    collectionName,
    isCapped = false,
    size = 0,
    max = 0
) => {
    const conn = await connectDb();
    let db = conn.db(mongo_db);
    let collation = {
        locale: "pt",
    };
    let options = {
        capped: isCapped,
        size: size,
        max: max,
        collation: collation,
    };
    const result = await db.createCollection(collectionName, options);
    conn.close();
    return result;
};

const findOne = async (collectionName, query, options) => {
    const conn = await connectDb();
    let db = conn.db(mongo_db);
    const data = await db.collection(collectionName).findOne(query, options || {});
    conn.close();
    return data;
};

const findById = async (collectionName, id, options) => {
    const conn = await connectDb();
    let db = conn.db(mongo_db);
    const data = await db
        .collection(collectionName)
        .findOne({ _id: new ObjectId(id) }, options || {});
    conn.close();
    return data;
};

const insertOne = async (collectionName, doc) => {
    const conn = await connectDb();
    let db = conn.db(mongo_db);
    const data = await db.collection(collectionName).insertOne(doc);
    conn.close();
    return data;
};


module.exports = { findOne, findById, insertOne };





