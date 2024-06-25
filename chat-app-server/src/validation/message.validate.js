const { z } = require("zod");

const createMessageValidator = z.object({
  content: z.string().min(1, { message: "Field is required" }),
  chatId: z.string().min(1, { message: "Field is required" }),
});
module.exports = { createMessageValidator };
