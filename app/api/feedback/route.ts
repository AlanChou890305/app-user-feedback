import { NextRequest, NextResponse } from 'next/server'
import { submitFeedback } from '@/lib/airtable'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, feedback, wishFeature, appName } = body

    if (!name || !email || !feedback || !appName) {
      return NextResponse.json(
        { error: '請填寫所有必填欄位' },
        { status: 400 }
      )
    }

    await submitFeedback({
      name,
      email,
      feedback,
      wishFeature: wishFeature || '',
      appName,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('API Error:', error)
    return NextResponse.json(
      { 
        error: error.message || '提交失敗',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

