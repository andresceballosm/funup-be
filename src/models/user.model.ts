import { model, Schema } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: [ true, 'Missing name']
    },
    email: {
        type: String,
        required: [ true, 'Missing email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Missing password']
    },
    active: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    facebook: {
        type: Boolean,
        default: false
    }
});

export const userModel = model('User', userSchema);