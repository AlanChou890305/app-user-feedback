import Airtable from "airtable";

const baseId = process.env.AIRTABLE_BASE_ID || "";
const apiKey = process.env.AIRTABLE_API_KEY || "";

const base = new Airtable({ apiKey }).base(baseId);

export interface FeedbackData {
  name: string;
  email: string;
  feedback: string;
  wishFeature?: string;
  appName: string;
}

// 提交回饋到 Airtable
export async function submitFeedback(data: FeedbackData) {
  try {
    // 檢查環境變數
    if (!baseId || !apiKey) {
      throw new Error(
        "Airtable 環境變數未設定：請檢查 AIRTABLE_BASE_ID 和 AIRTABLE_API_KEY"
      );
    }

    const fields: any = {
      Name: data.name,
      Email: data.email,
      Feedback: data.feedback,
      "App name": data.appName,
    };

    // 如果 Created At 是自動時間戳記欄位，不需要手動設定
    // 如果需要手動設定，使用正確的格式：YYYY-MM-DDTHH:mm:ss.sssZ
    // 這裡先移除，讓 Airtable 自動處理（如果欄位設定為自動）

    // 如果有許願功能且有內容，才添加到欄位中
    // 注意：如果 Airtable 中沒有此欄位，需要先創建 "Wish Feature" 欄位（Long text 類型）
    if (data.wishFeature && data.wishFeature.trim()) {
      fields["Wish Feature"] = data.wishFeature;
    }

    // 嘗試創建記錄，如果欄位不存在會自動移除並重試
    let records;
    let retryCount = 0;
    const maxRetries = 5; // 最多重試 5 次（處理多個欄位不存在的情況）
    
    while (retryCount <= maxRetries) {
      try {
        records = await base("Feedbacks").create([
          {
            fields,
          },
        ]);
        break; // 成功則跳出迴圈
      } catch (createError: any) {
        // 如果是欄位不存在的錯誤，移除該欄位後重試
        if (createError.message?.includes("Unknown field name")) {
          const fieldName = createError.message.match(/"([^"]+)"/)?.[1];
          console.warn(`欄位 "${fieldName}" 不存在，移除後重新提交`);
          
          // 移除不存在的欄位
          if (fieldName && fields[fieldName] !== undefined) {
            delete fields[fieldName];
            retryCount++;
            continue; // 繼續重試
          }
        }
        
        // 如果不是欄位不存在的錯誤，或已達最大重試次數，拋出錯誤
        if (retryCount >= maxRetries) {
          console.error("達到最大重試次數，仍有欄位不存在");
        }
        throw createError;
      }
    }
    
    return { success: true, record: records[0] };
  } catch (error: any) {
    // 提供更詳細的錯誤訊息
    const errorMessage = error.message || "提交失敗";
    console.error("Airtable 錯誤:", error);

    // 常見錯誤處理
    if (error.message?.includes("Could not find table")) {
      throw new Error(
        '找不到 Table "Feedbacks"，請確認 Airtable Base 中是否有此 Table'
      );
    }
    if (error.message?.includes("Could not find field")) {
      throw new Error(
        "找不到欄位，請確認 Table 中有 Name, Email, Feedback, App name, Wish Feature 欄位（Created At 如果是自動時間戳記則不需要手動設定）"
      );
    }
    if (error.statusCode === 401 || error.message?.includes("authentication")) {
      throw new Error("Airtable API Key 無效，請檢查環境變數");
    }
    if (error.statusCode === 404) {
      throw new Error("找不到 Airtable Base，請檢查 Base ID 是否正確");
    }

    throw new Error(errorMessage);
  }
}

// 取得所有回饋（後台用）
export async function getAllFeedbacks() {
  try {
    // 檢查環境變數
    if (!baseId || !apiKey) {
      throw new Error(
        "Airtable 環境變數未設定：請檢查 AIRTABLE_BASE_ID 和 AIRTABLE_API_KEY"
      );
    }

    const records = await base("Feedbacks")
      .select({
        sort: [{ field: "Created At", direction: "desc" }],
      })
      .all();

    return records.map((record) => ({
      id: record.id,
      name: record.fields.Name as string,
      email: record.fields.Email as string,
      feedback: record.fields.Feedback as string,
      appName: (record.fields["App name"] as string) || "",
      wishFeature: (record.fields["Wish Feature"] as string) || "",
      created_at: record.fields["Created At"] as string,
    }));
  } catch (error: any) {
    const errorMessage = error.message || "讀取失敗";
    console.error("Airtable 讀取錯誤:", error);

    // 常見錯誤處理
    if (error.message?.includes("Could not find table")) {
      throw new Error(
        '找不到 Table "Feedbacks"，請確認 Airtable Base 中是否有此 Table'
      );
    }
    if (error.statusCode === 401 || error.message?.includes("authentication")) {
      throw new Error("Airtable API Key 無效，請檢查環境變數");
    }
    if (error.statusCode === 404) {
      throw new Error("找不到 Airtable Base，請檢查 Base ID 是否正確");
    }

    throw new Error(errorMessage);
  }
}
