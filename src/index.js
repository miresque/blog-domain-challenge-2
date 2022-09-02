require('dotenv').config();
const app = require('./server')
const port = 4040

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}/`)
})