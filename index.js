const express = require('express')
require('./services/passport')

const app = express()

require('./routes/authRoutes')(app)

// if PORT env not defined, use default of 5000
const PORT = process.env.PORT || 5000
app.listen(PORT)
