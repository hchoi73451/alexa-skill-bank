var Alexa = require('alexa-sdk');

const skillName = "The Banking Skills";

var handlers = {

    "BillPayIntent": function () {
        var speechOutput = "Bill paid for " + this.event.request.intent.slots.Payee.value;
        this.emit(':tellWithCard', speechOutput, skillName, speechOutput);
    },

    "BalanceIntent": function () {
        const https = require('https');
        https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
          let data = '';

          // A chunk of data has been recieved.
          resp.on('data', (chunk) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on('end', () => {
            let json = JSON.parse(data);
            //console.log(json);
            //console.log(json.explanation);
            var speechOutput = "Your balance is " + 100 + " dollars ";
            speechOutput += "The title is " + json.title;
            this.emit(':tellWithCard', speechOutput, skillName, speechOutput);
          });

        }).on("error", (err) => {
          console.log("Error: " + err.message);
        });
    },

    "LanguageIntent": function () {
        var speechOutput = "I don't have anything interesting to share regarding what you've asked."
        this.emit(':tellWithCard', speechOutput, skillName, speechOutput);
    },

    "AboutIntent": function () {
        var speechOutput = "This bank is funtastic!";
        this.emit(':tellWithCard', speechOutput, skillName, speechOutput);
    },

    "AMAZON.HelpIntent": function () {
        var speechOutput = "";
        speechOutput += "Here are some things you can say: ";
        speechOutput += "What is the balance on my account. ";
        speechOutput += "You can also say stop if you're done. ";
        speechOutput += "So how can I help?";
        this.emit(':ask', speechOutput, speechOutput);
    },

    "AMAZON.StopIntent": function () {
        var speechOutput = "Goodbye";
        this.emit(':tell', speechOutput);
    },

    "AMAZON.CancelIntent": function () {
        var speechOutput = "Goodbye";
        this.emit(':tell', speechOutput);
    },

    "LaunchRequest": function () {
        var speechText = "";
        speechText += "Welcome to " + skillName + ". ";
        speechText += "You can ask a question like, what is the balance on my account. ";
        var repromptText = "For instructions on what you can say, please say help me.";
        this.emit(':ask', speechText, repromptText);
    }

};

exports.handler = function (event, context) {
    var alexa = Alexa.handler(event, context);
    // DO not set appID here when running on AWS
    alexa.registerHandlers(handlers);
    alexa.execute();
};
