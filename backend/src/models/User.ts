import { Schema, model } from 'mongoose';
export interface IUser { name:string; email:string; passwordHash:string; createdAt:Date }
export const User = model<IUser>('User', new Schema({ name:{type:String,required:true,trim:true}, email:{type:String,required:true,unique:true,lowercase:true,trim:true}, passwordHash:{type:String,required:true} }, {timestamps:{createdAt:true,updatedAt:false}}));
