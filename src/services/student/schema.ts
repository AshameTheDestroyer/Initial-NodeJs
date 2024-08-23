import mongoose from "mongoose";

export const StudentSchema = new mongoose.Schema(
    {
        name: String,
        year: Number,
        rollNumber: Number,
        subjects: {
            default: [],
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
        },
    },
    {
        autoIndex: false,
        versionKey: false,
        timestamps: { createdAt: true, updatedAt: false },
    },
);

StudentSchema.index({ name: "text" });

export const StudentModel = mongoose.model("Student", StudentSchema);

StudentModel.createIndexes();
