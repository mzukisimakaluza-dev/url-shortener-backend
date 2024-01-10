const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

const {get_urls, get_url, create_url, delete_url} = require('./database.js');
const { generate_short } = require('./url_algorithms.js');

dotenv.config({path : path.resolve(__dirname, '../.env')});

const app = express();
app.use(express.json());

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`Server listening on socket ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
});


app.get('/urls', async (request, response) => {
   const urls = await get_urls();
   response.send(urls);
});

app.get('/url/:long_url', async (request, response) => {
   const id = request.params.long_url;
   console.log(id);
   const url = await get_url(id);

   if(url){
      response.send(url);
   }else{
      // URL does not exit, so create it
      const {url_key, short_url} = generate_short(id);
      const status = await create_url(url_key, id, short_url);

      if(status){
         response.send({message: "URL did not exist but was created"});
      }else{
         response.status(500).json({ error : "Failed to create URL"})
      }
   }
});

app.post('/urls', async (request, response) => {
   const { long_url } = request.body;

   if(!long_url){ return response.status(400).json({error: 'Long URL is required'})};

   const url = await get_url(long_url);

   if(url){return response.status(400).json({error: 'URL already exists'})};

   const {url_key, short_url} = generate_short(long_url); // this method should return 2 values

   const status = await create_url(url_key, long_url, short_url);

   if(status) { return response.status(200).json({message: 'New URL added'})};

   return response.status(400).json({error: 'Bad request'})

});


app.post('/shorten', async (request, response) => {
   const { long_url } = request.body;

   if(!long_url) { return response.status(400).json({error: 'Long URL is required'})};

   if(process.env.SERVER_DEBUG)
   {
      const fs = require('fs');

      const raw_dummy_resp = fs.readFileSync('../configs/dummy_data.json');
      const dummy_resp = JSON.parse(raw_dummy_resp);
      
      response.send(dummy_resp.success);
   }
   else
   {
      const url_obj = await get_url(long_url);

      if(url_obj){
         // USE DB because this has already been shortened
         response.send(url_obj);
      }else{
         // Create shortened version and store in DB, then return it
         const {url_key, short_url} = generate_short(long_url);
         const status = await create_url(url_key, long_url, short_url);
   
         if(status){
            response.send({message: "INFO: New entry cached"});
         }else{
            response.status(500).json({ error : "Failed to create URL"})
         }
      }
   }

});

/*
http://127.0.0.1:3000/url/https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DHej48pi_lOc == http://127.0.0.1:3000/url/https://www.youtube.com/watch?v=Hej48pi_lOc

*/
