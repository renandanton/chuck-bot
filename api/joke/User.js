import client from './../../facebook/factories/redis';
import Joke from './Joke';

class User extends Joke {
    
    constructor(id) {
        super();
        this._id = id;
    }
    
    get id () {
        return this._id ;
    }
    
    set id (value) {
        this._id = value;
    }
    
    addJoke() {
        return new Promise ((resolve, reject) => {
            client.hget(this._id, 'count', (err, count) => {
                if (err) return reject(err);
                let updateCount = parseInt(count, 10) + 1;
                let time = new Date().getTime();
                client.hset(this._id, 'time', time);
                client.hset(this._id, 'count', updateCount);
                return resolve(updateCount);
            });
        });
    }
    
    countJokes() {
        return new Promise((resolve, reject) => {
            client.hget(this._id, 'count', (err, count) => {
                if (err) return reject(err);
                if (! count) {
                    count = 0;
                    client.hset(this._id, 'count', 0);
                }
                return resolve(count);
            });
        });
    }
    
    getLastJokeTime() {
        return new Promise((resolve, reject) => {
            client.hget(this._id, 'time', (err, time) => {
                if (err) return reject(err);
                return resolve(time);
            });
        });
    }
    
    resetCountedJokes() {
        client.hset(this._id, 'count', 0);
    }
    
    askJoke() {
        return new Promise((resolve, reject) => {    
           this.countJokes().then((count ) => {
               let counted = parseInt(count, 10);
               let jokePromise = super.jokeRequest();
               if (counted < 10) {
                   this.addJoke();
                   jokePromise.then((resp) => {
                       let joke = JSON.parse(resp);
                       resolve(joke.value);
                   }).catch((err) => {
                       throw new Error(err);
                   });
               } else {
                   this.getLastJokeTime().then((time) => {
                       let lastTime = parseInt(time, 10);
                       let now = parseInt(new Date().getTime(), 10);
                       if ((lastTime + (60 * 60 * 24 * 1000)) <= now ) {
                           this.resetCountedJokes();
                           jokePromise.then((resp) => {
                               let joke = JSON.parse(resp);
                               resolve(joke.value);
                           }).catch((err) => {
                               throw new Error(err);
                           });
                       } else {
                            return reject('You have to wait 24 hours!');    
                       }
                   }).catch((err) => {
                       throw new Error(err);
                   });
               }
           }).catch((err) => {
               throw new Error(err); 
           });
        });
    }
}

export default User;