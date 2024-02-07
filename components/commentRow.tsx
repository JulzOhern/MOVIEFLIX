"use client";

import React from "react";
import { DiscussionEmbed } from "disqus-react";

type CommentRowProp = {
  ep: string;
  title: string;
};

const CommentRow = ({ ep, title }: CommentRowProp) => {
  const url =
    typeof window !== "undefined"
      ? window.location.href
      : process.env.NEXT_PUBLIC_MAIN_URL;

  return (
    <>
      <DiscussionEmbed
        shortname={process.env.NEXT_PUBLIC_DISQUS_SHORTNAME!}
        config={{
          url,
          identifier: ep,
          title: title,
        }}
      />
    </>
  );
};

export default CommentRow;
