'use strict';

var Alexa = require('alexa-sdk');

var flashcardsDictionary = [
    {
      question: 'How do you find the length of a string?',
      rubyAnswer: 'length',
      pythonAnswer: 'Len',
      javascriptAnswer: 'length'
    },
    {
      question: 'How do you print to the console or terminal?',
      rubyAnswer: 'puts',
      pythonAnswer: 'print',
      javascriptAnswer:'console.log'
    },
    {
       question:'Are the boolean terms true and false capitalized?',
       rubyAnswer: 'no',
       pythonAnswer: 'yes',
       javascriptAnswer: 'no'
     }];

var DECK_LENGTH = flashcardsDictionary.length;

var handlers = {

  // Open Codecademy Flashcards
  'LaunchRequest': function() {
    this.attributes['language'] = '';
    this.attributes['numberCorrect'] = 0;
    this.attributes['currentFlashcardIndex'] = 0;

    this.emit(':responseReady');
  },

  'SetMyLanguageIntent': function() {
    this.attributes.flashcards.currentLanguage = this.event.request.intent.slots.languages.value;
    var currentLanguage = this.attributes.flashcards.currentLanguage

    this.response
        .speak('Okay, I will ask you some questions about ' +
        currentLanguage + '. Here is your first question.' + 
                this.AskQuestion).listen(this.AskQuestion);
    this.emit(':responseReady');
  },

  // User gives an answer
  'AnswerIntent': function() {
    var currentLanguage = this.attributes.flashcards.currentLanguage;
    var currentFlashcardIndex = this.attributes.flashcards.languages[currentLanguage].currentFlashcardIndex;
    var userAnswer = this.event.request.intent.slots.answer.value;
    var languageAnswer = currentLanguage + 'Answer';
    var correctAnswer = flashcardsDictionary[currentFlashcardIndex][languageAnswer];

    if (userAnswer == correctAnswer){
        this.attributes.flashcards.languages[currentLanguage].numberCorrect++;
        var numberCorrect = this.attributes.flashcards.languages[currentLanguage].numberCorrect;
        this.response
          .speak('Nice job! The correct answer is ' + correctAnswer + '. You ' +
            'have gotten ' + numberCorrect + ' out of ' + DECK_LENGTH + ' ' +
            language + ' questions correct. Here is your next question. ' + this.AskQuestion)
          .listen(this.AskQuestion);
    } else {
        var numberCorrect = this.attributes.flashcards.languages[currentLanguage].numberCorrect;
        this.response
          .speak('Sorry, the correct answer is ' + correctAnswer + '. You ' +
          'have gotten ' + numberCorrect + ' out of ' + DECK_LENGTH + ' ' +
          language + ' questions correct. Here is your next question.' + 
                 this.AskQuestion).listen(this.AskQuestion);
    }

    this.attributes.flashcards.languages[currentLanguage].currentFlashcardIndex++;
    this.emit(':responseReady');
  },
  
   // Test my {language} knowledge
  'AskQuestion': function() {
    var currentLanguage = this.attributes.flashcards.currentLanguage;
    var currentFlashcardIndex = this.attributes.flashcards.languages[currentLanguage].currentFlashcardIndex;
    var currentQuestion = flashcardsDictionary[currentFlashcardIndex].question;

    this.response.listen('In ' + currentLanguage +', ' + currentQuestion);
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
  }
  
  
  
};

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context, callback);
    // Add Table Here:
  
    alexa.registerHandlers(handlers);
    alexa.execute();
};
