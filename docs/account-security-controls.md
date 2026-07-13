# Matters 帳號安全控制證據

## 查核範圍

- 查核日期　2026-07-14
- `matters-web` commit　`da0823029be55c891a933680144b0809c6d2b52a`
- `matters-server` commit　`95aef228bbc7313d130b0fd8fa414d7584b524b4`
- 判定原則　只有能從程式碼或公開產品介面重現的能力才列為已有證據

## 已取得證據

| 控制 | 證據 | 判定與限制 |
| --- | --- | --- |
| 密碼設定前置條件 | `matters-web/src/views/Me/Settings/Account/Password/index.tsx` | 介面依是否有 email、email 是否驗證與是否已有密碼，顯示新增或變更密碼流程 |
| Email 登入替代選項 | `matters-web/src/components/Forms/EmailLoginForm/OtherOptions.tsx` | 登入介面提供 email 相關流程。這項證據不等同多因素驗證 |
| Email OTP 或密碼登入 | `matters-server/src/mutations/user/emailLogin.ts` | 後端可區分 OTP 與密碼登入，並記錄成功或失敗的稽核事件 |
| 密碼重設驗證碼 | `matters-server/src/mutations/user/resetPassword.ts` | 重設流程檢查 expired、inactive、verified、used 等狀態，完成後將驗證碼標成 used |
| 登入 cookie 保護 | `matters-server/src/common/utils/cookie.ts` | production cookie 使用 `httpOnly`、`secure` 與 `sameSite=lax` |
| 存取權杖期限 | `matters-server/src/connectors/userService.ts` | JWT 具明確有效期限。期限存在不代表使用者能查看或主動撤銷個別工作階段 |

## 尚未取得證據

以下能力未在本次查核範圍找到可確認的產品流程或後端控制，因此證據儀表板維持「待補證據」。

1. 使用者可啟用的 2FA 或 MFA
2. 使用者可查看目前登入工作階段
3. 使用者可撤銷個別工作階段或一次登出所有裝置
4. 變更或重設密碼後，自動使既有 JWT 失效
5. 使用者可查看近期登入與帳號安全事件
6. 復原碼或其他不依賴原信箱的緊急復原機制

## 產品建議優先序

1. 先補工作階段清單、撤銷全部工作階段與密碼重設後強制失效
2. 再補 TOTP 或 passkey 等第二驗證方式與復原碼
3. 最後提供近期安全事件、異常登入通知與使用者可理解的稽核紀錄

任何一項完成後，都要以產品畫面、測試、commit SHA 與限制更新 `src/data/evidence.json`，不能只把狀態文字改成已驗證。
