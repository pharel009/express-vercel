import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


app.get('/', (req, res)=>{
    res.send('Sweet love')
})


export default app;
// app.listen(port, () => {
//     console.log(`App is running on http://localhost:${port}☑️`);
// })