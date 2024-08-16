import mongoose from "mongoose";

export const StudentSchema = new mongoose.Schema(
    {
        name: String,
        year: Number,
        roll_number: Number,
        subjects: Array<String>,
    },
    { versionKey: false },
);

export const Student = mongoose.model("Student", StudentSchema);
