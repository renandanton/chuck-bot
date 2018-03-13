import sender from './../factories/sender';
import template_generic from './../templates/generic';

const Postback = {
    hydrate:  (data) => {
        var senderId = data.senderId;
        var payload = data.payload;

        if (senderId) {
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
        }
    },
    
    isGetStartedPayload: (payload) => {
        if (['get_started_payload'].indexOf(payload) > -1) {
            return true;      
        }
        
        return false;
    }
};

export default Postback;