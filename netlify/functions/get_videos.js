// netlify/functions/get_videos.js
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);
const clientPromise = client.connect(); // 使い回し

exports.handler = async () => {
    try {
        const db = (await clientPromise).db('endless_7');
        const videos = await db.collection('videos').find().toArray();
        return {
            statusCode: 200,
            body: JSON.stringify(videos),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: err.toString(),
        };
    }
};