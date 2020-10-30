const axios = require('axios')
const cheerio = require('cheerio')
const request = require('request')
const express = require('express')
const app = express()

app.get('/emojis/:id', async (req, res) => {
    
    if(req.params.id.length < 10) res.status(404).send('Server id length can\'t be less than 10')

    const url = "https://top.gg/servers/" + req.params.id

    
        request(url, (err, resp, html) => {
            if(!err && resp.statusCode == 200){
                console.log('Request successful')
        
                const $ = cheerio.load(html)

                let array = []
        
                $('img').each((index, image) => {
                    let img = $(image).attr('src')
                    if(img.startsWith('https://cdn.discordapp.com/emojis/')) {
                    array.push(img)
        
                        link = img.substring(0, img.length-4);
                        request(link+'.gif', (err, resp, html) => {
                            if(!err && resp.statusCode == 200){
                                console.log('GIF CONFIRMED: '+link+'.gif')
                            }
                        })
                    }
                })

                res.send(array)
        
            }else{
                res.send('Request failed with status code: 404')
            }
         })
})

app.get('*', (req, res) => {
res.status(404).send('Requested data not found! try again with right endpoint')
})

app.listen(8080)
