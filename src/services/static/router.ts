import multer from "multer";
import mongoose from "mongoose";
import { Router } from "express";
import {
    ValidateRateLimit,
    // ValidateAuthority,
    ValidateAuthenticity,
} from "../../middleware";
import { GetFile, PostFile } from "./services";

export const FILE_ROUTE = "/static";
export const FileRouter: (
    bucket: mongoose.mongo.GridFSBucket,
    storage: multer.StorageEngine,
) => Router = (bucket, storage) => {
    const router = Router();
    const ValidateFileUpload = multer({ storage }).single("file");

    router.get(
        `${FILE_ROUTE}/:id`,
        // ValidateAuthenticity,
        // ValidateRateLimit,
        GetFile(bucket),
    );

    router.post(
        FILE_ROUTE,
        // ValidateAuthenticity,
        // ValidateRateLimit,
        ValidateFileUpload,
        PostFile(bucket),
    );

    return router;
};
