"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

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
