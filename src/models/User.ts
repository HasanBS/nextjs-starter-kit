import { Schema, model, models } from 'mongoose';
import { IUser } from './interfaces/IUser';
import { Plan } from './enums/planEnums';

const UserSchema = new Schema({
    _id: {
        type: String,
        auto: true,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    image: {
        type: String,
    },
    // Used in the Stripe webhook to identify the user in Stripe and later create Customer Portal or prefill user credit card details
    customerId: {
      type: String,
      validate(value: string) {
        return value.includes("cus_");
      },
    },
    // Used in the Stripe webhook. should match a plan in config.js file.
    priceId: {
      type: String,
      validate(value : string) {
        return value.includes("price_");
      },
    },
    // Used to determine if the user has access to the product—it's turn on/off by the Stripe webhook
    hasAccess: {
      type: Boolean,
      default: true,
    },
    subscriptionPlan: {
        type: String,
        enum: Object.values(Plan),
        default: Object.values(Plan.Free) ,
    },
}, { timestamps: true });


export const User = models?.User || model<IUser>('User', UserSchema);
