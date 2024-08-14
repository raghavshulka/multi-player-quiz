import mongoose from "mongoose";
export declare const quizSchema: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    topic?: string | null | undefined;
    question?: string | null | undefined;
    option1?: string | null | undefined;
    option2?: string | null | undefined;
    option3?: string | null | undefined;
    option4?: string | null | undefined;
    correctOption?: string | null | undefined;
    timer?: number | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    topic?: string | null | undefined;
    question?: string | null | undefined;
    option1?: string | null | undefined;
    option2?: string | null | undefined;
    option3?: string | null | undefined;
    option4?: string | null | undefined;
    correctOption?: string | null | undefined;
    timer?: number | null | undefined;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    topic?: string | null | undefined;
    question?: string | null | undefined;
    option1?: string | null | undefined;
    option2?: string | null | undefined;
    option3?: string | null | undefined;
    option4?: string | null | undefined;
    correctOption?: string | null | undefined;
    timer?: number | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    topic?: string | null | undefined;
    question?: string | null | undefined;
    option1?: string | null | undefined;
    option2?: string | null | undefined;
    option3?: string | null | undefined;
    option4?: string | null | undefined;
    correctOption?: string | null | undefined;
    timer?: number | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    topic?: string | null | undefined;
    question?: string | null | undefined;
    option1?: string | null | undefined;
    option2?: string | null | undefined;
    option3?: string | null | undefined;
    option4?: string | null | undefined;
    correctOption?: string | null | undefined;
    timer?: number | null | undefined;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    topic?: string | null | undefined;
    question?: string | null | undefined;
    option1?: string | null | undefined;
    option2?: string | null | undefined;
    option3?: string | null | undefined;
    option4?: string | null | undefined;
    correctOption?: string | null | undefined;
    timer?: number | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
