"use client";

import { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";
import DOMPurify from "isomorphic-dompurify";

export default function MarkdownViewer({ markdown }: { markdown: string }) {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const process = async () => {
      const result = await remark().use(html).process(markdown);
      setHtmlContent(DOMPurify.sanitize(result.toString()));
    };
    process();
  }, [markdown]);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
