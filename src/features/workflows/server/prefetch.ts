import { prefetch, trpc } from "@/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";

type input = inferInput<typeof trpc.workflows.getMany>

/**
 * Prefetch workflows
 * 
 */

export const prefetchWorkflows = (params: input) => {
    return prefetch(trpc.workflows.getMany.queryOptions(params))