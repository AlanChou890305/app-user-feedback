'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageContext'

export default function Home() {
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    wishFeature: '',
    appName: language === 'zh-TW' ? 'To Do - 待辦清單' : 'To Do - Todo List',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // 當語言改變時，更新 appName
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      appName: language === 'zh-TW' ? 'To Do - 待辦清單' : 'To Do - Todo List',
    }))
  }, [language])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          feedback: formData.feedback,
          wishFeature: formData.wishFeature,
          appName: formData.appName,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t.errors.submitFailed)
      }

      // 跳轉到感謝頁面
      router.push('/thank-you')
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || t.errors.submitFailed })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="header-with-lang">
          <h1>{t.title}</h1>
          <div className="language-switcher">
            <button
              type="button"
              onClick={() => setLanguage('zh-TW')}
              className={language === 'zh-TW' ? 'lang-btn active' : 'lang-btn'}
              aria-label="Switch to Chinese"
            >
              <span className="lang-icon">🇹🇼</span>
              <span className="lang-text">中文</span>
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={language === 'en' ? 'lang-btn active' : 'lang-btn'}
              aria-label="Switch to English"
            >
              <span className="lang-icon">🇺🇸</span>
              <span className="lang-text">EN</span>
            </button>
          </div>
        </div>
        <p style={{ color: '#666', marginBottom: '2rem', lineHeight: '1.6' }}>
          {t.description}
          <br />• {t.descriptionItems.bug}
          <br />• {t.descriptionItems.feature}
          <br />• {t.descriptionItems.performance}
          <br />• {t.descriptionItems.ui}
          <br />• {t.descriptionItems.other}
        </p>

        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{t.form.name} {t.required}</label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={t.form.namePlaceholder}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">{t.form.email} {t.required}</label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={t.form.emailPlaceholder}
            />
          </div>

          <div className="form-group">
            <label htmlFor="appName">{t.form.appName} {t.required}</label>
            <select
              id="appName"
              required
              value={formData.appName}
              disabled
              style={{ 
                opacity: 0.7, 
                cursor: 'not-allowed',
                backgroundColor: '#f5f5f5'
              }}
            >
              <option value={formData.appName}>{formData.appName}</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="feedback">{t.form.feedback} {t.required}</label>
            <textarea
              id="feedback"
              required
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              placeholder={t.form.feedbackPlaceholder}
            />
          </div>

          <div className="form-group">
            <label htmlFor="wishFeature">{t.form.wishFeature} {t.optional}</label>
            <textarea
              id="wishFeature"
              value={formData.wishFeature}
              onChange={(e) => setFormData({ ...formData, wishFeature: e.target.value })}
              placeholder={t.form.wishFeaturePlaceholder}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? t.form.submitting : t.form.submit}
          </button>
        </form>
      </div>
    </div>
  )
}

