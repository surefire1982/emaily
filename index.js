const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send({ hi: 'there' })
})

// if PORT env not defined, use default of 5000
const PORT = process.env.PORT || 5000
app.listen(PORT)
