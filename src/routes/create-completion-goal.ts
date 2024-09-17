import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createGoalCompletion } from "../features/create-goal-completion";
import { z } from "zod";
import { verifyJWT } from '../middlewares/verifyJWT';

export const createCompletionGoalRoute: FastifyPluginAsyncZod = async (
  app,
  _options
) => {
  app.post(
    "/completions",
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
      preHandler: [verifyJWT]
    },
    async (req, res) => {
      const { goalId } = req.body;
      await createGoalCompletion(goalId);

      return { message: `Goal ${goalId} successfully updated!` };
    }
  );
};
