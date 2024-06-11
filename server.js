const express = require("express")
var React = require('react')
var ReactDOM = require('react-dom');
var bodyParser = require('body-parser')
let  app = express();
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false, parameterLimit: 50000 }))
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static('src'));
const PORT = process.env.PORT || 3000

var server = app.listen(PORT || 3000, function() {
    console.log("listening on port number %d", server.address().port);
  });

app.get('/', function(req, res){
    res.sendFile('/src/index.html')
})

// Dictionary to store conversation history
const conversationHistory = {};

// Endpoint to receive text input and generate response
app.post('/chat', async (req, res) => {
    // Get text input from request
    const data = req.body
    const inputText = data.query;

    // Get conversation ID from request
    const history = data.history;

    // Retrieve conversation history

    // Add current input to conversation history
    history.push(inputText);

    try {
        // Make API request to ChatGPT-4
        const response = await chatWithGPT(inputText, history);


        // Return response as JSON
    res.json({ response:response, success:true  });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error', success:false });
    }
});

// Function to make API request to ChatGPT-4
async function chatWithGPT(inputText, history) {
    // Specify your ChatGPT-4 API endpoint
    const apiEndpoint = 'https://api.openai.com/v1/chat/';

    // Specify your ChatGPT-4 API key

    // Prepare request headers
    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };
    const combinedPrompt = history.join('\n') + '\n' + inputText;
    // Prepare request payload
    const payload = {
        text: inputText,
        history: history  // Pass conversation history to the API
    };

    // Make API request
    const response = await fetch(chatGPT4Endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: combinedPrompt,
            max_tokens: 150, // Adjust as needed
            temperature: 0.7 // Adjust as needed
        })
    });
    
    // Extract response data
    const responseData = await response.json();

    // Extract response text
    const responseText = responseData.choices[0].text.trim();

    return responseText;
}


