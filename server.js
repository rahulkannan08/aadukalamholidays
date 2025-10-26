const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // load MONGODB_URI from .env
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// MongoDB Connection (Atlas)
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aadukalamholidays';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
  });

// Schema Definitions
const destinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image_url: String,
    category: String,
    details: {
        itinerary: String,
        highlights: [String]
    }
}, { timestamps: true });

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: Date, required: true },
    numTravelers: { type: Number, required: true },
    specialRequests: { type: String },
    totalPrice: { type: Number, default: 0 },
    status: { type: String, default: 'pending' }
}, { timestamps: true });

const newsletterSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }
}, { timestamps: true });

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: String,
    message: { type: String, required: true }
}, { timestamps: true });

// Models
const Destination = mongoose.model('Destination', destinationSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const Newsletter = mongoose.model('Newsletter', newsletterSchema);
const Contact = mongoose.model('Contact', contactSchema);

// Routes

// Get all destinations
app.get('/api/destinations', async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get destinations by category
app.get('/api/destinations/:category', async (req, res) => {
    try {
        const destinations = await Destination.find({ category: req.params.category });
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a booking
app.post('/api/bookings', async (req, res) => {
    try {
        console.log('Received booking request:', req.body); // Log incoming request

        // Validate required fields
        const { name, email, destination, numTravelers, date } = req.body;
        
        if (!name || !email || !destination || !numTravelers || !date) {
            console.log('Missing required fields:', { name, email, destination, numTravelers, date });
            return res.status(400).json({
                status: 'error',
                message: 'Please fill in all required fields',
                missing: Object.entries({ name, email, destination, numTravelers, date })
                    .filter(([_, value]) => !value)
                    .map(([key]) => key)
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide a valid email address'
            });
        }

        // Additional validations
        if (numTravelers < 1) {
            return res.status(400).json({
                status: 'error',
                message: 'Number of travelers must be at least 1'
            });
        }

        // Create and save booking
        const booking = new Booking({
            name,
            email,
            destination,
            numTravelers,
            date: new Date(date),
            specialRequests: req.body.specialRequests || '',
            status: 'pending',
            totalPrice: 0 // You can calculate this based on your pricing logic
        });

        console.log('Creating booking:', booking); // Log booking object

        await booking.save();

        res.status(201).json({
            status: 'success',
            message: 'Your booking has been confirmed!',
            booking: booking
        });
    } catch (error) {
        console.error('Booking error:', error);
        res.status(400).json({
            status: 'error',
            message: error.message || 'An error occurred while processing your booking'
        });
    }
});

// Subscribe to newsletter
app.post('/api/newsletter', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({
                status: 'error',
                message: 'Email is required'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide a valid email address'
            });
        }

        const subscriber = new Newsletter({ email });
        await subscriber.save();

        res.status(201).json({
            status: 'success',
            message: 'Thank you for subscribing to our newsletter!'
        });
    } catch (error) {
        if (error.code === 11000) { // Duplicate email error
            res.status(400).json({
                status: 'error',
                message: 'This email is already subscribed to our newsletter'
            });
        } else {
            console.error('Newsletter subscription error:', error);
            res.status(400).json({
                status: 'error',
                message: error.message || 'An error occurred while processing your subscription'
            });
        }
    }
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
    try {
        // Validate required fields
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ 
                status: 'error',
                message: 'Please fill in all required fields' 
            });
        }

        // Create and save contact message
        const contact = new Contact(req.body);
        await contact.save();
        
        res.status(201).json({ 
            status: 'success',
            message: 'Your message has been sent successfully!' 
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(400).json({ 
            status: 'error',
            message: error.message || 'An error occurred while sending your message' 
        });
    }
});

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});