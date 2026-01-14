import mongoose from "mongoose";
import {CollectionQuestion} from './collectionQuestion.model.js'


const collectionSchema = new mongoose.Schema(
    {
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        nameLower: {
            type: String,
            required: true,
            index: true,
        },

        description: {
            type: String,
            maxlength: 300,
        },

        isPublic: {
            type: Boolean,
            default: false,
        },

        questionsCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

collectionSchema.index({ ownerId: 1, name: 1 });
collectionSchema.index(
    { ownerId: 1, nameLower: 1 },
    { unique: true }
);

collectionSchema.methods.getRandomQuestionIds = async function(count){
    const links = await CollectionQuestion.aggregate([
        {$match : {collectionId : this._id}},
        {$sample : {size : count}},
        {$project : {questionId : 1, _id : 0}}
    ]);

    if (links.length < count) {
        throw new Error("Not enough questions in collection");
    }

    return links.map(q => q.questionId);
}


export const Collection = mongoose.model("Collection", collectionSchema);
