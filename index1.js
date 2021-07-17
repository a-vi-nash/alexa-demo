'use strict';

var Alexa = require('alexa-sdk');

var flashcardsDictionary = [
    
     ];

var DECK_LENGTH = flashcardsDictionary.length;

var handlers = {

  // Open Codecademy Flashcards
  'LaunchRequest': function() {

  },

  // User gives an answer
  'AnswerIntent': function() {

  },
  
   // Test my {language} knowledge
  'AskQuestion': function() {
    var currentFlashcardIndex = this.attributes.flashcards.languages[currentLanguage].currentFlashcardIndex;
    var currentState = flashcardsDictionary[currentFlashcardIndex].question;

    this.response.listen('What is the capital of ' currentState);
    this.emit(':responseReady');
  },

  // Stop
  'AMAZON.StopIntent': function() {
      this.response.speak('Ok, let\'s play again soon.');
      this.emit(':responseReady');
  },

  // Cancel
  'AMAZON.CancelIntent': function() {
      this.response.speak('Ok, let\'s play again soon.');
      this.emit(':responseReady');
  },

  // Save state
  'SessionEndedRequest': function() {
    console.log('session ended!');
    this.emit(':saveState', true);
  },
  //favourite language Intent
  "myFavoriteLanguageIntent": function(){
  this.response.speak("My favourite language is JavaScript"); 
    this.emit(':responseReady');
}

};

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};