'use client'

import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageContext'

export default function ThankYou() {
  const router = useRouter()
  const { t } = useLanguage()

  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center', maxWidth: '600px', margin: '4rem auto' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h1 style={{ color: '#667eea', marginBottom: '1rem' }}>{t.thankYou.title}</h1>
        <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          {t.thankYou.message}
          <br />
          {t.thankYou.message2}
        </p>
        <button
          onClick={() => router.push('/')}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 5px 20px rgba(102, 126, 234, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {t.thankYou.submitAnother}
        </button>
      </div>
    </div>
  )
}

