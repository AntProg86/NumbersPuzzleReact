const MODE = process.env.NODE_ENV || 'development';
 
const HOST_CLIENT = process.env.HOST || 'localhost';
const PORT_CLIENT = process.env.PORT || '3030';
  
module.exports = {
  mode: MODE,
 
  clientHost: HOST_CLIENT,
  clientPort: PORT_CLIENT,
};