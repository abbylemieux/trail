import express from 'express';

// Create a new express application instance
const app = express();

//setup api routes
app.get('/api', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

//listen and start server on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
