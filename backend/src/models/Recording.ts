import { Schema, model, Types } from 'mongoose';
export interface IRecording { sessionId:Types.ObjectId; deviceId?:Types.ObjectId; fileName:string; mimeType:string; duration?:number; size:number; path:string; createdAt:Date }
export const Recording = model<IRecording>('Recording', new Schema({ sessionId:{type:Schema.Types.ObjectId,ref:'PodcastSession',required:true}, deviceId:{type:Schema.Types.ObjectId,ref:'Device'}, fileName:String, mimeType:String, duration:Number, size:Number, path:String }, {timestamps:{createdAt:true,updatedAt:false}}));
