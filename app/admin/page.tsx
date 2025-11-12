'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Feedback {
  id: string
  name: string
  email: string
  rating: number
  feedback: string
  appName: string
  created_at: string
}

export default function AdminPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')

  // 簡單的密碼驗證（生產環境建議使用更安全的方式）
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

  useEffect(() => {
    if (isAuthenticated) {
      fetchFeedbacks()
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
      // 儲存密碼到 localStorage（方便下次使用）
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminPassword', password)
      }
    } else {
      setError('密碼錯誤')
    }
  }

  const fetchFeedbacks = async () => {
    try {
      // 使用 localStorage 儲存的密碼，或從環境變數取得
      const savedPassword = typeof window !== 'undefined' ? localStorage.getItem('adminPassword') : null
      const adminPassword = savedPassword || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
      
      const response = await fetch(`/api/admin/feedbacks?password=${encodeURIComponent(adminPassword)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '讀取失敗')
      }

      setFeedbacks(data.feedbacks || [])
    } catch (error: any) {
      console.error('Error fetching feedbacks:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRatingStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className="card">
          <h1>後台管理</h1>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="password">管理員密碼</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="請輸入密碼"
                required
              />
            </div>
            {error && <div className="message error">{error}</div>}
            <button type="submit">登入</button>
          </form>
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Link href="/" style={{ color: '#667eea' }}>返回首頁</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="nav">
        <Link href="/">返回表單</Link>
        <button onClick={() => setIsAuthenticated(false)} style={{ background: '#dc3545' }}>
          登出
        </button>
      </div>

      <div className="card">
        <h1>📊 回饋管理後台</h1>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          共收到 {feedbacks.length} 則回饋
        </p>

        {loading ? (
          <p>載入中...</p>
        ) : feedbacks.length === 0 ? (
          <p>目前還沒有回饋</p>
        ) : (
          <div>
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="feedback-item">
                <h3>{feedback.name}</h3>
                <div className="feedback-meta">
                  <strong>App:</strong> {feedback.appName || 'N/A'} |{' '}
                  <strong>Email:</strong> {feedback.email} |{' '}
                  <strong>評分:</strong> {getRatingStars(feedback.rating)} ({feedback.rating}/5) |{' '}
                  <strong>時間:</strong> {new Date(feedback.created_at).toLocaleString('zh-TW')}
                </div>
                <div className="feedback-content">{feedback.feedback}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

