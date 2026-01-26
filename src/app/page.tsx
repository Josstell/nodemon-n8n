"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * Client React component that fetches and displays workflows and provides a control to enqueue a new workflow.
 *
 * The component shows a protected label, renders the fetched workflows as JSON, and includes a "Create Workflow" button.
 * When a workflow is enqueued the component shows a success toast saying "Job queued!". The create button is disabled while the creation mutation is in progress.
 *
 * @returns A JSX element containing the protected text, the workflows JSON, and the "Create Workflow" button.
 */
export default function Home() {
  const queryClient = new QueryClient();
  const trpc = useTRPC();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued!");
      },
    }),
  );

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      Protected server component
      {JSON.stringify(data)}
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        Create Workflow
      </Button>
    </div>
  );
}