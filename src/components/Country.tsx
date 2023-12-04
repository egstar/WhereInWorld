import Image from "next/image"
import style from '@/app/styles/country.module.css'
import Head from "next/head"
import Link from "next/link"

const CountryDetails = (props: any) => {
    const {country, borders} = props
    return (
        <>
            <Head>
                <title>Where In World | {country[0].name}</title>
            </Head>
            {
                country.map((c:any) => {
                    return (
                        <div className={`${style.main}`} key={c.name.toLowerCase()}>
                            <div className={`${style.row}`}>
                                <Link href={'/'} className={`${style.backBtn}`}>
                                    <svg className={`${style.backSvg}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path fillRule="evenodd" d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z" clipRule="evenodd" />
                                    </svg>
                                    <p>Back</p>
                                </Link>
                            </div>
                            <div className={`${style.row}`}> 
                                <div className={`${style.rowChilds}`}>
                                    <div className={`${style.imgSide}`}>
                                        <Image className={`${style.flag}`} src={c.flags.svg} width={600} height={300} alt={``}/> 
                                    </div>
                                    <div className={`${style.dataSide}`}>
                                        <h1>{c.name}</h1>
                                        <ul className={`${style.dataList}`}>
                                            <div className={`${style.listLeft}`}>
                                                <li className={`${style.listElm}`}><span className={`${style.title}`}>Native Name: </span> {c.nativeName}</li>
                                                <li className={`${style.listElm}`}><span className={`${style.title}`}>Population:</span> {eval(c.population).toLocaleString()}</li>
                                                <li className={`${style.listElm}`}><span className={`${style.title}`}>Region: </span> {c.region}</li>
                                                <li className={`${style.listElm}`} style={{width:'100%'}}><span className={`${style.title}`}>Sub Region: </span> {c.subregion}</li>
                                                <li className={`${style.listElm}`} style={{width:'100%'}}><span className={`${style.title}`}>Capital: </span> {c.capital}</li>
                                            </div>
                                            <div className={`${style.listRight}`}>
                                                <li className={`${style.listElm}`}>
                                                    <span className={`${style.title}`}>Top Level Domain: </span> {c.topLevelDomain}
                                                </li>
                                                <li className={`${style.listElm}`}>
                                                <span className={`${style.title}`}>Languages: </span> {
                                                        JSON.stringify(c.languages.map((c:any) => c.name).toString()).replaceAll('"', '').replaceAll(',', ', ')
                                                    }
                                                </li>
                                                <li className={`${style.listElm}`}>
                                                    <span className={`${style.title}`}>Currencies:</span> {
                                                        JSON.stringify(c.currencies.map((c:any) => c.name).toString()).replaceAll('"', '')
                                                    }
                                                </li>
                                            </div>
                                            
                                            
                                        </ul>
                                    
                                        <div className={`${style.bordersRow}`}>
                                            {borders ? <span className={`${style.title}`}>Border Countries:</span> : null}
                                            <span className={`${style.borders}`}>
                                                {borders && borders.map((b:any,i:number) => {
                                                    if(i<3)
                                                    return <Link className={`${style.borderLink}`} key={b} href={`${encodeURIComponent(b.toString().replaceAll(' ', '-'))}`}>{b}</Link>
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    )
                })
            }
        </>
        
    )
}


export default CountryDetails;