const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { startDataCollector } = require('./services/dataCollector');
const LocoPosition = require('./models/LocoPosition');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// --- API Routes ---

// GET: Search for the latest position of a single loco
app.get('/api/loco/:locoNo', async (req, res) => {
    try {
        const { locoNo } = req.params;
        // Find the most recent entry for the given loco number
        const position = await LocoPosition.findOne({ loco_no: locoNo }).sort({ timestamp: -1 });

        if (!position) {
            return res.status(404).json({ message: 'Loco not found or no recent data available.' });
        }
        res.json(position);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET: Search for the latest position of a train
// This works by finding the loco currently assigned to that train
app.get('/api/train/:trainNo', async (req, res) => {
    try {
        const { trainNo } = req.params;
        // Find the most recent entry for the given train number
        const position = await LocoPosition.findOne({ train_no: trainNo }).sort({ timestamp: -1 });

        if (!position) {
            return res.status(404).json({ message: 'Train not found or no recent data available.' });
        }
        // Here you could also fetch the schedule from the other API if needed
        res.json(position);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // Start the background data collection service
    startDataCollector();
});