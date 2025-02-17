import zod from "zod";

export const createUserSchema = zod.object({
  name: zod.string(),
  username: zod
    .string()
    .min(6, { message: "username should be atleast 6 charactes long" })
    .max(25, { message: "username should be not more than 25 characters" }),
  password: zod
    .string()
    .min(8, { message: "password should be atleast 8 charactes long" })
    .max(20, { message: "password should be not more than 20 characters" }),
});

export const signInSchema = zod.object({
  username: zod
    .string()
    .min(6, { message: "username should be atleast 6 charactes long" })
    .max(25, { message: "username should be not more than 25 characters" }),
  password: zod
    .string()
    .min(8, { message: "password should be atleast 8 charactes long" })
    .max(20, { message: "password should be not more than 20 characters" }),
});

export const roomSchema = zod.object({
  name: zod
    .string()
    .min(4, { message: "room name should be atleast 4 charactes long" })
    .max(10, { message: "room should not be more than 10 charactes" }),
});
