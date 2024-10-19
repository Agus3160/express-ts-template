import { authMiddleware } from "../../middleware/auth.middleware";
import { RouteConfig } from "../../util/definitions";
import { emailValidationSchema, uuidValidationSchema } from "../../util/validation/commons-validation";
import { userController } from "./user.controller";
import { createUserSchema } from "./user.schema";

const routeConfig: RouteConfig = {
  prefix: "/user",
  paths: [
    {
      path: "/",
      method: "post",
      validation: {
        body: {
          schema: createUserSchema,
        },
      },
      handler: userController.create,
    },
    {
      path: "/:id",
      method: "delete",
      middlewares: [authMiddleware("super_admin")],
      validation: {
        params: {
          schema: uuidValidationSchema,
        },
      },
      handler: userController.hardDelete,
    },
    {
      path: "/soft/:id",
      method: "delete",
      middlewares: [authMiddleware()],
      validation: {
        params: {
          schema: uuidValidationSchema,
        },
      },
      handler: userController.softDelete,
    },
    {
      path: "/:id",
      method: "get",
      validation: {
        params: {
          schema: uuidValidationSchema,
        },
      },
      handler: userController.findById,
    },
    {
      path: "/email/:email",
      method: "get",
      validation: {
        params: {
          schema: emailValidationSchema,
        },
      },
      handler: userController.findByEmail,
    },
    {
      path: "/username/:username",
      method: "get",
      handler: userController.findByUsername,
    },
  ],
};

export default routeConfig;
