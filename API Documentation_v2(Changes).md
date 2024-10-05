
## Changes to the API Documentation for FairComputers

### 0. All the REST Request have been updated

### 1. Job Postings - New Approval System

#### Create Job Posting (Pending Approval)
- **Endpoint**: `/job-postings`
- **Method**: `POST`
- **Description**: Create a job posting that requires admin approval before being listed publicly.
- **Approval**: All newly created job postings have `approval: false` by default.
- **Response**: 
  ```json
  {
    "job": {
      "jobTitle": "Software Developer",
      "approval": false,
      ...
    }
  }
  ```

#### Approve Job Posting (Admin Only)
- **Endpoint**: `/admin/job-postings/:id/approve`
- **Method**: `PUT`
- **Description**: Approve a job posting so it can be listed publicly.
- **Request Parameters**: 
  - `id`: String (Required, Job Posting ID)

#### List Approved Job Postings
- **Endpoint**: `/careers`
- **Method**: `GET`
- **Description**: Fetch only job postings that have been approved.
- **Response**:
  ```json
  {
    "jobPostings": [
      {
        "jobTitle": "Software Developer",
        "approval": true,
        ...
      }
    ]
  }
  ```

### 2. Update User Profile
#### Update User Profile (Form and Resume File)
- **Endpoint**: `/profiles/:id`
- **Method**: `PUT`
- **Description**: Update user profile, allowing both form data and resume file upload (`pdf` or `docx`).
- **Request Headers**:
  ```
  Content-Type: multipart/form-data
  ```
- **Request Body (Form Data)**:
  - `firstName`: String (Required)
  - `lastName`: String (Required)
  - `phone`: String (Required)
  - `email`: String (Required)
  - `bio`: String (Required)
  - `linkedInLink`: String (Optional)
  - `resumeFile`: File (Optional, `pdf` or `docx`)

### 3. Removed Pages Section
- All endpoints and related documentation for the following were removed:
  - **Pages (Home, About, Services, Careers)**: Removed fetch, create, update, and delete page functionality.
