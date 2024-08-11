import { Schema, model, models } from 'mongoose';

const ComponentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    thumbnail: {
        type: String,
    }
}, { timestamps: true });

export const Component = models?.Component || model('Component', ComponentSchema);