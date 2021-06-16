import express from 'express'
import request from 'request'

const app = express()

const getData = () =>  {
    return new Promise((resolve, reject) => {
        request('https://api.publicapis.org/categories', (err, res, body) => {
            if (err) reject(err)
            resolve(JSON.parse(body))
        })
    })
}

const filterResults = async filter => {
    const data = await getData()
    let result = []
    data.forEach(element => {
        if(element.startsWith(filter)) result.push(element)
    })
    return result
}


app.get('/:filter', async (req, res) => {
    const result = await filterResults(req.params.filter)
    console.log(result)
    res.send(result)
})

app.listen(3000, () => {
    console.log('Server Start')
})