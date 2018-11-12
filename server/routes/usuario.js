const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

const app = express();

/**
 * Select usuario
 * Filtrar Usuario.find({'aquí los campos a filtrar ej('nombre email)'})
 */
app.get('/usuario', function (req, res) {
  let desde = req.query.desde || 0;
  desde = Number(desde);
  let limite = req.query.limite || 5;
  limite = Number(limite);
  Usuario.find({estado: true})
  .skip(desde)
  .limit(limite)
  .exec((err, usuraio) => {
    if (err){
      return res.status(400).json({
        ok: false,
        err
      })
    };
    Usuario.count({estado: true}, (err, contador) => {
      res.json({
        ok: true,
        usuraio,
        total: contador
      });

    })
  });
});

//nuevo usuario
app.post('/usuario', function (req, res) {
  let body = req.body;

  let usuraio = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  })

  usuraio.save((err, usuarioDB) => {
    if (err){
      return res.status(400).json({
        ok: false,
        err
      })
    };
    
    res.json({
      ok: true,
      usuario: usuarioDB
    });
  });
});

//actualizar usuario
app.put('/usuario/:id', function (req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

  Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {
    if (err){
      return res.status(400).json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      usuario: usuarioDB
    });
  });
  // res.json('put usuario');
});

//elimiar usuario
app.delete('/usuario/:id', function (req, res) {
  let id = req.params.id;
  let cambiarEstado = {
    estado: false
  }
  // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
  Usuario.findByIdAndUpdate(id, cambiarEstado, {new: true}, (err, usuarioBorrado) => {
    if (err){
      return res.status(400).json({
        ok: false,
        err
      })
    };
    if (!usuarioBorrado) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario no encontrado'
        }
      });
    }
    res.json({
      ok: true,
      usuario: usuarioBorrado
    });
  })

});

module.exports = app;