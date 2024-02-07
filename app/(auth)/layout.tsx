import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      {children}
    </div>
  );
};

export default AuthLayout;
