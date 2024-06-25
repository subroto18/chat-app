const { z } = require("zod");

const registrationValidator = z.object({
  name: z
    .string()
    .min(1, "name is required")
    .max(20, "name can't exceed 20 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
});

const loginValidator = z.object({
  email: z.string().nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

module.exports = { registrationValidator, loginValidator };
