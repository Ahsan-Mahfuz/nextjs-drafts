import { NextResponse } from "next/server";
import { commitMarkdownFile } from "@/lib/github";
import slugify from "slugify";

export async function POST(req: Request) {
  try {
    const { drafts } = await req.json();
    const results = [];

    for (const draft of drafts) {
      const slug = slugify(draft.title, { lower: true });
      const path = `content/${slug}.md`;
      const body = `# ${draft.title}\n\n${draft.body}`;
      const res = await commitMarkdownFile(path, body, `chore: publish "${draft.title}"`);
      results.push(res.data);
    }

    return NextResponse.json({ success: true, results });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
