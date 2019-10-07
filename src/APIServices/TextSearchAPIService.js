export default class TextSearchAPIService {
    /*A class that provides functionality tocommunicate with various back-end services inorder to extract details
    that are required to be rendered inside the respective components of the application.*/

    //static variable to hold the instance of the class TextSearchApiService.
    static oneInstance = null;
    backendUrl = "https://meraki-backend-wbdv.herokuapp.com";

    //return a single instance of the TextSearchAPIService class.
    static getInstance() {
        if (this.oneInstance === null) {
            TextSearchAPIService.oneInstance = new TextSearchAPIService();
        }
        return this.oneInstance;
    }

    //call the back-end service that fetches the property details for the data provided via the search field inside the search bar component.
    findPlaces = async (data) => {
        const response = await fetch(`${this.backendUrl}/api/places?search=${encodeURIComponent(data)}`);
        return await response.json();
    }

    getPlaceDetails = async (placeId) => {
        const response = await fetch(`${this.backendUrl}/api/details?placeId=${placeId}`);
        return await response.json();
    }
}


