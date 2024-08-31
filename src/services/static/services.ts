import "multer";
import mongoose from "mongoose";
import { Readable } from "stream";
import { FileModel } from "./schema";
import { RequestHandler } from "express";
import { RequestHandlerWithID } from "../../types";

export const GetFile: (
    bucket: mongoose.mongo.GridFSBucket,
) => RequestHandlerWithID = (bucket) => {
    return async (request, response) => {
        const downloadStream = bucket.openDownloadStream(
            new mongoose.Types.ObjectId(request.params["id"]),
        );

        downloadStream.on(
            "file",
            <T extends { contentType: string }>(file: T) =>
                response.set("Content-Type", file.contentType),
        );

        downloadStream.pipe(response);
    };
};

export const PostFile: (
    bucket: mongoose.mongo.GridFSBucket,
) => RequestHandler = (bucket) => {
    return async (request, response) => {
        try {
            const file = request.file;
            if (file == null) {
                return response
                    .status(400)
                    .send({ message: "No file was sent." });
            }

            const uploadStream = bucket.openUploadStream(file.fieldname);
            const readBuffer = new Readable();

            readBuffer.push(file.buffer);
            readBuffer.push(null);
            readBuffer.pipe(uploadStream);

            const _file = await new FileModel({
                type: file.mimetype,
                _id: uploadStream.id,
                name: file.originalname,
                length: file.buffer.length,
            }).save();

            return response.status(201).send(_file);
        } catch (error) {
            console.log(error);
            return response.status(500).send(error);
        }
    };
};
