import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import React from "react";

const SignUpPage = () => {
  return (
    <SignUp
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "red" },
      }}
    />
  );
};

export default SignUpPage;
