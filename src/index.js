const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path : path.resolve(__dirname, '../.env')});

const app = express();
app.use(express.json());

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on port ${process.env.SERVER_PORT}`);
});

app.get('/status', (request, response) => {
   const status = {
      'Status': 'Running'
   };
   
   response.send(status);
});

app.post('/shorten', (request, response) => {
   const { long_url } = request.body;

   if(!long_url) { return response.status(400).json({error: 'Long URL is required'})};

   //console.log(long_url);

   if(process.env.SERVER_DEBUG)
   {
      const fs = require('fs');

      const raw_dummy_resp = fs.readFileSync('../configs/dummy_data.json');
      const dummy_resp = JSON.parse(raw_dummy_resp);
      
      response.send(dummy_resp.success);
   }
   else
   {

   }

});
