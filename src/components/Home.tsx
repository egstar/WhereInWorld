import style from '@/app/styles/main.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'



const HomePage = (props: any) => {

    const router = useRouter()
    const {countries} = props
    const [search, setSearch] = useState(null) as any
    const [filter, setFilter] = useState(null) as any
    const [isOpen, setOpen] = useState(false)
    const dropMenu = useRef() as any

    const handleFilter = (e:any) => {
        const target = e.currentTarget
        if(filter != target.innerText){
            setFilter(target.innerText)
        } else {
            setFilter(null)
        }
        
    }

    
    return (
        <div className={`${style.main}`}>
            <div className={`${style.container}`}>
                <div className={`${style.topSide}`}>
                    <div className={`${style.searchBar}`}>
                        <input className={`${style.input}`} onInput={(e) => setSearch(e.currentTarget.value)} placeholder='Search for a country..'/>
                    </div>
                    <div className={`${style.filterBar}`}>
                        <button className={`${style.select}`} onClick={() => setOpen(!isOpen)} defaultValue={''}>
                            <span className={`${style.selectTitle}`}><p className={`${style.dropText}`}>{filter ? filter : 'Filter by Region'}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className={`${style.downArrow}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </span>
                        </button>
                        <ol ref={dropMenu} className={`${style.dropMenu}`}  style={{display: isOpen ? 'block' : 'none'}} >
                            <li className={`${style.selectOption} ${filter =='Africa' ? style.Selected : null}`}tabIndex={1} onClick={handleFilter} value={'Africa'}>Africa</li>
                            <li className={`${style.selectOption} ${filter =='America' ? style.Selected : null}`} tabIndex={2} onClick={handleFilter} value={'America'}>America</li>
                            <li className={`${style.selectOption} ${filter =='Asia' ? style.Selected : null}`} tabIndex={3} onClick={handleFilter} value={'Asia'}>Asia</li>
                            <li className={`${style.selectOption} ${filter =='Europe' ? style.Selected : null}`} tabIndex={4} onClick={handleFilter} value={'Europe'}>Europe</li>
                            <li className={`${style.selectOption} ${filter =='Oceania' ? style.Selected : null}`} tabIndex={5} onClick={handleFilter} value={'Oceania'}>Oceania</li>
                        </ol>
                    </div>
                </div>
                <div className={`${style.countryList}`}>
                    {
                        countries && countries.filter((c:any) => search ? c.name.toLowerCase().includes(search.toLowerCase()) : filter ? c.region.toLowerCase().includes(filter.toLowerCase()) : true ).map((c:any, i:number) => {
                            return(
                                <Link key={i} className={`${style.country}`} href={`${encodeURIComponent(c.name.toString().replaceAll(' ', '-'))}`}>
                                    <div className={`${style.imgFlag}`} style={{backgroundImage:`url(${c.flags.png})`}}>
                                        <Image className={`${style.flag}`} src={c.flags.png.toString()} width={320} height={209} alt={`${c.name}`} />
                                    </div>
                                    <div className={`${style.countryData}`}>
                                        <div className={`${style.countryTitle}`}><h3 className={`${style.titleText}`}>{c.name}</h3></div>
                                        <div className={`${style.countryDetails}`}>
                                            <div className={`${style.data}`}><span className={`${style.dataHead}`}>Population: </span>{c.population}</div>
                                            <div className={`${style.data}`}><span className={`${style.dataHead}`}>Region: </span>{c.region}</div>
                                            <div className={`${style.data}`}><span className={`${style.dataHead}`}>Capital: </span>{c.capital}</div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                    
                </div>
            </div>
        </div>

    )

}

export default HomePage;