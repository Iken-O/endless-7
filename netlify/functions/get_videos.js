// netlify/functions/get_videos.js
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URI);
const clientPromise = client.connect(); // 使い回し

exports.handler = async () => {
    try {
        const db = (await clientPromise).db('endless_7');
        const videos = await db.collection('videos').find().toArray();

        // oEmbed URL を組み立てるヘルパー
        const makeOembedUrl = (videoId) =>
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

        // 並列で oEmbed を叩く
        const enriched = await Promise.all(videos.map(async v => {
            try {
                const res = await fetch(makeOembedUrl(v.videoId));
                if (!res.ok) throw new Error(`oEmbed ${v.videoId} failed`);
                const { title } = await res.json();
                return { ...v, title };
            } catch {
                return { ...v, title: 'タイトル取得失敗' };
            }
        }));

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(enriched),
        };
    } catch (err) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({ error: err.toString() }),
        };
    }
};