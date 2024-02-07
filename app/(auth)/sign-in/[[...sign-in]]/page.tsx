import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import React from "react";

const SignInPage = () => {
  return (
    <SignIn
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "red" },
      }}
    />
  );
};

export default SignInPage;
