// Import necessary modules
import { UserProfile } from '../models/UserProfile.js';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import crypto from 'crypto';
import path from 'path';

let gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
});

// Create UserProfile
export const createUserProfile = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            bio,
            linkedInLink,
        } = req.body;

        let fileId = null;
        if (req.file) {
            // Generate a unique filename for the resume
            const filename = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${path.extname(req.file.originalname)}`;

            // Stream the file into GridFS
            const uploadStream = gridfsBucket.openUploadStream(filename);
            uploadStream.end(req.file.buffer);  // Write the file buffer to GridFS
            fileId = uploadStream.id;
        }

        const newUserProfile = await UserProfile.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            bio,
            linkedInLink,
            resumeFile: fileId ? fileId.toString() : null,  // Store the GridFS file ID
        });

        res.status(201).json({ userProfile: newUserProfile });
    } catch (error) {
        console.error('Error creating UserProfile:', error);
        res.status(500).json({ error: 'Failed to create UserProfile' });
    }
};

// Update UserProfile
export const updateUserProfile = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            bio,
            linkedInLink,
        } = req.body;

        // Find the user profile by ID
        const profile = await UserProfile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ error: 'UserProfile not found' });
        }

        // Update the fields that were provided in the request body
        profile.firstName = firstName || profile.firstName;
        profile.lastName = lastName || profile.lastName;
        profile.email = email || profile.email;
        profile.phoneNumber = phoneNumber || profile.phoneNumber;
        profile.bio = bio || profile.bio;
        profile.linkedInLink = linkedInLink || profile.linkedInLink;

        // If a new resume file was uploaded, handle the file update
        if (req.file) {
            // Delete the old resume file from GridFS, if it exists
            if (profile.resumeFile) {
                await gridfsBucket.delete(new mongoose.Types.ObjectId(profile.resumeFile));
            }

            // Generate a unique filename for the new resume file
            const filename = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${path.extname(req.file.originalname)}`;
            const uploadStream = gridfsBucket.openUploadStream(filename);
            uploadStream.end(req.file.buffer);  // Write file buffer directly to GridFS

            // Update the resume file ID in the profile
            profile.resumeFile = uploadStream.id.toString();
        }

        // Save the updated profile to the database
        await profile.save();

        res.status(200).json({ message: 'UserProfile updated successfully', userProfile: profile });
    } catch (error) {
        console.error('Error updating UserProfile:', error);
        res.status(500).json({ error: 'Failed to update UserProfile' });
    }
};
