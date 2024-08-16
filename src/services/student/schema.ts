import mongoose from "mongoose";

export const StudentSchema = new mongoose.Schema(
    {
        name: String,
        year: Number,
        subjects: [String],
        roll_number: Number,
    },
    { versionKey: false },
);

export const Student = mongoose.model("Student", StudentSchema);
