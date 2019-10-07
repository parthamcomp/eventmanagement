import React, {Component} from 'react'
import AppForm from "./modules/views/AppForm";
import Typography from "./modules/components/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormButton from "./modules/form/FormButton";
import Snackbar from "./modules/components/Snackbar";
import AppFooter from "./modules/views/AppFooter";
import withRoot from "./modules/withRoot";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {Home} from "@material-ui/icons";
import {Email} from "@material-ui/icons";
import {ContactPhone} from "@material-ui/icons";
import {Group} from "@material-ui/icons";
import {Event} from "@material-ui/icons"
import {EventNote} from "@material-ui/icons";
import {DateRange} from "@material-ui/icons";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import EventRegistrationRequestService from "./APIServices/EventRegistrationRequestService";
import ProfileNavBar from "./modules/views/ProfileNavBar";
import {Redirect} from "react-router-dom";

const eventRegistrationRequest = EventRegistrationRequestService.getInstance();

const stateBody = {
	propertyAddress: '',
	propertyName: '',
	username: window.localStorage.getItem("currentUser"),
	dateOfEvent: new Date(),
	email: '',
	contactNumber: 1234567893,
	numberOfPeopleExpected: 0,
	eventName: '',
	eventDescription: '',
	loading: false,
	open: false,
	redirect: false
};

const styles = theme => ({
	form: {
		marginTop: theme.spacing(6),
	},
	button: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),
	},
	feedback: {
		marginTop: theme.spacing(2),
	},
});

class EventRegistration extends Component {

	constructor(props) {
		super(props);
		console.log("data: ", this.props.location.hotelData);
		this.state = {
			...stateBody,
			propertyName: this.props.location.hotelData.name,
			propertyAddress: this.props.location.hotelData.formatted_address
		}

	};

	handleEmailChange = (email) => {
		this.setState({
			email: email
		})
	};

	handleContactNumberChange = (contactNumber) => {
		this.setState({
			contactNumber: contactNumber
		})
	};

	handleEventNameChange = (eventName) => {
		this.setState({
			eventName: eventName
		})
	};

	handleEventDescriptionChange = (eventDescription) => {
		this.setState({
			eventDescription: eventDescription
		})
	};
	handleNumberOfPeople = (numberOfPeople) => {
		this.setState({
			numberOfPeopleExpected: numberOfPeople
		})
	};

	handleSubmit = () => {
		console.log("state in form: ", this.state);
		eventRegistrationRequest.createEventRegistrationRequest(this.state).then(response => {
			this.setState({
				...this.state,
				open: true
			})
		})
	};

	handleClose = () => {
		this.setState({ ...this.state, open: false });
	};

	renderProfileList = (flag) =>{
		this.setState({
			...this.state,
			redirect: !flag
		})
	}


	render() {
		const {classes} = this.props;
		return (
			<React.Fragment>
				{this.state.redirect && <Redirect to={'/profile-list/'}/>}
				<ProfileNavBar
					renderProfileList={this.renderProfileList}
					searchProfile={true}
					username={localStorage.getItem("currentUser")}/>
				<AppForm>

					<Typography variant="h3" gutterBottom marked="center" align="center">
						Register Event
					</Typography>
					<Grid container spacing={1} alignItems="flex-end">
						<Grid item xs={12} sm={12} md={12} lg={12}>
							<Grid container spacing={1} alignItems="flex-end">
								<Grid item xs={1} sm={1} md={1} lg={1}>
									<Home/>
								</Grid>
								<Grid item xs={11} sm={11} md={11} lg={11}>
									<TextField
										disabled
										fullWidth
										value={this.state.propertyName}
										label="Property Name"
										margin="normal"/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={12} md={12} lg={12}>
							<Grid container spacing={1} alignItems="flex-end">
								<Grid item xs={1} sm={1} md={1} lg={1}>
									<Home/>
								</Grid>
								<Grid item xs={11} sm={11} md={11} lg={11}>
									<TextField
										disabled
										fullWidth
										value={this.state.propertyAddress}
										label="Address"
										margin="normal"/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={12} md={12} lg={12}>
							<Grid container spacing={1} alignItems="flex-end">
								<Grid item xs={1} sm={1} md={1} lg={1}>
									<Email/>
								</Grid>
								<Grid item xs={11} sm={11} md={11} lg={11}>
									<TextField
										onChange={(evt) => this.handleEmailChange(evt.target.value)}
										fullWidth
										value={this.state.email}
										label="Email"
										margin="normal"/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={12} md={12} lg={12}>
							<Grid container spacing={1} alignItems="flex-end">
								<Grid item xs={1} sm={1} md={1} lg={1}>
									<ContactPhone/>
								</Grid>
								<Grid item xs={11} sm={11} md={11} lg={11}>
									<TextField
										onChange={(evt) => this.handleContactNumberChange(evt.target.value)}
										fullWidth
										value={this.state.contactNumber}
										label="Contact Number"
										margin="normal"/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={12} md={12} lg={12}>
							<Grid container spacing={1} alignItems="flex-end">
								<Grid item xs={1} sm={1} md={1} lg={1}>
									<Event/>
								</Grid>
								<Grid item xs={11} sm={11} md={11} lg={11}>
									<TextField
										onChange={(evt) => this.handleEventNameChange(evt.target.value)}
										fullWidth
										defaultValue={this.state.eventName}
										label="Event Name"
										margin="normal"/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={12} md={12} lg={12}>
							<Grid container spacing={1} alignItems="flex-end">
								<Grid item xs={1} sm={1} md={1} lg={1}>
									<EventNote/>
								</Grid>
								<Grid item xs={11} sm={11} md={11} lg={11}>
									<TextField
										onChange={(evt) => this.handleEventDescriptionChange(evt.target.value)}
										fullWidth
										rowsMax={3}
										value={this.state.eventDescp}
										label="Describe the event in approx 100 words"
										margin="normal"/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={12} md={12} lg={12}>
							<Grid container spacing={1} alignItems="flex-end">
								<Grid item xs={1} sm={1} md={1} lg={1}>
									<Group/>
								</Grid>
								<Grid item xs={11} sm={11} md={11} lg={11}>
									<TextField
										onChange={(evt) => this.handleNumberOfPeople(evt.target.value)}
										fullWidth
										value={this.state.numberOfPeopleExpected}
										label="Number of People Expected"
										margin="normal"/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={12} md={12} lg={12}>
							<Grid container spacing={1} alignItems="flex-end">
								<Grid item xs={1} sm={1} md={1} lg={1}>
									<DateRange/>
								</Grid>
								<Grid item xs={11} sm={11} md={11} lg={11}>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											margin="normal"
											id="date-picker-dialog"
											label="Date picker dialog"
											format="MM/dd/yyyy"
											value={this.state.dateOfEvent}
											onChange={(date) => this.setState({dateOfEvent: date})}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
										/>
									</MuiPickersUtilsProvider>
								</Grid>
							</Grid>
						</Grid>


						<FormButton
							className={classes.button}
							onClick={this.handleSubmit}
							size="large"
							color="secondary"
							fullWidth>
							{this.state.loading ? 'Submiting' : 'Submit Request'}
						</FormButton>
						<Snackbar
							open={this.state.open}
							onClose={this.handleClose}
							message="Request sent. We will contact you shortly."
						/>
					</Grid>
				</AppForm>
				<AppFooter/>
			</React.Fragment>
		);
	}
}

EventRegistration.propTypes = {
	classes: PropTypes.object.isRequired,
};

const compose = (...funcs) => {
	return funcs.reduce((a, b) => (...args) => a(b(...args)), arg => arg);
}

export default compose(
	withRoot,
	withStyles(styles),
)(EventRegistration);


