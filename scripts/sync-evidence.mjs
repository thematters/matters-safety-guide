import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const dataPath = new URL('../src/data/evidence.json', import.meta.url)
const matrixPath = new URL('../docs/evidence-matrix.md', import.meta.url)
const llmsPath = new URL('../public/llms.txt', import.meta.url)
const checkOnly = process.argv.includes('--check')
const data = JSON.parse(await readFile(dataPath, 'utf8'))

const statusOrder = ['verified', 'pending', 'policy']
const validStatuses = new Set(statusOrder)
const ids = new Set()
const today = new Date().toISOString().slice(0, 10)

for (const item of data.items) {
  if (ids.has(item.id)) throw new Error(`Duplicate evidence id: ${item.id}`)
  if (!validStatuses.has(item.status)) throw new Error(`Unknown status for ${item.id}`)
  if (!item.checks?.length) throw new Error(`Evidence item has no checks: ${item.id}`)
  if (item.expiresAt < today) throw new Error(`Evidence expired on ${item.expiresAt}: ${item.id}`)
  ids.add(item.id)
}

const cleanCell = (value) => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ')
const formatChecks = (checks) =>
  checks.map((check) => `- ${check.kind} \`${check.reference}\`　${check.summary}`).join('\n')

const matrix = `# ${data.meta.title}

本表由 \`src/data/evidence.json\` 產生，是網站公開儀表板、維護文件與 \`llms.txt\` 的單一資料源。未取得足夠證據時，狀態必須維持待補證據或政策處理中。

- 最後整體檢視　${data.meta.lastReviewed}
- 維護者　${data.meta.maintainer}
- 預定複查間隔　${data.meta.reviewIntervalDays} 天
- 正式網址　${data.meta.canonical}

| 措施 | 狀態 | 目前證據 | 最後驗證 | 證據到期 | 限制 | 負責方 |
| --- | --- | --- | --- | --- | --- | --- |
${data.items
  .map(
    (item) =>
      `| ${cleanCell(item.title)} | ${cleanCell(item.statusLabel)} | ${cleanCell(item.evidence)} | ${item.verifiedAt} | ${item.expiresAt} | ${cleanCell(item.limit)} | ${cleanCell(item.owner)} |`
  )
  .join('\n')}

## 逐項查核紀錄

${data.items
  .map(
    (item) => `### ${item.title}

${formatChecks(item.checks)}

主要連結　${item.href}`
  )
  .join('\n\n')}

## 發布前補證流程

1. 為 repo 證據記錄 commit SHA 與檔案路徑
2. 為網路檢查保留命令、日期與輸出摘要
3. 由負責方確認措辭沒有超出實際能力
4. 證據過期、連結失效或產品行為改變時，立即更新或降級狀態
5. 執行 \`npm run evidence:sync\` 後再提交產生的文件
`

const counts = Object.fromEntries(statusOrder.map((status) => [status, 0]))
for (const item of data.items) counts[item.status] += 1

const llms = `# Matters 安全指南

> 從閱讀、互動、發布到金流，協助 Matters 使用者辨識數位足跡、建立不評分的行動清單，並查核平台措施與限制。

Canonical: ${data.meta.canonical}
Language: zh-Hant-TW
Last reviewed: ${data.meta.lastReviewed}
Maintainer: ${data.meta.maintainer}

## Main sections

- 數位足跡: 閱讀、互動、發布、金流四種情境
- 行動清單: 只在目前頁面記憶體運作，可複製或列印，不保存或傳送
- 安全知識: 帳號、裝置、內容、網路、金流、事件應變
- 平台證據: 已驗證 ${counts.verified} 項、待補證據 ${counts.pending} 項、政策處理中 ${counts.policy} 項
- 急迫事件: 帳號入侵、持續騷擾、裝置疑似受監控
- 研究來源: EFF、CPJ、Access Now、Amnesty International Security Lab、CISA 與 Matters 公開文件

## Safety and privacy boundaries

- 本站不承諾匿名或絕對安全
- 化名能降低部分關聯風險，不能用來冒充他人
- 本站不使用應用層分析、不設 cookie，也不保存使用者的清單
- Cloudflare 仍可能為傳輸、安全與防濫用處理一般請求中繼資料
- 高風險個案應由可信任的數位安全專業人員評估

## Evidence status

${data.items.map((item) => `- ${item.title} [${item.statusLabel}] ${item.evidence} 限制 ${item.limit}`).join('\n')}

## Machine-readable source

- [Evidence data](https://github.com/thematters/matters-safety-guide/blob/main/src/data/evidence.json)
- [Evidence matrix](https://github.com/thematters/matters-safety-guide/blob/main/docs/evidence-matrix.md)
- [Source code](https://github.com/thematters/matters-safety-guide)
`

const outputs = [
  [matrixPath, matrix],
  [llmsPath, llms],
]

if (checkOnly) {
  const stale = []
  for (const [path, expected] of outputs) {
    const current = await readFile(path, 'utf8').catch(() => '')
    if (current !== expected) stale.push(path.pathname.replace(root, ''))
  }
  if (stale.length) throw new Error(`Generated evidence files are stale: ${stale.join(', ')}`)
  console.log(`Evidence data is current and valid through ${Math.min(...data.items.map((item) => Date.parse(item.expiresAt))) ? data.items.map((item) => item.expiresAt).sort()[0] : 'unknown'}`)
} else {
  for (const [path, content] of outputs) await writeFile(path, content)
  console.log('Generated docs/evidence-matrix.md and public/llms.txt')
}
