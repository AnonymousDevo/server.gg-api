const axios = require('axios').default;
const cheerio = require('cheerio')
const request = require('request')
const express = require('express')
const app = express()

app.get('/emojis/:id', async (req, res) => {

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
                    
        
                    console.log(img)
        
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
                res.send('Request failed')
            }
         })
})

app.listen(8080)