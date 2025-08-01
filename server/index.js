import express from 'express';
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv'
import counterRoutes from './routes/counterRoute.js'
import mongoose from 'mongoose';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())
app.use('/api/counters', counterRoutes);
app.get('/', (req, res) => {
    res.send('🚀 View Counter API is running...');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('🗄️ MongoDB connected'))
    .catch(console.error);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`🚀 API on http://localhost:${port}`));