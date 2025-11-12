// 測試 Airtable 連線
require('dotenv').config({ path: '.env.local' })
const Airtable = require('airtable')

const baseId = process.env.AIRTABLE_BASE_ID
const apiKey = process.env.AIRTABLE_API_KEY

console.log('🔍 檢查環境變數...')
console.log('Base ID:', baseId ? `${baseId.substring(0, 10)}...` : '❌ 未設定')
console.log('API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : '❌ 未設定')

if (!baseId || !apiKey) {
  console.error('❌ 環境變數未設定！請檢查 .env.local 檔案')
  process.exit(1)
}

const base = new Airtable({ apiKey }).base(baseId)

console.log('\n🔗 測試 Airtable 連線...')

// 測試讀取 Table
base('Feedbacks')
  .select({ maxRecords: 1 })
  .firstPage()
  .then((records) => {
    console.log('✅ 連線成功！')
    console.log(`✅ Table "Feedbacks" 存在`)
    console.log(`📊 目前有 ${records.length} 筆記錄（只檢查第一頁）`)
    
    if (records.length > 0) {
      const firstRecord = records[0]
      console.log('\n📋 所有欄位名稱：')
      const allFields = Object.keys(firstRecord.fields)
      allFields.forEach(field => {
        console.log(`  - "${field}"`)
      })
      
      console.log('\n📋 Table 欄位檢查：')
      const fields = Object.keys(firstRecord.fields)
      const requiredFields = ['Name', 'Email', 'Rating', 'Feedback', 'App name', 'Created At']
      
      requiredFields.forEach(field => {
        if (fields.includes(field)) {
          const fieldValue = firstRecord.fields[field]
          const fieldType = typeof fieldValue
          console.log(`  ✅ ${field}${fieldValue ? ` (值: "${fieldValue}")` : ''}`)
          
          // 特別檢查 App name 欄位
          if (field === 'App name') {
            if (fieldValue === 'To Do - 待辦清單') {
              console.log(`     ✅ 選項值正確: "To Do - 待辦清單"`)
            } else if (fieldValue) {
              console.log(`     ⚠️  目前值: "${fieldValue}"，程式碼期望: "To Do - 待辦清單"`)
              console.log(`     💡 請確認 Airtable Single Select 選項值為 "To Do - 待辦清單"`)
            }
          }
        } else {
          console.log(`  ❌ ${field} - 找不到此欄位！`)
        }
      })
    }
    
    console.log('\n✅ 所有檢查通過！可以開始使用了。')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ 連線失敗：')
    console.error('錯誤訊息:', error.message)
    
    if (error.statusCode === 401) {
      console.error('💡 提示：API Key 無效，請檢查 Personal Access Token 是否正確')
    } else if (error.statusCode === 404) {
      console.error('💡 提示：找不到 Base，請檢查 Base ID 是否正確')
    } else if (error.message?.includes('Could not find table')) {
      console.error('💡 提示：找不到 Table "Feedbacks"，請確認：')
      console.error('   1. Table 名稱必須是 "Feedbacks"（注意大小寫）')
      console.error('   2. 在 Airtable Base 中建立此 Table')
    } else if (error.message?.includes('Could not find field')) {
      console.error('💡 提示：找不到欄位，請確認 Table 中有以下欄位：')
      console.error('   - Name (Single line text)')
      console.error('   - Email (Email)')
      console.error('   - Rating (Number)')
      console.error('   - Feedback (Long text)')
      console.error('   - Created At (Date with time) - 選填')
    }
    
    process.exit(1)
  })

