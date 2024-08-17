import { UserModel } from "./schema";
import { UnwrapModel } from "../../types";

export type UserProps = UnwrapModel<typeof UserModel.create>;
