import mongoose from "mongoose";

export const SubjectSchema = new mongoose.Schema(
    {
        description: String,
        name: { type: String, required: true },
    },
    {
        autoIndex: false,
        versionKey: false,
        timestamps: { createdAt: true, updatedAt: false },
    },
);

SubjectSchema.index({ name: "text", description: "text" });

export const SubjectModel = mongoose.model("Subject", SubjectSchema);

SubjectModel.createIndexes();
