import express from 'express';
import cors from 'cors'
const app = express();


app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.json({
        message: "Hello World"
    })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})