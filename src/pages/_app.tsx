import type { AppProps } from 'next/app'
import Layout from '@/app/layout'
import '../app/styles/themes.css'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'


 
export default function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    const userTheme = localStorage.getItem('userTheme')
    if(userTheme) setTheme(userTheme)
  },[])
  return (
    <Layout>
        <Header theme={theme} setTheme={setTheme} />
        <main data-theme={theme}>
          <Component {...pageProps} theme={theme} />
        </main>
        <Footer />
    </Layout>
  )
}