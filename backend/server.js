const express = require('express');
const cors = require('cors');
require('dotenv').config();

const moodRoutes = require('./routes/mood');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/mood', moodRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Moodify backend running on port ${PORT}`);
});

