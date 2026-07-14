import { readFile } from 'node:fs/promises'

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
const hrefs = [...html.matchAll(/\shref="([^"]+)"/g)].map((match) => match[1])
const external = [...new Set(hrefs.filter((href) => /^https:\/\//.test(href)))]
const hashes = [...new Set(hrefs.filter((href) => href.startsWith('#')).map((href) => href.slice(1)))]
const missingHashes = hashes.filter((id) => !new RegExp(`\\sid="${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(html))

if (missingHashes.length) throw new Error(`Missing internal targets: ${missingHashes.join(', ')}`)

const checkUrl = async (url) => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': 'MattersSafetyGuideLinkCheck/1.0' },
    })
    const status = response.status
    await response.body?.cancel()
    return { url, status }
  } finally {
    clearTimeout(timeout)
  }
}

const results = []
for (let index = 0; index < external.length; index += 4) {
  const batch = external.slice(index, index + 4)
  results.push(...(await Promise.all(batch.map((url) => checkUrl(url).catch((error) => ({ url, status: 0, error: error.message }))))))
}

for (const result of results) console.log(`${result.status || 'ERR'} ${result.url}`)

const dead = results.filter(({ status }) => status === 0 || status === 404 || status === 410)
if (dead.length) throw new Error(`Dead external links: ${dead.map(({ url }) => url).join(', ')}`)

console.log(`Checked ${hashes.length} internal targets and ${external.length} external links`)
