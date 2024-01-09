const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const DEBUG = process.env.DEBUG || true;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
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

   if(DEBUG)
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
