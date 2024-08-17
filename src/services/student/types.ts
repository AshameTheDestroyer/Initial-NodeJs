import { StudentModel } from "./schema";
import { UnwrapModel } from "../../types";

export type StudentProps = UnwrapModel<typeof StudentModel.create>;
