const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({path : path.resolve(__dirname, '../.env')});

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();


const get_urls = async () => {
    try{
        const [results] = await pool.query("SELECT * FROM urls");
        return results;
    }catch(error){
        console.error('Error executing query:', error);
        return [];
    }finally{
        // pool.end();
    }
};

const get_url = async (long_url) => {
    try{
        // ? instead of ${url_key} Avoids SQL injections
        const [result] = await pool.query(`SELECT * FROM urls WHERE long_url = ?`, [long_url]);
        return result[0];
    }catch(error){
        console.error('Error executing query:', error);
        return undefined;
    }finally{
        // pool.end();
    }
};

// TODO: This does not return for now, perhaps it should return the recently added item
const create_url = async (url_key, long_url, short_url) => {
    try{
        await pool.query(`INSERT INTO urls () VALUES (?, ?, ?)`, [url_key, long_url, short_url]);
        return true;
    }catch(error){
        console.error('Error executing query:', error);
        return false;
    }finally{
        // pool.end();
    }
};

// TODO: This does not return for now, perhaps it should return the recently deleted item
const delete_url = async (long_url) =>{
    try{
        await pool.query(`DELETE FROM urls WHERE long_url = ?`, [long_url]);
    }catch(error){
        console.error('Error executing query:', error);
    }finally{
        // pool.end();
    }
};

/* For Testing

// Select all
(async () => {
    const urls = await get_urls();
    console.log(urls);
})();

// Select one
(async () => {
    const url = await get_url("hello");
    console.log(url);
})();

// Create
(async () => {
    await create_url("daeref", "https://www.facebook.com/daeref345456wfdfgsdgfgf", "https://www.facebook.com/daeref");
})();

// Delete
(async () => {
    await delete_url("daeref");
})();

*/

module.exports = { get_urls, get_url, create_url, delete_url};