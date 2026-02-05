import React from "react";

type Props = {
  params: Promise<{ executionId: string }>;
};

const ExecutionsPage = async ({ params }: Props) => {
  const { executionId } = await params;
  return <div>ExecutionsPage {executionId}</div>;
};

export default ExecutionsPage;
