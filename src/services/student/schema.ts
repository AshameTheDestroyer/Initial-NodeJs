import mongoose from "mongoose";

export const StudentSchema = new mongoose.Schema(
    {
        name: String,
        year: Number,
        subjects: [String],
        rollNumber: Number,
    },
    {
        versionKey: false,
        timestamps: { createdAt: true, updatedAt: false },
    },
);

export const StudentModel = mongoose.model("Student", StudentSchema);
