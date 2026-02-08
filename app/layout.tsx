import React from "react"
import type { Metadata } from 'next'
import { Noto_Sans_SC } from 'next/font/google'

import './globals.css'

const notoSansSC = Noto_Sans_SC({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-sc',
})

export const metadata: Metadata = {
  title: '毛驴育种管理系统',
  description: '毛驴育种精细化管理平台 - 种驴档案、生产性能、疫病防治',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${notoSansSC.className} antialiased`}>{children}</body>
    </html>
  )
}
