import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './model/connectDB.js';
import User from './model/model.js';

const DB_URL=process.env.MONGO_URI;
const PORT = 5000;



const app = express();
app.use(express.json()); // Middleware that reads JSON data sent by client and converts it into JavaScript object so we can access it using req.body

//Database connection
connectDB(DB_URL);


app.get('/',(req,res)=>{
    res.send("This is home page");
});

// SignUp
app.post('/register', async (req,res)=>{
    const email = req.body.email;
    const userExist = await User.findOne({email: email});
    if(userExist){
        return res.status(400).send("User exist!");
    }
    const newUser = await User.create({
        email: req.body.email,
        name: req.body.name,
        age: req.body.age
    })
    const user = await newUser.save();
    res.status(201).send("User registered successfully.");
});

// Login
app.get('/login', async (req,res)=>{
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(401).send("Invalid credentials")
    res.status(200).json({name: user.name, email: user.email});
});


app.listen(PORT,()=>{
    console.log(`Listening to PORT:${PORT}`);
})