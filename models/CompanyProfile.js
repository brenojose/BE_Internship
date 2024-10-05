import mongoose from 'mongoose';

const companyProfileSchema = new mongoose.Schema ({
    companyName: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    contactPerson: {
        type: String,
        required: true,
    },
    contactEmail: {
        type: String,
        required: true,
    },
    contactPhoneNumber: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const CompanyProfile = mongoose.model('CompanyProfile', companyProfileSchema);