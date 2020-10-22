/**
 * ClientController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var xl = require('excel4node');
const io = require('socket.io')

module.exports = {
  create: function(req, res){
      var nom = req.param('name');
      var prenom = req.param('lastname');
      var taona = req.param('age');
      var socket = io();


      Client.create({name:nom, lastname: prenom, age: taona }, function createClient(err){
          if(err) return  res.send(err);
          console.log(sails)
          sails.sockets.blast("new_user", {name:nom});
          return res.redirect('/list_client');
      });
  },

  affichage: function(req, res){
      Client.find(function(err, clients){
        if(err) return  res.send(err);
        res.view('pages/list_client', { clients : clients})
      });
  },

  afficher_client: function(req, res){
    var id = req.param('id');
      Client.findOne(id, function foundClient(err, client){
        if(err) return  res.send(err);
        res.view('pages/edit_client', { client : client})
      });
  },

  
  editer: function(req, res){
      var id = req.param('id');
      var nom = req.param('name');
      var prenom = req.param('lastname');
      var taona = req.param('age');
      Client.updateOne(id, {name:nom, lastname: prenom, age: taona }, function updateClient(err){
        if(err) return  res.send(err);
        return res.redirect('/list_client');
      } );
  },

  suppr: function(req, res){
    var id = req.param('id');
    Client.destroy(id, function(err){
        if(err) return  res.send(err);
        return res.redirect('/list_client');
    });
  },
  
  exporter: function(req, res){
    // Create a new instance of a Workbook class
    var wb = new xl.Workbook();
    var ws = wb.addWorksheet('Client');

    // Create a reusable style
    var style = wb.createStyle({
      font: {
        color: '#FF0800',
        size: 12,
      },
      numberFormat: '$#,##0.00; ($#,##0.00); -',
    });
    ws.cell(1, 1).string('Nom').style(style);
    ws.cell(1, 2).string('Prénom').style(style);
    ws.cell(1, 3).string('Age').style(style);

    Client.find(function(err, clients){
      if(err) return  res.send(err);
      
      console.log(clients);
      for(var i=0; i<clients.length; i++){
        ws.cell(i+2, 1).string(clients[i].name);
        ws.cell(i+2, 2).string(clients[i].lastname);
        ws.cell(i+2, 3).number(clients[i].age);
        console.log(i)
      }
      wb.write('assets/export/table_client.xlsx');
      console.log("Vitraaaaa");
    });
  }

};

