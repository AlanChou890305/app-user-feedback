# Airtable 設定說明

## 必要欄位

請確認您的 Airtable Base 中的 `Feedbacks` Table 有以下欄位：

### 必填欄位

1. **Name** (Single line text) - 必填
2. **Email** (Email) - 必填
3. **Rating** (Number) - 必填
4. **Feedback** (Long text) - 必填
5. **App name** (Single line text) - 必填 ⚠️ **新增欄位**
6. **Created At** (Created time) - 選填（建議設為自動時間戳記，會自動填入）

### 選填欄位

7. **Wish Feature** (Long text) - 選填 ⚠️ **新增欄位**
8. **Images** (Attachment) - 選填 ⚠️ **新增欄位（用於上傳圖片）**

## 如何新增欄位

### 新增 "App name" 欄位

1. 開啟您的 Airtable Base
2. 選擇 `Feedbacks` Table
3. 點擊右側的 "+" 按鈕新增欄位
4. 欄位名稱輸入：`App name`
5. 欄位類型選擇：`Single line text`
6. 儲存欄位

### 新增 "Wish Feature" 欄位

1. 在 `Feedbacks` Table 中點擊 "+" 新增欄位
2. 欄位名稱輸入：`Wish Feature`
3. 欄位類型選擇：`Long text`
4. 儲存欄位

### 新增 "Images" 欄位（重要：用於上傳圖片）

1. 在 `Feedbacks` Table 中點擊 "+" 新增欄位
2. 欄位名稱輸入：`Images`
3. 欄位類型選擇：`Attachment`（附件）
4. 儲存欄位

**注意**：`Images` 欄位用於儲存使用者上傳的圖片截圖，如果沒有此欄位，圖片將無法儲存。

## 測試連線

執行以下命令來測試 Airtable 連線和欄位設定：

```bash
node test-airtable.js
```

如果所有欄位都存在，會顯示 ✅ 標記。

