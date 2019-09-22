const express = require('express')
const { json } = require('body-parser')
const handle = require('./handlers')
const app = express()

const port = 80

app.get('/status', handle.status)

app.get('/get/:venue', handle.getAll)
app.get('/get/:venue/:id', handle.getItem)
app.put('/update/:venue/:id/:name/:qr_code', handle.updateItem)
app.delete('/delete/:venue/:id', handle.deleteItem)
app.post('/add', handle.add)

app.listen(port, () => console.log('Listening on port 80, the inventory service is live.'))
