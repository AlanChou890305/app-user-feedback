import { NextRequest, NextResponse } from 'next/server'
import { getAllFeedbacks } from '@/lib/airtable'

export async function GET(request: NextRequest) {
  try {
    // 簡單的密碼驗證（從 query 參數或 header）
    const password = request.nextUrl.searchParams.get('password')
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

    if (password !== adminPassword) {
      return NextResponse.json({ error: '未授權' }, { status: 401 })
    }

    const feedbacks = await getAllFeedbacks()
    return NextResponse.json({ feedbacks })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '讀取失敗' },
      { status: 500 }
    )
  }
}

