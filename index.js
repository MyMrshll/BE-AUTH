require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./src/config/database');
const Users = require('./src/models/UserModel');
const router = require('./src/routes/Route');
const log = require('./src/middleware/log');
const cookieParser = require('cookie-parser');
// try {
//     db.authenticate();
//     console.log('Database connected successfully')
//     Users.sync();
// } catch (error) {
//     console.log(error)
// }
app.use(cookieParser());
// Middleware
app.use(log);
// CORS AND JSON HANDLER
app.use(cors());
app.use(express.json());

// Middlewares router
app.use(router)


// Server Listem
const port = 5000 || process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})