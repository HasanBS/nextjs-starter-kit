import { Model, Schema, model, models } from 'mongoose';


export interface IComponent {
    name: string;
    description: string;
    price: number;
    thumbnail: string;
}

const ComponentSchema = new Schema<IComponent>({
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

export const Component: Model<IComponent> = models?.Component || model<IComponent>('Component', ComponentSchema);