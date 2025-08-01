import mongoose from 'mongoose'
const CounterSchema = new mongoose.Schema({
    url: { type: String, required: true },
    count: { type: Number, default: 0 },
    slug: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Counter', CounterSchema);