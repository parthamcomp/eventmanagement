export default class Accessory {

    _googlePlacesAPIKey = 'AIzaSyBIyND-IpB-niJpDrq0zf1sj-6MagQ8m1U';
    static oneInstance = null;

    static getInstance() {
        if(this.oneInstance === null){
            Accessory.oneInstance = new Accessory();
        }
        return this.oneInstance;
    }

    getGooglePlacesAPIKey = () => {
        return this._googlePlacesAPIKey;
    }
}
