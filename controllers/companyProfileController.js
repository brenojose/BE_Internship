import { CompanyProfile } from '../models/CompanyProfile.js';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import crypto from 'crypto';
import path from 'path';

let gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
});

export const createCompanyProfile = async (req, res) => {
    try {
        const {
            companyName,
            industry,
            website,
            about,
            contactPerson,
            contactEmail,
            contactPhoneNumber,
        } = req.body;

        let fileId = null;
        if (req.file) {
            // Generate a unique filename for the logo
            const filename = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${path.extname(req.file.originalname)}`;
            
            // Stream the file into GridFS
            const uploadStream = gridfsBucket.openUploadStream(filename);
            uploadStream.end(req.file.buffer);  // Write the file buffer to GridFS
            fileId = uploadStream.id;
        }

        const newProfile = await CompanyProfile.create({
            companyName,
            industry,
            website,
            about,
            contactPerson,
            contactEmail,
            contactPhoneNumber,
            logo: fileId ? fileId.toString() : null,  // Store the GridFS file ID
        });

        res.status(201).json({ profile: newProfile });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create company profile' });
    }
};
