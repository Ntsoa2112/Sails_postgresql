/**
 * Client.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name : { type:'string', required: true},
    lastname : { type:'string', required: true},
    age : { type:'number', required: true},

  },

  datastore : 'default'

};

