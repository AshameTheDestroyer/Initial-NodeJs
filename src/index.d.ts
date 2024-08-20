type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
