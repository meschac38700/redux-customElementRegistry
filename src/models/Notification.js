export default class Notification{

  #_id = null;
  #title = null;
  #message = null;
  #observer = null;
  
  constructor({title, message} = {}){
    this._id = new Date().getTime() + "-" + message?.toLowerCase()?.replaceAll(/\s+/g, "-");
    this.title = title;
    this.message = message;
    this.observer = new Proxy(this, {
      set(self, key, value){
        if(self[key]){
          self[key] = value;
        }
      },
      get(self, key){
        return self[key] ?? null;
      }
    })
  }

  get id(){
    return this._id;
  }

  get observerInstance(){
    return this.observer;
  }

  /**
   * @param value new title
   */
  set setTitle(value){
    this.observer.title = value;
  }

  /**
   * @param value new message
   */
  set setMessage(value){
    this.observer.message = value;
  }
}