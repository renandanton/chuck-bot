import sender from './../factories/sender';
import template_buttons from './../templates/buttons';
import template_text from './../templates/simple_text';
import User from './../../api/joke/User';

const explicit_joke_payloads = ['joke_explicit_payload'];

module.exports = {
    hydrate: function (data) {
        let senderId = data.senderId;
        let payload = data.payload;
        let user = new User(senderId); 
        
        if (senderId) { 
            
            user.route = '/random?limitTo=[explicit]';
            user.askJoke().then((res) => {
                sender.facebook(template_buttons.message({
                    recipientId: senderId,
                    text: res.joke,
                    buttons: [
                        {
                            type: 'postback',
                            title: 'Another Explicit Joke',
                            payload: 'joke_explicit_payload'
                        }
                    ]
                }));
            }).catch((msg) => {
                sender.facebook(template_text.message({
                    recipientId: senderId,
                    speech: msg
                }));
            });
        }
    },
    
    isExplicitJokePayload: function (payload) {
        if (explicit_joke_payloads.indexOf(payload) > -1) {
            return true;      
        }
        
        return false;
    },
}