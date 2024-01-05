const express = require('express');
const corsConfig = require('./middleware/corsConfig');
const cookieParser = require('cookie-parser');
/* const importRoutes = require('./routes/import'); */
const exportRoutes = require('./routes/export');
const User = require('./db/models/User');
const errorHandler = require('./middleware/errorHandler')

const authRoutes = require('./routes/authRoutes');

const db = require('./db');

const app = express();
app.use(corsConfig);
app.use(cookieParser());

// Connect to the database
db.connect();

// Middleware to parse JSON
app.use(express.json());

// Routes
/* app.use('/import', importRoutes); */

app.use('/api/export', exportRoutes);

app.use('/api/auth', authRoutes);

app.use(errorHandler);

User.createTable().then(() => {
  console.log('User table created!');
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app;