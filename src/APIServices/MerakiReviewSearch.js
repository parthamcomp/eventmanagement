export default class MerakiReviewSearch {

	static oneInstance = null;

	static getInstance() {
		if (this.oneInstance === null) {
			this.oneInstance = new MerakiReviewSearch();
		}
		return this.oneInstance;
	}

	getPlaceReview = (placeId) => {
		return fetch(`https://meraki-backend-wbdv.herokuapp.com/api/review/${placeId}`)
			.then(response => response.json())
			.catch(error => error.json());
	}
}
