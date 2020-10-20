/**
 * CheminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var fs = require('file-system');
const getSize = require('get-folder-size');

module.exports = {
    // chemin = Doc/Folder
    traitement: function(req, res){
        var chemin = req.param('chemin');
        fs.readdir(chemin, function readdir(err, files){
            if(err) return res.send(err);
            console.log(files);
            getSize(chemin, function statChemin(err, size){
                if(err) return res.send(err);
                console.log(size + ' bytes');
                console.log((size / 1024 / 1024).toFixed(2) + ' MB');
            })
        });
    },

};

