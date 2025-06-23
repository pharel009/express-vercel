import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.PORT || 2020;

app.get('/', (req, res)=>{
    res.send('Sweet love')
})


app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}☑️`);
})