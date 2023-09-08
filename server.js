const express = require ('express');
const mongoose = require ('mongoose');
const router = require('./routes/simple.js')
const Gun = require('gun');
const app = express();
app.use(express.json());
require('dotenv').config();
const path = require('path'); 


app.use('/', router);


  mongoose.connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true

    },
    console.log('connected to DB')

  );
  const dataPath = require('./gun-data/new-data.json');
  const filePath = path.join(__dirname, 'new-data.json');
  
  const gun = new Gun({
    file: filePath,
  });
  

  app.use(Gun.serve);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

