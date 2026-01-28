"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * Client-side React component that fetches workflows and exposes a "Test AI" button to enqueue an AI job.
 *
 * The button triggers a TRPC mutation to queue the AI job, is disabled while the mutation is pending, and the mutation response is rendered as JSON. A success toast is shown when the job is queued.
 *
 * @returns The component's React element
 */
export default function Home() {
  const queryClient = new QueryClient();
  const trpc = useTRPC();
  const testAi = useMutation(trpc.testAi.mutationOptions({
     onSuccess: () => {
        toast.success("AI Job queued!");
      },
  }));
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      Protected server component
     
     
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
        Test AI
      </Button>
      {JSON.stringify(testAi.data)}
    </div>
  );
}