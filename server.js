import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.static('public'));

app.get('/weather', async(req, resp) => {
  const city = req.query.city;
  const apiKey = process.env.WEATHER_API_KEY;

  if(!city) {
    return resp.status(400).json({ error: 'City name is required' });
  }
  try {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=yes`;
    const apiResponse = await fetch(apiUrl);
    const data = await apiResponse.json();
    resp.json(data);
  } catch (error) {
    resp.status(500).json({ error: 'Failed to fetch weather data' });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});