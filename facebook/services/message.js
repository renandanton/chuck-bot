import Message  from './../factories/message';
import Postback from './../factories/postback';

const Service = (req, res, next) => {
  var data = req.body;
  
  if (data && data.object === 'page') {
    data.entry.forEach( (entry) => {
      var pageID = entry.id;
      var timeOfEvent = entry.timestamp;
      
      entry.messaging.forEach((event) => {
        if (event.message) {
            Message.hydrate(event);
        } else if (event.postback) {
            Postback.hydrate(event);
        }
      });
    });
    res.sendStatus(200);
  }
};

export default Service;