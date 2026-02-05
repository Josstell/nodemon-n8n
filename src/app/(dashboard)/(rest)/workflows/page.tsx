import { requireAuth } from "@/lib/auth-utils";
import React from "react";

type Props = {};

const WorkflowPage = async (props: Props) => {
  await requireAuth();
  return <div>WorkflowPage</div>;
};

export default WorkflowPage;
