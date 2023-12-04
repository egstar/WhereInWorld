import HomePage from '@/components/Home'
import Head from 'next/head'
import { useEffect, useState } from 'react'


export default function Home(){

    const [countries, setCountries] = useState()
    useEffect(() => {
        fetch('/api/countries', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then((res) => {
            if(res.status != 200) return console.log('Error', res.json())
            return res.json()
        }).then((data) => {
            setCountries(data)
        })
    },[])
    return (
        <>
        <Head>
            <title>Where In World | Home</title>
        </Head>
        <HomePage countries={countries} />
        </>
    )
}