import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const UserModel = mongoose.model("User", UserSchema);
