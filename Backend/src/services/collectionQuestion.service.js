import { isValidObjectId } from 'mongoose'
import {CollectionQuestion} from '../models/collectionQuestion.model.js'
import { ApiError } from '../utils/ApiError.utils.js'
import {Collection} from '../models/collection.model.js'
import {Question} from '../models/question.model.js'

const validateCollection =  async (collectionId, userId) => {

    if(!isValidObjectId(collectionId)){
        throw new ApiError(400, "Invalid collection ID");
    }

    const collection = await Collection.findOne(
        {
            _id : collectionId,
            ownerId : userId
        }
    )

    if (!collection) {
        throw new ApiError(404, "Collection not found");
    }

    return collection;
}


export {
    validateCollection
}