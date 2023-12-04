import {promises as fs} from 'fs'
import path from 'path'

const Countries = async() => {

    const filePath = path.resolve('./src/data/data.json')
    const countryList = await fs.readFile(filePath, 'utf-8')
    if(countryList) return (JSON.parse(countryList))

}

export default class CountryModel {
    async getAll(): Promise<any> {
        try {
            let countries = await Countries()
            return countries
        } catch(e) {
            return e
        }
    }
    async getCountry(name: string): Promise<any> {
        try {
            let countries = await Countries()
            let country = countries.filter((c:any) => c.name.toLowerCase().toString().replaceAll(' ', '-') == name.toLowerCase())

            return country
        } catch(e) {
            return e
        }
    }
    async getBorders(alpha: string[]): Promise<any> {
        try {
            let countries = await Countries()
            let borders: any= []
            alpha.forEach(async(a:any) => {
                let border = await countries.filter((c:any) => c.alpha3Code == a)
                borders.push(border[0].name)
            })
            return borders
        } catch(e: any) {
            return e
        }
    }


}


