const express = require('express')
const cors = require('cors');
const cookieParser = require("cookie-parser");
const mongoDBConn = require('./config/mongoDbConfig');
const router = require('./routers/routers');
const app = express()
app.use(express.json())
// app.use(cors({
//     origin: "https://task31-frontend-5qdm.vercel.app", 
//     credentials: true
// }))

app.use(
    cors({
      origin: "https://task31-frontend-5qdm.vercel.app", // Your frontend URL
      credentials: true, // Allow cookies and authentication headers
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type,Authorization",
    })
  );
app.use(cookieParser())
// const port = 5000
app.use('/api/v1', router);
mongoDBConn()
// app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
module.exports = app;