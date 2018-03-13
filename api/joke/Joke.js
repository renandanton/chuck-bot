import Provider from './Provider';

class Joke extends Provider {
    
    constructor() {
        super();
        this._route = '/random';
        this._escape = 'javascript';
        this._category = ['nerdy', 'explicit'];
        this._joke = {};
    }
    
    get firstName () {
        return this._firstName;
    }
    
    set firstName (value) {
        this._firstName = value;
    }
    
    get lastName () {
        return this._lastName;
    }
    
    set lastName (value) {
        this.lastName = value; 
    }
    
    get category () {
        return this._category;
    }
    
    set category (value) {
        this._category = value;
    }
    
    get escape () {
        return this._escape;
    }
    
    set escape (value) {
        this._escape = value;
    }
    
    get route () {
        return this._route;
    }
    
    set route (value) {
        this._route = value;
    }
    
    get joke () {
        return this._joke;
    }
    
    set joke (value) {
        this._joke = value;
    }
    
   jokeRequest() {
        let response =  super.sender(this._route);
        
        response.then((resp) => {
            this._joke = JSON.parse(resp);
        }).catch((err) => {
           throw new Error(err); 
        });
        
        return response;
    }
}

export default Joke;