const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

//initiate connection to database server
const InitiateMongoServer = require('./db');
InitiateMongoServer();

const port = process.env.PORT || 8700;
//make object of express
let app = express();
// use as a middleware for cross origin resource sharing
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(fileUpload());

//Health check
app.get('/',(req,res)=>{
    res.send("Health Ok")
});

const userRouter = require('./routes/userRouter');
app.use('/user', userRouter)

const classRouter = require('./routes/classRouter');
app.use('/class', classRouter)

const ttableRouter = require('./routes/ttableRouter');
app.use('/ttable', ttableRouter)

const admissionRouter = require('./routes/admissionRouter');
app.use('/admission', admissionRouter);

const feesRouter = require('./routes/feesRouter');
app.use('/fees', feesRouter);

const staffRouter = require('./routes/staffRouter');
app.use('/staff', staffRouter);

app.listen(port,"0.0.0.0",(err1) => {
    if(err1) throw err1;
    console.log(`App is running on port ${port}`)
})
    
 