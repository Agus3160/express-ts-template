import { createUserSchema } from "../user/user.schema";
import { RouteConfig } from "../../util/definitions";
import { authController } from "./auth.controller";
import { loginSchema } from "./auth.schema";

const authRouteConfig:RouteConfig = {
  prefix: "/auth",
  paths: [
    {
      path: "/login",
      method: "post",
      validation: {
        body: {
          schema: loginSchema,
        },
      },
      handler: authController.login,
    },
    {
      path: "/register",
      method: "post",
      validation: {
        body: {
          schema: createUserSchema,
        },
      },
      handler: authController.register,
    }
  ],
};

export default authRouteConfig;