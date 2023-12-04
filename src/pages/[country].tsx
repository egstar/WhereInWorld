import CountryDetails from '@/components/Country'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const CountryPage = () => {
    const router = useRouter()
    const [country, setCountry] = useState() as any
    const [borders, setBorders] = useState() as any
    useEffect(() => {
        if(router.query.country)
        fetch('/api/countries', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
                country: router.query.country.toString().replaceAll(' ', '-')
            })
        }).then((res) => {
            if(res.status != 200) return console.log('Error', res.json())
            return res.json()
        }).then((data: any) => {
            setCountry(data)
        })
    },[router.query.country])
    useEffect(() => {
        if(country && country[0].borders){
        fetch('/api/countries', {
            method: 'OPTIONS',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                borders: country[0].borders
            })
        }).then((res) => {
            if(res.status != 200) return (console.log('Error ', res.json()))
            return res.json()
        }).then((data) => {
            setBorders(data)
        })} else {
            setBorders('')
        }
    },[country])
    if(!country && !borders) return (<>Loading</>)
    
    return (
        <>
            <CountryDetails country={country} borders={borders} />
        </>
    )
}


export default CountryPage;