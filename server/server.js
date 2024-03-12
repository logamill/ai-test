const express = require('express');
const cors = require('cors');

const openAiController = require('./controllers/openAiController');

const app = express();

// enable cors
app.use(cors());

app.use(express.json());

//routes
app.use('/api/openai', openAiController);

app.listen(3033, () => {
    console.log('Server is running on port 3033');
});

