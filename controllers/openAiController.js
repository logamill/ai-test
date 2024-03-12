const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const fs = require('fs');

require('dotenv').config();

let clientApiKey = process.env.REACT_APP_OPENAI_KEY;

console.log(clientApiKey);

const openai = new OpenAI({ apiKey: clientApiKey });

router.post('/generate-text', async (req, res) => {
    console.log('inside')
    console.log(req.body)
    try {
        const { userText } = req.body;
        console.log(userText)
        const response = await openai.chat.completions.create({
            messages: [{ role: "system", content: userText }],
            model: "gpt-3.5-turbo",
        });
        console.log(response.choices.message)
       const generatedText = response.choices[0].message.content;
       res.json({ text: generatedText });
       console.log('Generated text: ', generatedText)

    } catch (error) {
        console.error('Error generating text:', error);
        res.status(500).json({ error: 'Error generating text' });
    }
});


router.post('/generate-image', async (req, res) => {
    console.log('inside image');
    console.log(req.body);

    try {
        const { userText } = req.body;
        const response = await openai.images.generate({
            model: 'dall-e-3',
            prompt: userText,
            n: 1,
            size: '1024x1024',
        });
        const responseImage = response.data[0].url
        console.log(response.data);
        res.json({ url: responseImage })
    }
    catch(error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: "Error generating image" });
    }
})

// router.post('/edit-image', async (req, res) => {
//     console.log('inside edit');
//     try {
//         const baseImage = fs.reqdFileSync('../images/20213HP.png');
     
//         const response = await openai.images.generate({
//             model: 'dall-e-3',
//             image: baseImage,
//             n: 1
//         })
//     }
// })

module.exports = router;