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
    title: '查資料',
    kicker: '你開了哪些網站，網路上不只一處看得到',
    summary:
      '查一個敏感題目時，裝置、網路服務商、網站與 CDN 都可能各留下一小段紀錄。HTTPS 會加密傳輸內容，連線時間與去向仍可能被看見。',
    traces: ['IP、DNS 與連線時間', '瀏覽器特徵與 Cookie', '下載、搜尋與閱讀紀錄'],
    actions: ['先把瀏覽器與作業系統更新完', '敏感工作另開一個瀏覽器設定檔', '依對手與所在網路選擇 VPN、Tor 或洋蔥小站'],
  },
  {
    id: 'participate',
    index: '02',
    title: '聯絡與互動',
    kicker: '一個按讚、一段留言，也會慢慢畫出關係網',
    summary:
      '追蹤、留言、按讚與上線時間放在一起，就能看出你常和誰往來。即使換了名字，頭像、自介、語氣與活動時間也可能把化名接回日常身分。',
    traces: ['互動時間與頻率', '追蹤與留言關係', '名稱、頭像與寫作習慣'],
    actions: ['別沿用其他平台的名稱、頭像與自介', '留言前先回頭看一次公開個人頁', '敏感聯絡和日常社交分開處理'],
  },
  {
    id: 'publish',
    index: '03',
    title: '上稿',
    kicker: '文章之外，照片和文件也帶著自己的履歷',
    summary:
      '照片位置、文件作者、修改紀錄、引文細節與發稿時間都可能暴露來源。文章進入 IPFS、搜尋引擎或別人的備份後，刪除原頁也收不回所有副本。',
    traces: ['EXIF 與文件屬性', '草稿版本與發稿時間', 'IPFS、搜尋與轉貼副本'],
    actions: ['上傳前清掉照片與文件中繼資料', '請不熟悉案件的人做一次來源識別檢查', '先想清楚哪些內容可以長期公開保存'],
  },
  {
    id: 'money',
    index: '04',
    title: '收款',
    kicker: '顯示名稱可以換，銀行與鏈上紀錄不會跟著換',
    summary:
      '信用卡、銀行、支付服務與公開區塊鏈各自保存一部分資料。只要同一個錢包或付款方式在別處出現，化名帳號就可能被接回法定身分。',
    traces: ['支付識別資料', '交易時間與金額', '公開鏈上紀錄'],
    actions: ['列出整段付款流程會碰到哪些服務商', '敏感工作不要沿用日常公開錢包', '高風險收款先找懂在地法律與安全的人討論'],
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
  {
    id: 'resilience-manual',
    name: '處變不驚：公民社會資訊安全韌性指南',
    shortName: '資訊安全韌性指南',
    scope: '記者與公民社會的緊急清單、身分分隔、裝置、通訊與出入境準備',
    href: 'https://resilienceinnovationlab.org/wp-content/uploads/2026/06/Manual_2026.pdf',
  },
  {
    id: 'web3-archive',
    name: 'Web3-backed Digital Archiving: User Guide For Beginners',
    shortName: 'Web3 檔案保存手冊',
    scope: '分散式保存、閘道限制、付款足跡、永久保存與檔案倫理',
    href: 'https://resilienceinnovationlab.org/wp-content/uploads/2025/01/Web3Manual_final.pdf',
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
    title: '替 Matters 留一組沒在別處用過的密碼',
    detail: '交給可信任的密碼管理器產生和保管，別和信箱、社群或工作帳號共用。',
    sourceIds: ['cisa-basics'],
  },
  {
    id: 'secure-email',
    scenarios: ['participate', 'publish', 'money'],
    priority: 'now',
    title: '把註冊信箱先顧好',
    detail: '帳號復原通常會回到信箱。打開多因素驗證，也檢查復原信箱與仍在登入的裝置。',
    sourceIds: ['cisa-basics', 'eff-security-plan'],
  },
  {
    id: 'separate-identity',
    scenarios: ['participate', 'publish', 'money'],
    priority: 'now',
    title: '別讓化名沿用舊帳號的習慣',
    detail: '名稱、頭像、自介、聯絡方式與公開錢包都換一套。也別拿化名冒充別人。',
    sourceIds: ['eff-footprint', 'matters-tos'],
  },
  {
    id: 'updates-lock',
    scenarios: ['all'],
    priority: 'now',
    title: '今天先把裝置更新完',
    detail: '裝好安全更新、打開磁碟加密，再設一組夠長的密碼或 PIN。生物辨識不要當成唯一鎖定方式。',
    sourceIds: ['cisa-basics', 'cpj-device'],
  },
  {
    id: 'metadata',
    scenarios: ['publish'],
    priority: 'now',
    title: '發稿前看一次檔案細節',
    detail: '清掉照片位置、相機資訊、文件作者與修改紀錄，也要看畫面背景有沒有露出地點或身分。',
    sourceIds: ['cpj-kit'],
  },
  {
    id: 'phishing',
    scenarios: ['all'],
    priority: 'next',
    title: '有人催你登入時，先停一下',
    detail: '不要直接點訊息裡的登入連結。自己開瀏覽器輸入已知網址，再用另一個管道確認對方。',
    sourceIds: ['eff-phishing'],
  },
  {
    id: 'browser-profile',
    scenarios: ['read', 'participate', 'publish'],
    priority: 'next',
    title: '敏感工作另開一個瀏覽環境',
    detail: '用不同的瀏覽器設定檔，不要在同一個環境裡登入會說出真實身分的服務。',
    sourceIds: ['eff-footprint'],
  },
  {
    id: 'backup',
    scenarios: ['publish'],
    priority: 'next',
    title: '原稿和採訪資料各留一份可還原備份',
    detail: '備份後真的試著還原一次。復原密鑰和工作裝置要分開放，公開文章也可用記憶吐司另存。',
    sourceIds: ['cpj-kit', 'cpj-device', 'web3-archive'],
  },
  {
    id: 'network-model',
    scenarios: ['read', 'publish'],
    priority: 'next',
    title: '先說清楚你想避開誰的觀察',
    detail: '同網路的人、網路服務商、網站與國家級對手看得到的東西不同。VPN、Tor、HTTPS 也各自只保護一段。',
    sourceIds: ['eff-security-plan', 'eff-vpn'],
  },
  {
    id: 'payment-map',
    scenarios: ['money'],
    priority: 'next',
    title: '把收款一路會碰到的人列出來',
    detail: '平台、支付商、銀行與公開鏈各看得到什麼，先寫下來，再決定能不能接受身分被接上的風險。',
    sourceIds: ['eff-security-plan', 'matters-tos'],
  },
  {
    id: 'incident-plan',
    scenarios: ['participate', 'publish', 'money'],
    priority: 'next',
    title: '先和可信任的人約好出事怎麼聯絡',
    detail: '把聯絡人、帳號復原、證據保存與暫停發稿的條件寫下來，別等到出事才臨時決定。',
    sourceIds: ['eff-security-plan', 'access-now-help', 'resilience-manual'],
  },
  {
    id: 'expert-help',
    scenarios: ['publish', 'money'],
    priority: 'help',
    title: '可能牽涉國家級監控時，先找專業支援',
    detail: '跨境追查、立即人身風險與進階監控都超過公開清單能處理的範圍，發稿或收款前先找人一起判斷。',
    sourceIds: ['access-now-help'],
  },
  {
    id: 'compromise-help',
    scenarios: ['all'],
    priority: 'help',
    title: '懷疑裝置被監控，換一台裝置求助',
    detail: '先別在原裝置改密碼、搜尋處理方式或討論事件。改用另一部可信任裝置聯絡專業支援。',
    sourceIds: ['access-now-help', 'amnesty-help'],
  },
]

export const priorityLabels = {
  now: { index: 'A', title: '今天處理', note: '先收掉最常見、最容易被利用的缺口' },
  next: { index: 'B', title: '接著準備', note: '按採訪與發稿情境把工作環境分開' },
  help: { index: 'C', title: '找人一起看', note: '高風險或疑似入侵時別一個人硬撐' },
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
  {
    name: '處變不驚：公民社會資訊安全韌性指南',
    scope: '記者與公民社會的緊急清單、監控風險、身分分隔、裝置與通訊安全',
    href: 'https://resilienceinnovationlab.org/wp-content/uploads/2026/06/Manual_2026.pdf',
  },
  {
    name: 'Web3-backed Digital Archiving: User Guide For Beginners',
    scope: '分散式保存、閘道限制、隱私風險與永久保存的倫理問題',
    href: 'https://resilienceinnovationlab.org/wp-content/uploads/2025/01/Web3Manual_final.pdf',
  },
  {
    name: '看不見的平台清道夫',
    scope: 'Matters 的內容治理、政府資料請求、抗審查架構與透明度缺口',
    href: 'https://thematters.github.io/matters-governance-site/',
  },
  {
    name: 'Matters 洋蔥小站',
    scope: '匿名唯讀入口的威脅模型、資料邊界、外部資源代理與已知限制',
    href: 'https://github.com/thematters/matters-onion-gateway',
  },
  {
    name: 'Matters 記憶吐司',
    scope: '把公開文章下載成可離線保存的備份，降低對單一前端的依賴',
    href: 'https://lifeboat.matters.town/',
  },
]
