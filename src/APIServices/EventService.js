export default class EventService {
	static oneInstance = null;

	static getInstance() {
		if (this.oneInstance === null) {
			this.oneInstance = new EventService();
		}

		return this.oneInstance;
	}

	getEventDataUsingEventId(eventId) {
		return fetch(`https://meraki-backend-wbdv.herokuapp.com/api/events/${eventId}`)
			.then(response => response.json());
	}

	updateEvent(updatedEventData) {
		return fetch(`https://meraki-backend-wbdv.herokuapp.com/api/events/${updatedEventData._id}`,{
			method: 'POST',
			body: JSON.stringify(updatedEventData),
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(response => true)
			.catch(error => error.json());
	}
}
