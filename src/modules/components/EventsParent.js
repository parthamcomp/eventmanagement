import React, {Component} from 'react';
import {Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Events from "./Events";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
	paper: {
		padding: theme.spacing(1),
		margin: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		marginTop: 5,
		marginRight: 0,
	}
});

const defaultState = {
	upcomingEvents: [],
	pastEvents: [],
	eventLength:0,
	changeVisibiltiy: null,
	flag: true
};

class EventsParent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...defaultState,
			eventLength: this.props.events.length,
			changeVisibiltiy: this.props.changeVisibiltiy,
			flag: this.props.flag
		}
	}

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		if(nextProps.events.length !== this.state.eventLength){
			this.setState({
				...this.state,
				eventLength: nextProps.events.length,
				upcomingEvents: nextProps.events
					.filter(event =>  (new Date(event.date) > new Date()))
					.filter(event => (!this.state.flag) ?((!event.isPrivate) ? event: null): event)
					,
				pastEvents:nextProps.events
					.filter(event =>  (new Date(event.date) < new Date()) && event !== {})
					.filter(event => (!this.state.flag) ?((!event.isPrivate) ? event: null): event),
			});
			return true;
		}
		if (nextProps.changeVisibiltiyFlag){
			return true;
		}
		return false;
	}

	render() {
		const {classes} = this.props;
		return (
			<React.Fragment>
				<Paper className={classes.paper}>
					<Grid container>
							<Events
								flag={this.state.flag}
								changeVisibiltiy={this.state.changeVisibiltiy}
								events={this.state.upcomingEvents}
								section={"Upcoming Events"}/>
					</Grid>
				</Paper>
				<Paper elevation={2} className={classes.paper}>
					<Grid container>
							<Events
								flag={this.state.flag}
								changeVisibiltiy={this.state.changeVisibiltiy}
								events={this.state.pastEvents}
								section={"Past Events"}/>
					</Grid>
				</Paper>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(EventsParent);
