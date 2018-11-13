const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const app = express();

app.post('/login', (req, res) => {
  let body = req.body;

  Usuario.findOne({email: body.email}, (err, usuarioDB) => {
    if (err){
      res.status(500).json({
        ok: false,
        err
      });
    }
    if (!usuarioDB){ //comprobación de usuario
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario o contraseña incorrecta'
        }
      });
    }
    if (!bcrypt.compareSync(body.password, usuarioDB.password)){ //comprobación de password
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario o contraseña incorrecta'
        }
      });
    }
    let token = jwt.sign({
      usuario: usuarioDB
    }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN})
    res.json({
      ok: true,
      usuario: usuarioDB,
      token
    });
  });
});











module.exports = app;