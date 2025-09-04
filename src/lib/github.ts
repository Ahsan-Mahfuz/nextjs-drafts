import { Octokit } from 'octokit'

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export async function fetchMarkdownFile(path: string) {
  const res = await octokit.request(
    'GET /repos/{owner}/{repo}/contents/{path}',
    {
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      path,
    }
  )
  const file = res.data as { content: string }
  const content = Buffer.from(file.content, 'base64').toString('utf-8')
  return content
}

export async function commitMarkdownFile(
  path: string,
  content: string,
  message: string,
  sha?: string
) {
  return await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: process.env.GITHUB_OWNER!,
    repo: process.env.GITHUB_REPO!,
    path,
    message,
    content: Buffer.from(content).toString('base64'),
    branch: process.env.GITHUB_BRANCH!,
    sha,
  })
}
