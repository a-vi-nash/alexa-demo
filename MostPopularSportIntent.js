"use strict";

var Alexa = require("alexa-sdk");

var handlers = {
  'LaunchRequest': function() {
    this.response.speak("Hello, what do you think is the world's most popular Sport?").listen("Tell me what you think is the world's most popular language");
    this.response.emit(':responseReady');

  },

  'MostPopularSportIntent': function () {
    var worldSport = this.event.request.intent.slots.sport.value;
    if(worldSport == "soccer")
      {
        this.response.speak("Correct! Soccer is the world's most popular language");
      }
    else
      {
        this.response.speak("You guessed that "+worldSport+" is the most popular. Actually, soccer is the world's most popular sport");
      }
    this.response.emit(':responseReady');
  }
}

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};