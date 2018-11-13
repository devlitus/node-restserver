// Puerto
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Vencimiento del token
process.env.CADUCIDAD_TOKEN = 60 * 60  * 24 * 30;

// seed de autenticación
process.env.SEED = process.env.SEED || 'secret';

//Base de datos
let urlDB;
if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/cafe';
}else{
  urlDB = process.env.MONGO_URI;
};
process.env.URLDB = urlDB;

// Google client id
process.env.CLIENT_ID = process.env.CLIENT_ID || '355809411759-g7ahsf17nhhpqkb01lj2ol8g6h45qq88.apps.googleusercontent.com';



//mongodb://localhost:27017/cafe
// mongodb://<dbuser>:<dbpassword>@ds259463.mlab.com:59463/nodecafedb