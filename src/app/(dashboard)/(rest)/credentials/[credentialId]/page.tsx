import React from "react";

type Props = {
  params: Promise<{ credentialId: string }>;
};

const CredentialsPage = async ({ params }: Props) => {
  const { credentialId } = await params;
  return <div>CredentialsPage {credentialId}</div>;
};

export default CredentialsPage;
