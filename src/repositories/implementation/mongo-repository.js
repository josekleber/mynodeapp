const db = require('../../infra/database/mongo-db');

class MongoRepository {

    constructor(){
        this.collectionName = process.env.MONGO_COLLECTION || '';
        if (this.collectionName === '') throw new Error('cadê a variável da collection ?');
    }

    async save(entity) {
        await db.insertOne(this.collectionName, entity);
        return entity; 
    }

    async find(query){
        const result = await db.findOne(this.collectionName, query);
        return result;
    }

}

module.exports = MongoRepository;