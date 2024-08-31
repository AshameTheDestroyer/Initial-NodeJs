import mongoose from "mongoose";

export const FileSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        length: { type: Number, required: true },
    },
    {
        autoIndex: false,
        versionKey: false,
        timestamps: { createdAt: true, updatedAt: false },
    },
);

FileSchema.index({ name: "text" });

export const FileModel = mongoose.model("File", FileSchema);

FileModel.createIndexes();
