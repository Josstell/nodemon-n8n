import React from "react";
import { requireAuth } from "@/lib/auth-utils";

type Props = {
  params: Promise<{ workflowId: string }>;
};

const WorkflowPage = async ({ params }: Props) => {
  await requireAuth();

  const { workflowId } = await params;
  return <div>WorkflowPage {workflowId}</div>;
};

export default WorkflowPage;
