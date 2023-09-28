require('dotenv').config();
const app = require('./server.js');


const PORT = process.env.PORT || 4000


app.listen(PORT, () => {
  console.log(`http server listening on port ${PORT}`)
});









