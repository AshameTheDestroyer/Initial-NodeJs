import { Router } from "express";
import {
    ValidateRateLimit,
    ValidateAuthority,
    ValidateAuthenticity,
} from "../../middleware";
import {
    GetSubjects,
    PostSubject,
    PatchSubject,
    GetSubjectByID,
    DeleteAllSubjects,
    DeleteSubjectByID,
} from "./services";

export const SUBJECT_ROUTE = "/subject";
export const SubjectRouter = Router();

SubjectRouter.get(
    SUBJECT_ROUTE,
    ValidateAuthenticity,
    ValidateRateLimit(),
    GetSubjects,
);
SubjectRouter.get(
    `${SUBJECT_ROUTE}/:id`,
    ValidateAuthenticity,
    ValidateRateLimit(),
    GetSubjectByID,
);

SubjectRouter.post(
    SUBJECT_ROUTE,
    ValidateAuthenticity,
    ValidateRateLimit(),
    PostSubject,
);

SubjectRouter.patch(
    `${SUBJECT_ROUTE}/:id`,
    ValidateAuthenticity,
    ValidateRateLimit(),
    PatchSubject,
);

// UNTESTED!
SubjectRouter.delete(
    SUBJECT_ROUTE,
    ValidateAuthenticity,
    ValidateAuthority("admin"),
    DeleteAllSubjects,
);
SubjectRouter.delete(
    `${SUBJECT_ROUTE}/:id`,
    ValidateAuthenticity,
    ValidateRateLimit(),
    DeleteSubjectByID,
);
