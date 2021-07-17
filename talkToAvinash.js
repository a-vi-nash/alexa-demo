"use strict";

var Alexa = require("alexa-sdk");

var handlers = {
  'LaunchRequest': function() {
    this.response.speak("Hello Friends, This is Avinash, Naam toh suna he hoga.").listen("What do you want to know about me?");
    this.emit(':responseReady');
  },

  'AskAvinashIntent': function () {
    var whatword = this.event.request.intent.slots.whatword.value;
    //based on what word describe the person/relation to the user
    this.response.speak("you asked  me about "+whatword);
    this.emit(':responseReady');
  },

  'GreetAvinashIntent':function () {
    //greet the user and ask what he wants to know about Avinash?
    this.response.speak("Kaisan ba, ek dum majja maa?").listen("kaa jaan na hai humra baare mee?");
    this.emit(':responseReady');
  }
}

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};