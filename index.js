'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = "amzn1.ask.skill.edf3d07f-fcf3-4fc1-99c8-a9f1aaa3108c";
var SKILL_NAME = 'Compliment Giver';

/**
 * Array containing compliments.
 */
var FACTS = [
    "Seeing you brightens up my day.",
    "You are absolutely gorgeous and that's the least interesting thing about you.",
    "I'm proud of you.",
    "You can do anything you put your mind to.",
    "You are the best version of you there is.",
    "I'm glad you exist.",
    "That outfit looks stunning on you.",
    "Every day is a new beginning.",
    "I enjoy talking to you.",
    "You have the biggest heart.",
    "Anyone would be lucky to have you.",
    "I love you.",
    "You make me want to be a better person."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random compliment from the compliment list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your compliment: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a compliment, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};