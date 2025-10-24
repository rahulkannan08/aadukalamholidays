# AADUKALAM HOLIDAYS - Travel Website

A full-stack travel website for exploring Tamil Nadu destinations, built with HTML, CSS, JavaScript for the frontend and Node.js, MongoDB for the backend.

## Project Overview

This website allows users to:
- Browse travel destinations in Tamil Nadu
- Book travel packages
- Submit contact inquiries
- Subscribe to newsletters
- View testimonials and gallery
- Read travel blog posts

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)
- Font Awesome Icons
- Responsive Design

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)

## Prerequisites

Before running this project, make sure you have the following installed:
1. [Node.js](https://nodejs.org/) (LTS version recommended)
2. [MongoDB](https://www.mongodb.com/try/download/community)
3. npm (comes with Node.js)

## Installation & Setup

1. Clone or download the project to your local machine:
```bash
git clone <repository-url>
cd ProjectX
```

2. Install the required dependencies:
```bash
npm install
```

3. Make sure MongoDB is running on your system
   - Windows: MongoDB should be running as a service
   - Mac/Linux: Run `mongod` in a terminal

4. Start the backend server:
```bash
node server.js
```

5. In a separate terminal, start the frontend server:
```bash
http-server
```

6. Access the website:
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3000

## Project Structure

```
ProjectX/
├── index.html          # Main frontend file
├── server.js           # Node.js backend server
├── package.json        # Project dependencies
└── README.md          # Project documentation
```

## API Endpoints

### Destinations
- GET `/api/destinations` - Get all destinations
- GET `/api/destinations/:category` - Get destinations by category

### Bookings
- POST `/api/bookings` - Create a new booking
  ```json
  {
    "name": "string",
    "email": "string",
    "destination": "string",
    "numTravelers": "number",
    "date": "date",
    "specialRequests": "string"
  }
  ```

### Newsletter
- POST `/api/newsletter` - Subscribe to newsletter
  ```json
  {
    "email": "string"
  }
  ```

### Contact
- POST `/api/contact` - Send contact message
  ```json
  {
    "name": "string",
    "email": "string",
    "subject": "string",
    "message": "string"
  }
  ```

## Database Schema

### Destinations
- name (String, required)
- description (String)
- price (Number, required)
- image_url (String)
- category (String)

### Bookings
- name (String, required)
- email (String, required)
- destination (String, required)
- date (Date, required)
- numTravelers (Number, required)
- specialRequests (String)
- totalPrice (Number)
- status (String, default: 'pending')

### Newsletter Subscribers
- email (String, required, unique)
- createdAt (Date)

### Contact Messages
- name (String, required)
- email (String, required)
- subject (String)
- message (String, required)
- createdAt (Date)

## Features

1. **Responsive Design**
   - Mobile-first approach
   - Works on all device sizes

2. **Interactive UI Elements**
   - Image carousel
   - Testimonial slider
   - Lightbox gallery
   - Interactive forms

3. **Form Validation**
   - Client-side validation
   - Server-side validation
   - Error handling

4. **Backend Features**
   - RESTful API
   - MongoDB integration
   - Error handling
   - Data validation

## Common Issues & Solutions

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MongoDB connection string
   - Verify network connectivity

2. **API Errors**
   - Check server console for error logs
   - Verify request payload format
   - Ensure all required fields are provided

3. **Frontend Issues**
   - Clear browser cache
   - Check browser console for errors
   - Verify API endpoint URLs

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any queries or support, please contact:
- Email: [your-email@example.com]
- Website: [your-website.com]