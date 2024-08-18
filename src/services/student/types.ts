import { StudentSchema } from "./schema";
import { InferSchemaType } from "mongoose";

export type StudentProps = InferSchemaType<typeof StudentSchema>;
