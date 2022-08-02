const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

//routes
const homeRouter = require("./routes/home");
app.use("/", homeRouter);

const studentRouter = require("./routes/student");
app.use("/student", studentRouter);

const addressRouter = require("./routes/address");
app.use("/address", addressRouter);


//function to connect to Atlas db
const connectDB = (uri) => {
    return mongoose.connect(uri);
}

//server started function
const start = async () => {
    try {
        await connectDB(uri);
        app.listen(port, () => {
            console.log(`Server is running on port : ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}
start();
