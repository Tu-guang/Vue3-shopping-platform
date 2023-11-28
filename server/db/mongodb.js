//mongodb.js
const {MongoClient} = require("mongodb");
// Connection URL
const url = "mongodb://root:123456@192.168.3.117:27017/";
const client = new MongoClient(url);

// Database Name
const dbName = "admin";

/**
 *添加数据到数据库
 * @param { Array} data
 * @returns string
 */
const insertMany = async (collectionName, data) => {
    // Use connect method to connect to the server
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    await collection.insertMany(data);
    client.close();
    return true;
};

/**
 * 更新集合中符合条件的所有文档的指定字段值
 * @param {string} collectionName 集合名称
 * @param {object} filter 查询条件
 * @param {object} updateFields 需要更新的字段和值
 * @returns {Promise<boolean>}
 */
const updateMany = async (collectionName, filter, updateFields) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.updateMany(filter, {$set: updateFields});
        client.close();
        return result.acknowledged === true;
    } catch (error) {
        console.error(error);
        return false;
    }
};


/**
 * 清空数据库
 */
const deleteMany = async (collectionName) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.deleteMany();
        client.close();
        return result.acknowledged === true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

/**
 * 根据ID删除文档
 * @param {string} collectionName - 集合名称
 * @param {string} id - 要删除的文档ID
 * @returns {string} - 删除成功的消息
 */
const deleteById = async (collectionName, id) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.deleteOne({id: id});
        client.close();
        return result.acknowledged === true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

/**
 * 根据ID更新文档
 * @param {string} collectionName - 集合名称
 * @param {string} id - 要更新的文档ID
 * @param {object} updateData - 更新的数据
 * @returns {string} - 更新成功的消息
 */
const updateById = async (collectionName, id, updateData) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.updateOne({id: id}, {$set: updateData})
        client.close();
        return result.acknowledged === true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

/**
 * 增加文档
 * @param {string} collectionName - 集合名称
 * @param {object} document - 要插入的文档数据
 * @returns {string} - 插入成功的消息
 */
const insertDocument = async (collectionName, document) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(document);
        client.close();
        console.log(result)
        return result.acknowledged === true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

/**
 * 获取数据集
 * @returns array
 */
const getData = async (collectionName, user_id) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        let array = []
        if (user_id !== null) {
            array = await collection.find({user_id: user_id}).toArray();
        } else {
            array = await collection.find().toArray();
        }
        client.close();
        return array;
    } catch (error) {
        console.error(error);
        return [];
    }
};

/**
 * 获取数据集
 * @returns array
 */
const query = async (collectionName, obj) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const array = await collection.findOne(obj);
        client.close();
        return array;
    } catch (error) {
        console.error(error);
        return {};
    }
};

/**
 * 获取数据集
 * @returns array
 */
const queryData = async (collectionName, id) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const array = await collection.findOne({id: id});
        client.close();
        return array;
    } catch (error) {
        console.error(error);
        return {};
    }
};

//把方法暴露出去
module.exports = {
    insertMany,
    getData,
    deleteMany,
    deleteById,
    updateById,
    insertDocument,
    updateMany,
    queryData,query
};
