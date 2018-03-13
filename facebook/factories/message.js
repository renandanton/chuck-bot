import sender from './sender';
import template_generic from './../templates/generic';
import template_text from './../templates/simple_text';
import User from './../../api/joke/User';

const Factory = {
    
    hydrate: (event) => {
      var senderId = event.sender.id;
      var recipientId = event.recipient.id;
      var timeOfMessage = event.timestamp;
      var message = event.message;
      var messageId = message.mid;
      var messageText = message.text;
      var attachments = message.attachments;
      
      let user = new User(senderId);

      if (messageText) {
        
       user.route = '/random?limitTo=[nerdy,explicit]';
       user.askJoke().then((res) => {
       sender.facebook(template_generic.message([
                {
                    recipientId: senderId,
                    title: 'Welcome to Chuck Bot',
                    subtitle: 'Choose what kind of category joke you want below.', 
                    imageUrl: 'https://venturebeat.com/wp-content/uploads/2017/03/Screen-Shot-2017-03-06-at-8.01.41-PM.png', 
                    buttons: [
                        {
                            text: 'Explicit',
                            postback: 'joke_explicit_payload'
                        },
                        {
                            text: 'Nerdy',
                            postback: 'joke_nerdy_payload'
                        },
                        {
                            text: 'Both',
                            postback: 'joke_random_payload'
                        }
                    ]
                }
            ]));
        }).catch((msg) => {
            sender.facebook(template_text.message({
                recipientId: senderId,
                speech: msg
            }));
        });
       
      } else if (attachments) {
        console.log(attachments);
        return;
      }
    }
};

export default Factory;