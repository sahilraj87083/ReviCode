import {Collection} from '../models/collection.model.js'
import { ApiError } from '../utils/ApiError.utils.js'

const createCollectionService = async (
    {
        ownerId, name, description, isPublic
    }
) => {
    try {
        const collection = await Collection.create(
            {
                ownerId : ownerId,
                name : name,
                nameLower : name.toLowerCase(),
                description : description,
                isPublic : isPublic
            }
        )

        return collection
    } catch (error) {
        if (error.code === 11000) {
            // Mongo duplicate key error
            throw new ApiError(409, "You have already have this collection");
        }

        throw error;
    }
}

const validateUser =  async (collectionId, userId) => {
    
}

export {
    createCollectionService,
    validateUserOwnershipCollection
}