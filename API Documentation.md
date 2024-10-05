
# FairComputers Backend API Documentation

## Table of Contents
1. [Base URL](#base-url)
2. [Authentication](#authentication)
   - [Sign Up](#sign-up)
   - [Sign In](#sign-in)
3. [Contact Form](#contact-form)
   - [Submit Contact Form](#submit-contact-form)
4. [User Profiles](#user-profiles)
   - [Create User Profile](#create-user-profile)
5. [Company Profiles](#company-profiles)
   - [Create Company Profile](#create-company-profile)
6. [Job Postings](#job-postings)
   - [Create Job Posting](#create-job-posting)
   - [Delete Job Posting](#delete-job-posting)
7. [Pages (Home, About, Services, Careers)](#pages-home-about-services-careers)
   - [Fetch Home Page](#fetch-home-page)
   - [Fetch About Page](#fetch-about-page)
   - [Fetch Services Page](#fetch-services-page)
   - [Fetch Careers Page](#fetch-careers-page)
   - [Create Page](#create-page)
   - [Update Page](#update-page)
   - [Delete Page](#delete-page)
8. [Protected Routes](#protected-routes)
   - [Protected Route Example](#protected-route-example)
9. [File Download](#file-download)
   - [Download File from GridFS](#download-file-from-gridfs)
10. [Notes](#notes)

## Base URL
```
http://localhost:3000
```

The folder contains a .env with JWT_SECRET, DB URI and PORT, please change it when testing with your MongoDB.
I also used a VS Code Extension called REST Client (Huachao Mao) to send the requests since it's simple and can be easily demonstrated. There's a file for that with predefined snippets.

## Authentication

### Sign Up
**Endpoint**: `/auth/signup`  
**Method**: `POST`  
**Description**: Register a new user.

#### Request Headers:
```
Content-Type: application/json
```

#### Request Body:
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

#### Success Response:
```json
{
  "token": "your-jwt-token",
  "user": {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "_id": "unique-user-id",
    "createdAt": "2024-10-03T12:34:56Z"
  }
}
```

#### Error Responses:
- **Status**: `400 Bad Request`  
  **Reason**: User already exists.  
  **Body**:  
  ```json
  {
    "message": "User already exists."
  }
  ```
- **Status**: `500 Internal Server Error`  
  **Reason**: Server error.  
  **Body**:  
  ```json
  {
    "message": "Server error."
  }
  ```

### Sign In
**Endpoint**: `/auth/signin`  
**Method**: `POST`  
**Description**: Login with email and password.

#### Request Headers:
```
Content-Type: application/json
```

#### Request Body:
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

#### Success Response:
```json
{
  "token": "your-jwt-token",
  "user": {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "_id": "unique-user-id",
    "createdAt": "2024-10-03T12:34:56Z"
  }
}
```

#### Error Responses:
- **Status**: `400 Bad Request`  
  **Reason**: Invalid credentials.  
  **Body**:  
  ```json
  {
    "message": "Invalid credentials."
  }
  ```
- **Status**: `500 Internal Server Error`  
  **Reason**: Server error.  
  **Body**:  
  ```json
  {
    "message": "Server error."
  }
  ```

## Contact Form

### Submit Contact Form
**Endpoint**: `/contact`  
**Method**: `POST`  
**Description**: Submit the contact form for booking an appointment.

#### Request Headers:
```
Content-Type: application/json
```

#### Request Body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "123-456-7890",
  "email": "john.doe@example.com",
  "message": "I would like to schedule an appointment."
}
```

#### Success Response:
```json
{
  "contact": {
    "firstName": "John",
    "lastName": "Doe",
    "phone": "123-456-7890",
    "email": "john.doe@example.com",
    "message": "I would like to schedule an appointment.",
    "_id": "unique-contact-id",
    "createdAt": "2024-10-03T12:34:56Z"
  }
}
```

#### Error Responses:
- **Status**: `500 Internal Server Error`  
  **Reason**: Failed to submit contact form.  
  **Body**:  
  ```json
  {
    "error": "Failed to submit contact form"
  }
  ```


## User Profiles

### Create User Profile
**Endpoint**: `/profiles`  
**Method**: `POST`  
**Description**: Upload user profile with a resume file in `pdf` or `docx` format.

#### Request Headers:
```
Content-Type: multipart/form-data
```

#### Request Body (Form Data):
- `firstName`: String (Required)  
- `lastName`: String (Required)  
- `phone`: String (Required)  
- `email`: String (Required)  
- `bio`: String (Required)  
- `linkedInLink`: String (Optional)  
- `resumeFile`: File (Optional, `pdf` or `docx`)

#### Success Response:
```json
{
  "userProfile": {
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "123-456-7890",
    "email": "johndoe@example.com",
    "bio": "Experienced developer",
    "linkedInLink": "https://linkedin.com/in/johndoe",
    "resumeFile": "unique-resume-file-id",
    "createdAt": "2024-10-03T12:34:56Z"
  }
}
```

#### Error Responses:
- **Status**: `500 Internal Server Error`  
  **Reason**: Failed to create user profile.  
  **Body**:  
  ```json
  {
    "error": "Failed to create user profile"
  }
  ```

## Company Profiles

### Create Company Profile
**Endpoint**: `/company-profile`  
**Method**: `POST`  
**Description**: Upload company profile with logo restricted to `jpeg` and `png` formats.

#### Request Headers:
```
Content-Type: multipart/form-data
```

#### Request Body (Form Data):
- `companyName`: String (Required)  
- `industry`: String (Required)  
- `website`: String (Required)  
- `about`: String (Required)  
- `contactPerson`: String (Required)  
- `contactEmail`: String (Required)  
- `contactPhoneNumber`: String (Required)  
- `companyLogo`: File (Optional, `jpeg` or `png`)

#### Success Response:
```json
{
  "profile": {
    "companyName": "Fair Computers",
    "industry": "IT Services",
    "website": "https://faircomputers.ca",
    "about": "Leading IT service provider.",
    "contactPerson": "John Doe",
    "contactEmail": "contact@faircomputers.ca",
    "contactPhoneNumber": "123-456-7890",
    "logo": "unique-logo-file-id",
    "createdAt": "2024-10-03T12:34:56Z"
  }
}
```

#### Error Responses:
- **Status**: `500 Internal Server Error`  
  **Reason**: Failed to create company profile.  
  **Body**:  
  ```json
  {
    "error": "Failed to create company profile"
  }
  ```

## Job Postings

### Create Job Posting
**Endpoint**: `/job-postings`  
**Method**: `POST`  
**Description**: Upload job postings with an optional job description file.

#### Request Headers:
```
Content-Type: multipart/form-data
```

#### Request Body (Form Data):
- `jobTitle`: String (Required)  
- `jobType`: String (Required)  
- `location`: String (Required)  
- `jobDescription`: String (Required)  
- `requiredQualifications`: String (Required)  
- `salaryRange`: String (Required)  
- `jobLink`: String (Optional)  
- `jobDescriptionFile`: File (Optional, any format)

#### Success Response:
```json
{
  "job": {
    "jobTitle": "Software Developer",
    "jobType": "Full-Time",
    "location": "Toronto, ON",
    "jobDescription": "We are looking for a skilled developer...",
    "requiredQualifications": "5+ years of experience",
    "salaryRange": "$70,000 - $90,000",
    "jobLink": "https://faircomputers.ca/jobs/developer",
    "jobDescriptionFile": "unique-file-id",
    "createdAt": "2024-10-03T12:34:56Z"
  }
}
```

#### Error Responses:
- **Status**: `500 Internal Server Error`  
  **Reason**: Failed to create job posting.  
  **Body**:  
  ```json
  {
    "error": "Failed to create job posting"
  }
  ```

### Delete Job Posting
**Endpoint**: `/job-postings/:id`  
**Method**: `DELETE`  
**Description**: Delete a job posting and its associated file from GridFS.

#### Request Parameters:
- `id`: String (Required, Job Posting ID)

#### Success Response:
```json
{
  "message": "Job posting and associated file deleted successfully"
}
```

#### Error Responses:
- **Status**: `404 Not Found`  
  **Reason**: Job posting not found.  
  **Body**:  
  ```json
  {
    "error": "Job posting not found"
  }
  ```
- **Status**: `500 Internal Server Error`  
  **Reason**: Failed to delete job posting or associated file.  
  **Body**:  
  ```json
  {
    "error": "Failed to delete job posting"
  }
  ```

## Pages (Home, About, Services, Careers)

### Fetch Home Page
**Endpoint**: `/home`  
**Method**: `GET`  
**Description**: Fetch data for the home page.

#### Success Response:
```json
{
  "page": {
    "title": "Home",
    "content": "Welcome to FairComputers..."
  }
}
```

### Fetch About Page
**Endpoint**: `/about`  
**Method**: `GET`  
**Description**: Fetch data for the about page.

#### Success Response:
```json
{
  "page": {
    "title": "About Us",
    "content": "FairComputers is a leading provider..."
  }
}
```

### Fetch Services Page
**Endpoint**: `/services`  
**Method**: `GET`  
**Description**: Fetch data for the services page.

#### Success Response:
```json
{
  "page": {
    "title": "Our Services",
    "content": "We provide a wide range of IT solutions..."
  }
}
```

### Fetch Careers Page
**Endpoint**: `/careers`  
**Method**: `GET`  
**Description**: Fetch data for the careers page.

#### Success Response:
```json
{
  "page": {
    "title": "Careers",
    "content": "Join our team at FairComputers..."
  }
}
```

### Create Page
**Endpoint**: `/pages`  
**Method**: `POST`  
**Description**: Create a new page.

#### Request Headers:
```
Content-Type: application/json
```

#### Request Body:
```json
{
  "title": "New Page Title",
  "slug": "new-page-slug",
  "content": "Content of the new page..."
}
```

#### Success Response:
```json
{
  "page": {
    "title": "New Page Title",
    "slug": "new-page-slug",
    "content": "Content of the new page...",
    "updatedAt": "2024-10-03T12:34:56Z",
    "_id": "unique-page-id"
  }
}
```

## File Download

### Download File from GridFS
**Endpoint**: `/files/:filename`  
**Method**: `GET`  
**Description**: Download a file from GridFS by its filename.

#### Request Parameters:
- `filename`: String (Required, Filename to download)

#### Success Response:
- Status: `200 OK`
- Headers:
  - `Content-Disposition: attachment; filename="filename.ext"`
  - `Content-Type: application/octet-stream` (or appropriate MIME type)
- Body: Binary file data.

```http
GET http://localhost:3000/files/1727998902247-4c8a624a6624.pdf
```

#### Error Responses:
- **Status**: `404 Not Found`  
  **Reason**: File does not exist.  
  **Body**:  
  ```json
  {
    "error": "No file exists with the specified name"
  }
  ```
- **Status**: `500 Internal Server Error`  
  **Reason**: Error occurred while streaming the file.  
  **Body**:  
  ```json
  {
    "error": "Error occurred while streaming the file"
  }
  ```
