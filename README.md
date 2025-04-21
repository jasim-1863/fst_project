# Blood Donation App

A full-stack application built with the MERN (MongoDB, Express, React, Node.js) stack to connect blood donors with medical institutions in need of blood donations.

## Features

### User Management
- Donor registration (name, email, phone, blood type, address)
- Medical institution registration (institution name, location, contact person, email, phone)
- Authentication with JWT

### Donor Features
- View nearby blood donation requests
- Schedule donation appointments
- Track personal donation history
- Update availability status

### Medical Institution Features
- Create blood requests specifying blood type, quantity, urgency level, and location
- Manage and update request status
- View responding donors

### Additional Features
- Search functionality for blood requests by location and blood type
- Dashboard with donation statistics
- Educational content about blood donation

## Tech Stack

- **Frontend**: React.js, Redux, React Router, Bootstrap/Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Deployment**: (To be determined)

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas connection)
- npm or yarn

### Setup

1. Clone the repository
```
git clone <repository-url>
cd blood-donation-app
```

2. Install server dependencies
```
npm install
```

3. Install client dependencies
```
cd frontend
npm install
cd ..
```

4. Create a .env file in the root directory with the following variables
```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

5. Run the development server
```
npm run dev
```

This will start the server on port 5000 and the client on port 3000.

## API Endpoints

### Authentication
- `POST /api/users` - Register a new user
- `POST /api/users/login` - Login user

### Donor
- `POST /api/donors` - Create donor profile
- `GET /api/donors/profile` - Get donor profile
- `PUT /api/donors/profile` - Update donor profile
- `GET /api/donors/eligible-requests` - Get eligible blood requests
- `POST /api/donors/respond/:requestId` - Respond to a blood request
- `GET /api/donors/donation-history` - Get donation history
- `PUT /api/donors/availability` - Update availability status

### Medical Institution
- `POST /api/institutions` - Create institution profile
- `GET /api/institutions/profile` - Get institution profile
- `PUT /api/institutions/profile` - Update institution profile
- `POST /api/institutions/blood-requests` - Create blood request
- `GET /api/institutions/blood-requests` - Get institution blood requests
- `GET /api/institutions/blood-requests/:id` - Get blood request by ID
- `PUT /api/institutions/blood-requests/:id` - Update blood request
- `PUT /api/institutions/blood-requests/:id/confirm/:donorId` - Confirm donor appointment
- `PUT /api/institutions/blood-requests/:id/complete/:donorId` - Mark donation as completed

### Blood Request
- `GET /api/bloodRequests` - Get all blood requests
- `GET /api/bloodRequests/:id` - Get blood request by ID
- `GET /api/bloodRequests/search` - Search blood requests
- `GET /api/bloodRequests/events` - Get upcoming blood donation events
- `GET /api/bloodRequests/stats` - Get blood request statistics

## Project Structure
```
blood-donation-app/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
├── frontend/
│   ├── public/
│   └── src/
│       ├── actions/
│       ├── components/
│       ├── constants/
│       ├── pages/
│       ├── reducers/
│       └── utils/
└── .env
```

## License
MIT 