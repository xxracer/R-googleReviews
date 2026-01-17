const axios = require('axios');

(async () => {
    try {
        console.log('Testing Google Reviews API...');
        const response = await axios.get('http://localhost:3001/api/google-reviews');
        console.log('Response Status:', response.status);
        console.log('Response Data:', JSON.stringify(response.data, null, 2));
    } catch (err) {
        if (err.response) {
            console.error('API Error:', err.response.status, err.response.data);
        } else {
            console.error('Connection Error:', err.message);
        }
    }
})();
