const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Pour définir les models, on va d'abord construire un nouveau Schéma qui contient les documents
const passportLocalMongoose = require("passport-local-mongoose");

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

const User = new Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  refreshToken: {
    type: [Session],
  },
});

//Remove refreshToken from the response
User.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});
// set enlève tous les documents dont les conditions sont remplies
// Ici on enlève RefreshToke de la réponse
User.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", User);
