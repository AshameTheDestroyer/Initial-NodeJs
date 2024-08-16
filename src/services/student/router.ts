import { Router } from "express";
import {
    PostStudent,
    PatchStudent,
    GetAllStudents,
    GetStudentByID,
    DeleteAllStudents,
    DeleteStudentByID,
} from "./services";

export const STUDENT_ROUTE = "/student";
export const StudentRouter = Router();

StudentRouter.get(STUDENT_ROUTE, GetAllStudents);
StudentRouter.get(`${STUDENT_ROUTE}/:id`, GetStudentByID);

StudentRouter.post(STUDENT_ROUTE, PostStudent);

StudentRouter.patch(`${STUDENT_ROUTE}/:id`, PatchStudent);

StudentRouter.delete(STUDENT_ROUTE, DeleteAllStudents);
StudentRouter.delete(`${STUDENT_ROUTE}/:id`, DeleteStudentByID);
