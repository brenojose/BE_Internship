import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { GridFSBucket } from 'mongodb'; // Import GridFSBucket

let gridfsBucket;

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

export async function connectToDb() {
    try {
        await mongoose.connect(process.env.DB_URL); 
        console.log("Connected to database!");

        const db = mongoose.connection.db; 
        gridfsBucket = new GridFSBucket(db, { bucketName: 'uploads' });
        console.log('GridFSBucket initialized!');
    } catch (err) {
        console.error('Database connection error:', err);
    }
}

export { gridfsBucket };
