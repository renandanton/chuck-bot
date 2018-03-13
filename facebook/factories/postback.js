import get_started from './../postbacks/get_started';
import random_joke from './../postbacks/random_joke';
import nerdy_joke from './../postbacks/nerdy_joke';
import explicit_joke from './../postbacks/explicit_joke';

const Factory = {
     hydrate: (event) => {
      var senderId = event.sender.id;
      var recipientId = event.recipient.id;
      var timeOfMessage = event.timestamp;
      var postback = event.postback;
      var payload = postback.payload;

      if (postback.payload) {
        if (get_started.isGetStartedPayload(payload)) {
            get_started.hydrate({
                senderId: senderId,
                payload: postback.payload
            });
        } else if (random_joke.isRandomJokePayload(payload)) {
            random_joke.hydrate({
                senderId: senderId,
                payload: postback.payload
            });
        } else if (nerdy_joke.isNerdyJokePayload(payload)) {
            nerdy_joke.hydrate({
                senderId: senderId,
                payload: postback.payload
            });
        } else if (explicit_joke.isExplicitJokePayload(payload)) {
            explicit_joke.hydrate({
                senderId: senderId,
                payload: postback.payload
            });
        }
      }
    }
};

export default Factory;