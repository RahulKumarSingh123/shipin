require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnection = require("./utils/db");
const authRouter = require('./routes/authRouter');
const adminProductRouter = require("./routes/admin/productRouter");

//Initializing app
const app = express();

//Connecting Database
dbConnection();

//Setting Cors policy
app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials: true
}))

//Other middlewares
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductRouter);

//Starting app
app.listen(5000, () => {
    console.log("Server listening on port 5000");
})