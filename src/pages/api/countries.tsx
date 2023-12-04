import type { NextApiRequest, NextApiResponse } from 'next'
import * as env from '@/data/env'
import CountryModel from '@/models/countries'

const Country = new CountryModel()
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'GET' && req.headers.origin == env.SITE_URL ){
        console.log(env.SITE_URL, req.headers.origin)
        try {
            let countries = await Country.getAll()
            if(countries)
            res.status(200)
            .json(countries)
        } catch(e) {
            res.status(401).json({error: 'Not Authorized'})
        }
    }
    if(req.method === 'POST' && req.body.country) {
        try {
            let country = await Country.getCountry(req.body.country!)
            if(country){
                res.status(200).json(country)
            }
        } catch(e) {
            res.status(401).json({error: 'Not Authorized'})
        }
    }
    if(req.method === 'OPTIONS' && req.body.borders) {
        let {borders} = req.body
        let bordersNames = await Country.getBorders(borders)
        try{
            res.status(200).json(bordersNames)
        } catch(e) {
            res.status(401).json({error: 'Not Authorized'})
        }
    }
    res.status(401).json({
        Done:false,
        Host: req.headers.host,
        origin: req.headers.origin,
        env: env.SITE_URL,
        ref: req.headers.referer
    })
}