import type { GuideTask, ScenarioId } from '../lib/guide'
import evidenceData from './evidence.json'

export interface Scenario {
  id: ScenarioId
  index: string
  title: string
  kicker: string
  summary: string
  traces: string[]
  actions: string[]
}

export const scenarios: Scenario[] = [
  {
    id: 'read',
    index: '01',
    title: '閱讀',
    kicker: '連線本身也會留下線索',
    summary:
      '開啟一篇文章時，網站、CDN、網路服務商與你的裝置可能各自看見不同片段。HTTPS 保護內容傳輸，卻不等於隱藏所有連線中繼資料。',
    traces: ['IP 與時間', '瀏覽器特徵', '站內閱讀行為'],
    actions: ['先更新瀏覽器與作業系統', '敏感閱讀使用獨立瀏覽器設定檔', '理解 VPN 與 Tor 各自能保護哪一段'],
  },
  {
    id: 'participate',
    index: '02',
    title: '互動',
    kicker: '社交圖譜會把零碎動作連起來',
    summary:
      '按讚、追蹤、留言與上線時間可能形成穩定模式。即使名稱不同，寫作習慣、關係網與重複使用的頭像仍可能把帳號連回現實身分。',
    traces: ['互動時間', '關係網', '語言與寫作模式'],
    actions: ['不要重複使用其他平台的帳號名稱與頭像', '公開互動前先看個人頁會透露什麼', '敏感社群與日常社群分開'],
  },
  {
    id: 'publish',
    index: '03',
    title: '發布',
    kicker: '內容以外，檔案也會說話',
    summary:
      '照片位置、文件作者、修改紀錄、引用細節與發布時間都可能暴露來源。內容被轉貼或保存後，刪除原文通常無法收回所有副本。',
    traces: ['EXIF 與檔案屬性', '草稿與修改紀錄', '內容可被長期保存'],
    actions: ['上傳前移除照片與文件中繼資料', '高風險內容先做來源與細節檢查', '先確認內容會被發布到哪些保存系統'],
  },
  {
    id: 'money',
    index: '04',
    title: '金流',
    kicker: '付款與收款最容易重新連回身分',
    summary:
      '信用卡、銀行、支付服務與區塊鏈交易可能把化名帳號連回法定身分。匿名顯示名稱不會消除支付機構依法保存的紀錄。',
    traces: ['支付識別資料', '交易時間與金額', '公開鏈上紀錄'],
    actions: ['付款前理解接觸資料的服務商', '不要把公開錢包重複用於敏感與日常活動', '高風險收款先取得專業安全建議'],
  },
]

export interface ResearchReference {
  id: string
  name: string
  shortName: string
  scope: string
  href: string
}

export const researchReferences: ResearchReference[] = [
  {
    id: 'cisa-basics',
    name: 'CISA 4 Easy Ways to Stay Safe Online',
    shortName: 'CISA 密碼與帳號基礎',
    scope: '獨立密碼、密碼管理器、多因素驗證、更新與釣魚',
    href: 'https://www.cisa.gov/sites/default/files/2024-09/Secure-Our-World-4-Easy-Ways-Stay-Safe-Online-Tip-Sheet.pdf',
  },
  {
    id: 'eff-security-plan',
    name: 'EFF Your Security Plan',
    shortName: 'EFF 威脅建模',
    scope: '資產、對手、後果、發生可能性、可接受代價與可求助對象',
    href: 'https://ssd.eff.org/module/your-security-plan',
  },
  {
    id: 'eff-phishing',
    name: 'EFF How to Avoid Phishing Attacks',
    shortName: 'EFF 釣魚防護',
    scope: '辨識連結、附件、登入要求與第二管道確認',
    href: 'https://ssd.eff.org/module/how-avoid-phishing-attacks',
  },
  {
    id: 'eff-footprint',
    name: 'EFF How to Manage Your Digital Footprint',
    shortName: 'EFF 數位足跡',
    scope: '盤點公開資訊、帳號關聯與不同身分之間的可連結線索',
    href: 'https://ssd.eff.org/module/how-to-manage-your-digital-footprint',
  },
  {
    id: 'eff-vpn',
    name: 'EFF Choosing the VPN That Is Right for You',
    shortName: 'EFF VPN 指南',
    scope: 'VPN 能保護的連線範圍、信任轉移與限制',
    href: 'https://ssd.eff.org/module/choosing-vpn-thats-right-you',
  },
  {
    id: 'cpj-kit',
    name: 'CPJ Digital Safety Kit',
    shortName: 'CPJ 數位安全指南',
    scope: '帳號、裝置、素材、備份、通訊中繼資料與事件準備',
    href: 'https://cpj.org/2019/07/digital-safety-kit-journalists/',
  },
  {
    id: 'cpj-device',
    name: 'CPJ Device Security Checklist',
    shortName: 'CPJ 裝置安全清單',
    scope: '系統更新、磁碟加密、PIN、生物辨識、備份與間諜軟體風險',
    href: 'https://cpj.org/wp-content/uploads/2019/07/ERT-Device-Security-Checklist-2.pdf',
  },
  {
    id: 'access-now-help',
    name: 'Access Now Digital Security Helpline',
    shortName: 'Access Now 數位安全熱線',
    scope: '高風險民間社會、人權工作者與記者的事件支援',
    href: 'https://www.accessnow.org/help/',
  },
  {
    id: 'amnesty-help',
    name: 'Amnesty International Security Lab Get Help',
    shortName: 'Amnesty 數位鑑識支援',
    scope: '高風險民間社會的間諜軟體與裝置鑑識支援範圍',
    href: 'https://securitylab.amnesty.org/get-help/',
  },
  {
    id: 'matters-tos',
    name: 'Matters Terms and Privacy Policy',
    shortName: 'Matters 條款與隱私政策',
    scope: '帳號資訊、付款、第三方登入、跨境處理、冒充限制與 Vault 保存限制',
    href: 'https://matters.town/tos',
  },
]

export const researchReferenceById = new Map(
  researchReferences.map((reference) => [reference.id, reference])
)

export interface ActionTask extends GuideTask {
  title: string
  detail: string
  sourceIds: string[]
}

export const actionTasks: ActionTask[] = [
  {
    id: 'unique-password',
    scenarios: ['all'],
    priority: 'now',
    title: '使用獨立且高強度的密碼',
    detail: '用可信任的密碼管理器產生並保存，避免與信箱、社群或工作帳號共用。',
    sourceIds: ['cisa-basics'],
  },
  {
    id: 'secure-email',
    scenarios: ['participate', 'publish', 'money'],
    priority: 'now',
    title: '先保護註冊信箱',
    detail: '信箱往往是帳號復原的入口。檢查多因素驗證、復原信箱與登入工作階段。',
    sourceIds: ['cisa-basics', 'eff-security-plan'],
  },
  {
    id: 'separate-identity',
    scenarios: ['participate', 'publish', 'money'],
    priority: 'now',
    title: '切開化名與日常身分',
    detail: '不要重用名稱、頭像、自介、聯絡方式與公開錢包。化名不能用來冒充他人。',
    sourceIds: ['eff-footprint', 'matters-tos'],
  },
  {
    id: 'updates-lock',
    scenarios: ['all'],
    priority: 'now',
    title: '更新裝置並設定強鎖定',
    detail: '安裝安全更新、啟用磁碟加密，使用足夠長的密碼或 PIN，避免只依賴生物辨識。',
    sourceIds: ['cisa-basics', 'cpj-device'],
  },
  {
    id: 'metadata',
    scenarios: ['publish'],
    priority: 'now',
    title: '上傳前檢查中繼資料',
    detail: '移除照片位置、相機資訊、文件作者與修改紀錄，另檢查畫面本身是否透露地點或身分。',
    sourceIds: ['cpj-kit'],
  },
  {
    id: 'phishing',
    scenarios: ['all'],
    priority: 'next',
    title: '建立釣魚訊息的停頓習慣',
    detail: '不要直接從訊息中的連結登入。另開瀏覽器前往已知網址，並用第二個管道確認急迫要求。',
    sourceIds: ['eff-phishing'],
  },
  {
    id: 'browser-profile',
    scenarios: ['read', 'participate', 'publish'],
    priority: 'next',
    title: '分開敏感與日常瀏覽環境',
    detail: '使用不同瀏覽器設定檔，避免同時登入會識別真實身分的服務。',
    sourceIds: ['eff-footprint'],
  },
  {
    id: 'backup',
    scenarios: ['publish'],
    priority: 'next',
    title: '準備加密且可復原的備份',
    detail: '備份重要原稿與證據，測試能否還原，並把復原資訊與裝置分開保存。',
    sourceIds: ['cpj-kit', 'cpj-device'],
  },
  {
    id: 'network-model',
    scenarios: ['read', 'publish'],
    priority: 'next',
    title: '先畫出你的網路威脅模型',
    detail: 'VPN、Tor 與 HTTPS 解決不同問題。先確認你要防的是同網路旁觀、服務商、網站，或更強的對手。',
    sourceIds: ['eff-security-plan', 'eff-vpn'],
  },
  {
    id: 'payment-map',
    scenarios: ['money'],
    priority: 'next',
    title: '畫出付款資料會經過誰',
    detail: '列出平台、支付商、銀行或鏈上地址能看見的資訊，再決定是否接受身分連結風險。',
    sourceIds: ['eff-security-plan', 'matters-tos'],
  },
  {
    id: 'incident-plan',
    scenarios: ['participate', 'publish', 'money'],
    priority: 'next',
    title: '事前寫下事件應變順序',
    detail: '包含可信任聯絡人、帳號復原管道、證據保存方式與需要停止發布的條件。',
    sourceIds: ['eff-security-plan', 'access-now-help'],
  },
  {
    id: 'expert-help',
    scenarios: ['publish', 'money'],
    priority: 'help',
    title: '高風險發布或收款先找專人檢視',
    detail: '若可能面對國家級監控、跨境追查或立即人身風險，不要只靠公開清單自行判斷。',
    sourceIds: ['access-now-help'],
  },
  {
    id: 'compromise-help',
    scenarios: ['all'],
    priority: 'help',
    title: '發現入侵跡象時改用可信任裝置求助',
    detail: '若裝置可能受監控，先停止在原裝置改密碼或討論事件，再用另一部可信任裝置聯絡專業支援。',
    sourceIds: ['access-now-help', 'amnesty-help'],
  },
]

export const priorityLabels = {
  now: { index: 'A', title: '現在做', note: '降低最常見、影響最大的風險' },
  next: { index: 'B', title: '接著做', note: '依你的情境建立更完整的保護層' },
  help: { index: 'C', title: '需要協助', note: '遇到高風險或疑似入侵時不要獨自處理' },
} as const

export const knowledgeTopics = [
  {
    id: 'account',
    index: '01',
    title: '帳號與信箱',
    lead: '真正的入口經常是信箱與復原流程。',
    points: ['獨立密碼與密碼管理器', '多因素驗證與備用碼', '定期檢查登入工作階段與復原方式'],
  },
  {
    id: 'device',
    index: '02',
    title: '裝置',
    lead: '未更新或未加密的裝置會讓其他保護失去意義。',
    points: ['自動安裝安全更新', '磁碟加密與強鎖定', '敏感資料最小化與可還原備份'],
  },
  {
    id: 'content',
    index: '03',
    title: '內容與素材',
    lead: '圖片、文件與敘事細節都可能暴露來源。',
    points: ['移除 EXIF 與文件屬性', '檢查背景、反射、聲音與時間線索', '發布前先確認可撤回性與保存風險'],
  },
  {
    id: 'network',
    index: '04',
    title: '網路',
    lead: '工具名稱不等於保護範圍。',
    points: ['HTTPS 保護傳輸內容', 'VPN 轉移你信任的網路觀察者', 'Tor 增加分離連線來源的能力，也有操作限制'],
  },
  {
    id: 'money',
    index: '05',
    title: '金流',
    lead: '支付資料通常比顯示名稱更接近法定身分。',
    points: ['理解支付服務商的身分驗證與保存義務', '避免重用公開鏈上地址', '高風險收款需獨立威脅建模'],
  },
  {
    id: 'incident',
    index: '06',
    title: '事件應變',
    lead: '先保全人與證據，再處理帳號。',
    points: ['用乾淨裝置與可信任管道聯絡', '保存事件時間線但避免擴散敏感內容', '高風險個案交由專業支援判斷'],
  },
]

export type EvidenceStatus = 'verified' | 'pending' | 'policy'

export interface EvidenceItem {
  id: string
  title: string
  status: EvidenceStatus
  statusLabel: string
  verifiedAt: string
  expiresAt: string
  evidence: string
  limit: string
  owner: string
  href: string
  checks: Array<{ kind: string; reference: string; summary: string }>
}

export const evidenceMeta = evidenceData.meta
export const evidenceItems = evidenceData.items as EvidenceItem[]

export const sources = [
  {
    name: 'EFF Surveillance Self-Defense',
    scope: '威脅建模、化名分離、釣魚、網路工具與中繼資料',
    href: 'https://ssd.eff.org/',
  },
  {
    name: 'CPJ Digital Safety Kit',
    scope: '記者的帳號、裝置、素材、邊境與事件準備',
    href: 'https://cpj.org/2019/07/digital-safety-kit-journalists/',
  },
  {
    name: 'Access Now Digital Security Helpline',
    scope: '高風險民間社會與人權工作者的緊急數位安全支援',
    href: 'https://www.accessnow.org/help/',
  },
  {
    name: 'Amnesty International Security Lab',
    scope: '進階監控、間諜軟體與數位鑑識研究',
    href: 'https://securitylab.amnesty.org/',
  },
  {
    name: 'CISA Secure Our World Tip Sheet',
    scope: '密碼管理器、多因素驗證、更新與釣魚基礎',
    href: 'https://www.cisa.gov/sites/default/files/2024-09/Secure-Our-World-4-Easy-Ways-Stay-Safe-Online-Tip-Sheet.pdf',
  },
]
