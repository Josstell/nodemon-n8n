import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "10s");

    await step.sleep("wait-another-moment", "5s");

    await step.sleep("final-wait", "5s");

    return prisma.workflow.create({
      data: {
        name: "workflow-from-inngest",
      },
    });
  },
);
