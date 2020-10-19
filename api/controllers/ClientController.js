/**
 * ClientController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: function(req, res){
      var nom = req.param('name');
      var prenom = req.param('lastname');
      var taona = req.param('age');
      Client.create({name:nom, lastname: prenom, age: taona }, function createClient(err){
          if(err) return  res.send(err);
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
  }
  

};

