/**
 * ChatController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    view: function(req, res){
        Client.find(function(err, clients){
            if(err) return  res.send(err);
            res.view('chat/view', { clients : clients})
        });
    },

    chat_room: function(req, res){
        var nom = req.param("name");
        var lastname = req.param("lastname");
        Client.findOne({name:nom, lastname:lastname}, function findClient(err, moi){
            if(err) res.send(err);
            Client.find(function findAll(err, clients){
                if(err) res.send(err);
                res.view('chat/chat_room', {moi, clients});
            })
        })
    }

};

