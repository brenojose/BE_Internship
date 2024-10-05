import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema ({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    linkedInLink: {
        type: String,
        required: false,
    },
    resumeFile: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const UserProfile = mongoose.model('UserProfile', userProfileSchema);