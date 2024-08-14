import mongoose from "mongoose";
export declare const userSchemas: mongoose.Model<{
    socketid: string;
    score: number;
    name?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    socketid: string;
    score: number;
    name?: string | null | undefined;
}> & {
    socketid: string;
    score: number;
    name?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    socketid: string;
    score: number;
    name?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    socketid: string;
    score: number;
    name?: string | null | undefined;
}>> & mongoose.FlatRecord<{
    socketid: string;
    score: number;
    name?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
