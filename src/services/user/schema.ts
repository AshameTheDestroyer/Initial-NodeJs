import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },

        _resetToken: String,
        _resetTokenExpirationDate: Number,
    },
    {
        autoIndex: false,
        timestamps: true,
        versionKey: false,
    },
);

UserSchema.index({ name: "text", email: "text" });

export const UserModel = mongoose.model("User", UserSchema);

UserModel.createIndexes();
