import request from 'request';

class Provider {
  
    constructor () {}
    
    sender (route) {
      return new Promise((resolve, reject) => {
        request({
            uri: 'https://api.icndb.com/jokes' + route,
            method: 'GET',
          }, (err, res, body) => {
            if (!err && res.statusCode == 200) {
              return resolve(body);
            } else {
              return reject(new Error(err));
            }
          }); 
      });

    }
}

export default Provider;