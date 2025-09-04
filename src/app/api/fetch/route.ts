import { NextResponse } from 'next/server'
import { fetchMarkdownFile } from '@/lib/github'

export async function GET() {
  try {
    const md = await fetchMarkdownFile('content/hello.md')
    return NextResponse.json({ content: md })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
