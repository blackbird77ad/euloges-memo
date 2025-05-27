import { Schema, model, Types} from 'mongoose'
import {toJSON} from '@reis/mongoose-to-json'

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String },
   LasttName: { type: String },
    dateOfBirth: { type: Date, default: Date.now },
    telephone: {type: Number},
    country: {type: String}
},
{
 timestamps: true
});

//add the toJson plugin
userSchema.plugin(toJSON);

export const UserModel = model('User', userSchema)