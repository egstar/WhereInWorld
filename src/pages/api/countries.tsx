import type { NextApiRequest, NextApiResponse } from 'next'
import * as env from '@/data/env'
import CountryModel from '@/models/countries'

const Country = new CountryModel()
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'GET'){
        try {
            let countries = await Country.getAll()
            if(countries){
                return res.status(200)
                .json(countries)
            } else {
                return res.status(300).json({
                    error: 'No data'
                })
            }
        } catch(e) {
            return res.status(401).json({
                error: 'Not Authorized'
            })
        }
    }
    if(req.method === 'POST' && req.body.country) {
        try {
            let country = await Country.getCountry(req.body.country!)
            if(country){
                return res.status(200).json(country)
            }
        } catch(e) {
            return res.status(401).json({
                error: 'Not Authorized'
            })
        }
    }
    if(req.method === 'OPTIONS' && req.body.borders) {
        let {borders} = req.body
        let bordersNames = await Country.getBorders(borders)
        try{
            return res.status(200).json(bordersNames)
        } catch(e) {
            return res.status(401).json({
                error: 'Not Authorized'
            })
        }
    }

}