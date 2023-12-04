import type { NextApiRequest, NextApiResponse } from 'next'
import * as env from '@/data/env'
import CountryModel from '@/models/countries'

const Country = new CountryModel()
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'GET' && req.headers.host == env.SITE_URL ){
        try {
            let countries = await Country.getAll()
            if(countries)
            res.status(200)
            .json(countries)
        } catch(e) {
            res.status(401).json({error: 'Not Authorized'})
        }
    }
    if(req.method === 'POST' && req.body.country && req.headers.host == env.SITE_URL ) {
        try {
            let country = await Country.getCountry(req.body.country!)
            if(country){
                res.status(200).json(JSON.parse(country))
            }
        } catch(e) {
            res.status(401).json({error: 'Not Authorized'})
        }
    }
    if(req.method === 'OPTIONS' && req.body.borders && req.headers.host == env.SITE_URL ) {
        let {borders} = req.body
        let bordersNames = await Country.getBorders(borders)
        try{
            res.status(200).json(JSON.parse(bordersNames))
        } catch(e) {
            res.status(401).json({error: 'Not Authorized'})
        }
    }
    res.status(401).json({
        Done:false,
        Host: req.headers.host,
        origin: req.headers.origin || 'EMPTY',
        env: env.SITE_URL || 'EMPTY',
        ref: req.headers.referer || 'EMPTY',

    })
}