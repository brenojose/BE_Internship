import multer from 'multer';
import path from 'path';

// 1. CompanyProfile Upload Configuration (with file type restriction to jpeg and png)
const companyProfileStorage = multer.memoryStorage();  // Memory storage for CompanyProfile

// File filter for CompanyProfile to restrict to jpeg and png
const companyProfileFileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Only JPEG and PNG images are allowed!'));
    }
};

export const uploadCompanyProfile = multer({
    storage: companyProfileStorage,
    fileFilter: companyProfileFileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5, // File size of 5MB, adjust later
    },
});

// 2. JobPosting Upload Configuration (restrict to pdf)
const jobPostingStorage = multer.memoryStorage();  // Memory storage for JobPosting

// File filter for JobPosting to restrict to pdf only
const jobPostingFileFilter = (req, file, cb) => {
    // Allowed extensions (only PDF)
    const filetypes = /pdf/;

    // Check the file extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // Check the MIME type for PDF
    const mimetype = file.mimetype === 'application/pdf';

    // Log file details for debugging
    console.log("File Extension:", path.extname(file.originalname).toLowerCase());
    console.log("MIME Type:", file.mimetype);

    // Allow the file if both extension and MIME type match
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Only PDF files are allowed!'));
    }
};

export const uploadJobPosting = multer({
    storage: jobPostingStorage,
    fileFilter: jobPostingFileFilter,
    limits: {
        fileSize: 1024 * 1024 * 10, // File size of 10MB, adjust later
    },
});

// 3. UserProfile Upload Configuration (restrict to pdf and docx)
const userProfileStorage = multer.memoryStorage();  

// File filter for UserProfile to restrict to pdf and docx
const userProfileFileFilter = (req, file, cb) => {
    // Allowed extensions
    const filetypes = /pdf|docx/;
    
    // Check the file extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    // Check the MIME type
    const mimetype = file.mimetype === 'application/pdf' || 
                     file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    
    // Allow the file if both extension and MIME type match
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Only PDF and DOCX files are allowed!'));
    }
};

export const uploadUserProfile = multer({
    storage: userProfileStorage,
    fileFilter: userProfileFileFilter,
    limits: {
        fileSize: 1024 * 1024 * 10, // File size of 10MB, adjust later
    },
});
