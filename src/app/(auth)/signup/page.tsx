import { RegisterForm } from "@/features/auth/components/register-form";
import { requireUnauth } from "@/lib/auth-utils";
import React from "react";

type Props = {};

const registerPage = async (props: Props) => {
    await requireUnauth();
  
  return (
    <div>
      <RegisterForm/>
    </div>
  );
};

export default registerPage;
