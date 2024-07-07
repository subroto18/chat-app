const { z } = require("zod");

const createGroupValidator = z.object({
  groupName: z
    .string()
    .min(1, "name is required")
    .max(20, "name can't exceed 20 characters"),
  users: z.array(z.string()).min(1),
});

module.exports = { createGroupValidator };
