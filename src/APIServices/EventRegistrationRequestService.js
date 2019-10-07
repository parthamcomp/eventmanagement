export default class EventRegistrationRequestService {

	static oneInstance = null;

	static getInstance() {
		if (this.oneInstance === null) {
			this.oneInstance = new EventRegistrationRequestService();
		}
		return this.oneInstance;
	}

	createEventRegistrationRequest = (eventData) => {
		eventData._id = new Date().getTime();
		console.log("request received: ", eventData);
		return fetch("https://meraki-backend-wbdv.herokuapp.com/api/event-registration-request/", {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(eventData)
			}
		)
			.then(response => response.json())
			.catch(error => error.json())
	}
}
