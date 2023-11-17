const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// доступ со всех api
app.use(cors());

// перевод req.body в json
app.use(express.json());

// uploads files
// app.use('/images', express.static(path.join(__dirname, './images')));

// роутиинг
app.use('/api/auth', require('./routes/authRouter'));
app.use('/api/users', require('./routes/userRouter'));
app.use('/api/company', require('./routes/companyRouter'));
// app.use("/api/notes", require("./routes/noteRouter"));
const isdev = 'mongodb://localhost:27017/okeiStaticExel';
const isprod =
    'mongodb+srv://admin:rrr123@cluster0.gin8uzz.mongodb.net/okeiStaticExel?retryWrites=true&w=majority';
const start = async () => {
    try {
        // connectDB
        await mongoose.connect(isprod);

        app.listen(3501, () =>
            console.log(`Server is listening port ${3501}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
