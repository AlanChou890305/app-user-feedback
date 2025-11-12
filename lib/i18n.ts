export type Language = 'zh-TW' | 'en'

export const translations = {
  'zh-TW': {
    title: '📱 App 使用回饋',
    description: '歡迎分享您的使用體驗！我們非常重視您的意見，無論是：',
    descriptionItems: {
      bug: '🐛 錯誤回報：遇到 bug 或異常情況',
      feature: '💡 功能建議：希望新增或改進的功能',
      performance: '⚡ 效能優化：使用流暢度或速度問題',
      ui: '🎨 介面優化：UI/UX 的改善建議',
      other: '📝 其他意見：任何想告訴我們的想法',
    },
    form: {
      name: '姓名',
      namePlaceholder: '請輸入您的姓名',
      email: 'Email',
      emailPlaceholder: 'your.email@example.com',
      appName: 'App 名稱',
      feedback: '回饋內容',
      feedbackPlaceholder: '請詳細描述您遇到的問題、錯誤訊息、或想要的功能改進建議。如果遇到 bug，請說明操作步驟和預期結果...',
      wishFeature: '許願新功能',
      wishFeaturePlaceholder: '請告訴我們您希望新增哪些功能...',
      submit: '提交回饋',
      submitting: '提交中...',
    },
    required: '*',
    optional: '（選填）',
    thankYou: {
      title: '感謝您的回饋！',
      message: '我們已經收到您的意見和建議，這對我們非常重要！',
      message2: '我們會仔細閱讀每一份回饋，並持續改進我們的服務。',
      submitAnother: '提交其他回饋',
    },
    errors: {
      required: '請填寫所有必填欄位',
      submitFailed: '提交失敗，請稍後再試。',
    },
    success: {
      submitted: '感謝您的回饋！我們已經收到您的意見。',
    },
  },
  en: {
    title: '📱 App Feedback',
    description: 'We welcome your feedback! Your opinions are very important to us, whether it\'s:',
    descriptionItems: {
      bug: '🐛 Bug Report: Encountered bugs or issues',
      feature: '💡 Feature Suggestion: Features you\'d like to add or improve',
      performance: '⚡ Performance Optimization: Speed or smoothness issues',
      ui: '🎨 UI/UX Improvement: Interface optimization suggestions',
      other: '📝 Other Feedback: Any thoughts you\'d like to share',
    },
    form: {
      name: 'Name',
      namePlaceholder: 'Please enter your name',
      email: 'Email',
      emailPlaceholder: 'your.email@example.com',
      appName: 'App Name',
      feedback: 'Feedback',
      feedbackPlaceholder: 'Please describe in detail the issues you encountered, error messages, or feature improvement suggestions. If you encountered a bug, please describe the steps and expected results...',
      wishFeature: 'Feature Wishlist',
      wishFeaturePlaceholder: 'Please tell us what features you\'d like to see...',
      submit: 'Submit Feedback',
      submitting: 'Submitting...',
    },
    required: '*',
    optional: '(Optional)',
    thankYou: {
      title: 'Thank You for Your Feedback!',
      message: 'We have received your feedback and suggestions, which are very important to us!',
      message2: 'We will carefully read every piece of feedback and continue to improve our services.',
      submitAnother: 'Submit Another Feedback',
    },
    errors: {
      required: 'Please fill in all required fields',
      submitFailed: 'Submission failed, please try again later.',
    },
    success: {
      submitted: 'Thank you for your feedback! We have received your message.',
    },
  },
}

export const getTranslation = (lang: Language) => translations[lang]

