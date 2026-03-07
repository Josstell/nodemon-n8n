import React from "react";
import { requireAuth } from "@/lib/auth-utils";
import { prefetchWorkflow } from "../../../../../features/workflows/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Editor, EditorError, EditorLoading } from "@/features/editor/components/editor";
import { EditorHeader } from "@/features/editor/components/editor-header";


type Props = {
  params: Promise<{ workflowId: string }>;
};

const WorkflowPage = async ({ params }: Props) => {
  await requireAuth();

  const { workflowId } = await params;

  prefetchWorkflow(workflowId)

  return <HydrateClient>
    <ErrorBoundary fallback={<EditorLoading />}>
      <Suspense fallback={<EditorError />}>
        <EditorHeader workflowId={workflowId} />
        <main className="flex-1">
          <Editor workflowId={workflowId} />
        </main>
      </Suspense>
    </ErrorBoundary>
  </HydrateClient>;
};

export default WorkflowPage;
