const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'url_shortener'
}).promise();


const get_urls = async () => {
    try{
        const [results] = await pool.query("SELECT * FROM urls");
        return results;
    }catch(error){
        console.error('Error executing query:', error);
        return [];
    }finally{
        pool.end();
    }
};

(async () => {
    const urls = await get_urls();
    console.log(urls);
})();

module.exports = {get_urls};