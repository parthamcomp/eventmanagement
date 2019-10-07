import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import ProfileNavBar from "./modules/views/ProfileNavBar";
import ProfileBody from "./modules/views/ProfileBody";
import UserService from './APIServices/UserService';
import EventService from "./APIServices/EventService";
import AppFooter from "./modules/views/AppFooter"
import withRoot from "./modules/withRoot";

const userService = UserService.getInstance();
const eventService = EventService.getInstance();

const defaultState = {
	userData: {},
	displayProfile: true,
	searchFormData: '',
	profileSearchResult: null,
	eventList: [],
	profileId: -1,
	anonymousUser: false,
	offlineUpdate: false,
	changeVisibiltiyFlag: false,
	redirectFlag: false
}

class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = defaultState;
		this.state = {...defaultState, profileId: props.match.params.profileId};
		let userNameToBeSearched =
			(props.match.params.profileId === null || props.match.params.profileId === undefined) ?
				localStorage.getItem("currentUser") : props.match.params.profileId;
		if (userNameToBeSearched === null) {
			this.state = {...defaultState, anonymousUser: true}
		} else {
			this.getUserDataToLocal(userNameToBeSearched, props);
		}
	}

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		if(nextProps.match.params.profileId !== this.state.profileId){
			this.getUserDataToLocal(nextProps.match.params.profileId, nextProps);
		}
		return true;
	}

	getUserDataToLocal(userNameToBeSearched, props) {
		userService
			.getUserData(userNameToBeSearched)
			.then(userData => {
				this.setState({...this.state, userData, profileId: props.match.params.profileId,eventList:[]})
				let eventList = [];
				userData.events.forEach(eventId => {
					eventService
						.getEventDataUsingEventId(eventId)
						.then(eventDetails => {
							eventList.push(eventDetails);
							this.setState({...this.state, eventList})
						});
				});
				this.setState({...this.state, eventList});
			});
	}

	renderProfileList = (flag) => {
		this.setState({
			...this.state,
			displayProfile: flag
		});
	};

	followUser = (follow, follower) => {
		userService.followUser(follow, follower)
			.then(response =>
				userService.getUserData(localStorage.getItem("currentUser"))
					.then(userData => {
						if (userData !== undefined) {
							this.setState({
								...this.state,
								userData,
								redirectFlag: true,
								displayProfile: true,
								searchFormData: '',
								profileSearchResult: null
							})
						}
					}))
	};

	unFollowUser = (follow, follower) => {
		userService.unFollowUser(follow, follower)
			.then(response =>
				userService.getUserData(localStorage.getItem("currentUser"))
					.then(userData => {
						this.setState({
							...this.state,
							userData,
							displayProfile: true,
							searchFormData: '',
							profileSearchresult: null
						})
					}))
	};

	changeVisibiltiy = (visibilityValue, eventData) => {
		eventData.isPrivate = visibilityValue;
		let tempData = [];
		EventService.getInstance().updateEvent(eventData)
			.then(response => {
				tempData = Array.from(Object.create(this.state.eventList));
				this.setState({
					...this.state,
					changeVisibiltiyFlag: true,
					eventList: []
				});
				this.setState({
					...this.state,
					changeVisibiltiyFlag: true,
					eventList: tempData,
				});
			});
	};

	updateUser = (firstName, lastName) => {
		let body = {
			_id: this.state.userData._id,
			username: this.state.userData.username,
			firstName: this.state.userData.firstName,
			lastName: this.state.userData.lastName,
			password: this.state.userData.password,
			events: this.state.userData.events,
			followers: this.state.userData.followers,
			following: this.state.userData.following,
			type: this.state.userData.type
		};
		if(typeof firstName !== "undefined") {
			body.firstName = firstName
		};
		if(typeof lastName !== "undefined") {
			body.lastName = lastName
		};
		userService.updateUser(body).then(response => {
			userService.getUserData(body._id).then(userData => {
				console.log("userD: ", userData);
				this.setState({
					...this.state,
					userData
				})
			})
		})

	}

	render() {
		return (
			<React.Fragment>
				{!this.state.userData === undefined && this.state.userData.type === 'ADMIN' && <Redirect to={{pathname: '/admin/'}}/>}
				<div>
					<ProfileNavBar
						renderProfileList={this.renderProfileList}
						searchProfile={true}
						username={localStorage.getItem("currentUser")}/>
					{this.state.displayProfile && !this.state.anonymousUser ?
						<ProfileBody
							updateUser={this.updateUser}
							redirectFlag={this.state.redirectFlag}
							changeVisibiltiyFlag={this.state.changeVisibiltiyFlag}
							profileId={this.state.profileId}
							anonymousUser={this.state.anonymousUser}
							changeVisibiltiy={this.changeVisibiltiy}
							events={this.state.eventList}
							followUser={this.followUser}
							unFollowUser={this.unFollowUser}
							followers={this.state.userData.followers}
							following={this.state.userData.following}
							username={this.state.userData.username}
							firstName={this.state.userData.firstName}
							lastName={this.state.userData.lastName}/>
						:
						<Redirect to={{
							pathname: '/profile-list/',
						}}/>
					}
					<AppFooter/>
				</div>
			</React.Fragment>
		)
	}
}

export default withRoot(Profile)
