const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const translationRoutes = require('./routes/translationRoutes');
const interpretationRoutes = require('./routes/interpretationRoutes');
const researchRoutes = require('./routes/researchRoutes');
const conferenceRoutes = require('./routes/conferenceRoutes');
const trainingRoutes = require('./routes/trainingRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/translation', translationRoutes);
app.use('/api/interpretation', interpretationRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/conference', conferenceRoutes);
app.use('/api/trainings', trainingRoutes); // ✅

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Serve French version
//app.use('/fr', express.static(path.join(__dirname, 'public', 'fr')));

// Serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});