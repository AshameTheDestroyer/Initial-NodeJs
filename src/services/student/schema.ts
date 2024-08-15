import mongoose from "mongoose";

export const StudentSchema = new mongoose.Schema({
    name: String,
    year: Number,
    roll_number: Number,
    subjects: Array<String>,
});

export const Student = mongoose.model("Student", StudentSchema);
