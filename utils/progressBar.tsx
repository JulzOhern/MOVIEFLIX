"use client";

import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressBarProvider = () => {
  return (
    <ProgressBar
      height="3px"
      color="red"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};

export default ProgressBarProvider;
