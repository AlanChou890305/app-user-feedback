# App User Feedback 回饋收集系統

一個簡單、免費的回饋收集系統，使用 Next.js 和 Airtable 建立。

## 功能特色

- ✅ 免費網域（使用 Vercel/Netlify 免費子域名）
- ✅ 用戶回饋表單（姓名、Email、評分、回饋內容）
- ✅ 後台管理系統（查看所有回饋）
- ✅ 簡單的密碼保護後台
- ✅ 響應式設計，支援手機和電腦

## 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 設定 Airtable

1. 前往 [Airtable](https://airtable.com) 註冊免費帳號
2. 建立新的 Base（資料庫）
3. 建立一個名為 `Feedbacks` 的 Table
4. 在 Table 中建立以下欄位（Field）：
   - `Name` (Single line text) - 必填
   - `Email` (Email) - 必填
   - `Rating` (Number) - 必填
   - `Feedback` (Long text) - 必填
   - `Created At` (Date with time) - 選填（會自動填入）

5. 取得 Airtable API 資訊：
   - 前往 [Airtable API](https://airtable.com/api)
   - 選擇您的 Base
   - 複製 **Base ID**（在 API 文件頁面的 URL 中，例如：`appXXXXXXXXXXXXXX`）
   - 前往 [Account](https://airtable.com/account) → API
   - 複製 **Personal Access Token**（如果沒有，點擊 "Create new token"）

### 3. 設定環境變數

建立 `.env.local` 檔案：

```env
AIRTABLE_BASE_ID=your_airtable_base_id
AIRTABLE_API_KEY=your_airtable_api_key
ADMIN_PASSWORD=your_admin_password
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password
```

**注意**：`ADMIN_PASSWORD` 用於 API 路由驗證，`NEXT_PUBLIC_ADMIN_PASSWORD` 用於前端（可選，如果不設定會使用預設值）

### 4. 本地開發

```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 查看表單頁面
開啟 [http://localhost:3000/admin](http://localhost:3000/admin) 查看後台

## 部署到 Vercel（推薦）

### 方法 1: 使用 Vercel CLI

1. 安裝 Vercel CLI：
```bash
npm i -g vercel
```

2. 登入並部署：
```bash
vercel login
vercel
```

3. 在 Vercel 專案設定中添加環境變數：
   - `AIRTABLE_BASE_ID`
   - `AIRTABLE_API_KEY`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_ADMIN_PASSWORD`（可選）

### 方法 2: 使用 GitHub

1. 將程式碼推送到 GitHub
2. 前往 [Vercel](https://vercel.com) 並用 GitHub 登入
3. 匯入您的專案
4. 添加環境變數
5. 部署完成後，您會獲得一個免費的網址（例如：`your-project.vercel.app`）

## 部署到 Netlify

1. 將程式碼推送到 GitHub
2. 前往 [Netlify](https://netlify.com) 並用 GitHub 登入
3. 新增網站 → 匯入專案
4. 建置設定：
   - Build command: `npm run build`
   - Publish directory: `.next`
5. 在環境變數中添加：
   - `AIRTABLE_BASE_ID`
   - `AIRTABLE_API_KEY`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_ADMIN_PASSWORD`（可選）

## 安全性建議

⚠️ **重要**：目前的後台密碼驗證是簡單的客戶端驗證，不適合高安全性需求。

生產環境建議：
1. 使用 Supabase Auth 進行身份驗證
2. 或使用環境變數在 API 路由中驗證
3. 或使用 Next.js Middleware 保護後台路由

## 費用

- **Vercel/Netlify**: 免費（提供免費子域名）
- **Airtable**: 免費層級（每個 Base 最多 1,200 筆記錄，5GB 附件空間）

## 技術棧

- **Next.js 14** - React 框架
- **Airtable** - 雲端資料庫（免費層級）
- **TypeScript** - 型別安全
- **CSS** - 自訂樣式

## 替代方案

如果您已經有 Supabase 專案，也可以在同一個專案中建立新的資料表來使用，不需要建立新專案。

## 自訂

- 修改 `app/page.tsx` 來自訂表單
- 修改 `app/admin/page.tsx` 來自訂後台
- 修改 `app/globals.css` 來自訂樣式

## 授權

MIT License

