import mongoose from 'mongoose';

const jobPostingSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    requiredQualifications: {
        type: String,
        required: true,
    },
    salaryRange: {
        type: String,
        required: true,
    },
    jobLink: {
        type: String,
    },
    jobDescriptionFile: {
        type: String,
    },
    approval: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const JobPosting = mongoose.model('JobPosting', jobPostingSchema);