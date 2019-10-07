import React, {Component} from 'react';
import {Grid} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {Link, Redirect} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import AddIcon from "@material-ui/icons/AddCircle"
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import withStyles from "@material-ui/core/styles/withStyles";
import ProfileNavBar from "../views/ProfileNavBar";
import UserService from "../../APIServices/UserService";
import Snackbar from "./Snackbar";


const userService = UserService.getInstance();

const styles = makeStyles(theme => ({
	profileName: {
		textDecoration: "none",
		color: 'black'
	},
	cardGrid: {
		width: "100%"
	},
	iconButton: {
		float: 'right'
	},
	dataGrid: {
		marginTop: theme.spacing(10)
	}
}));

class ProfileList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResult: null,
			searchFormData: '',
			profileSearchResult: [],
			redirect: false,
			open: false
		}
	}

	renderProfileList = (formData) => {
		this.setState({
			...this.state,
			searchFormData: formData
		}, () => {
			this.generateProfileList()
		});
	};

	generateProfileList() {
		if ((this.state.searchFormData !== '')) {
			userService.getProfileSearchResult(this.state.searchFormData).then(response => {
				if (response !== undefined) {
					this.setState({
						...this.state,
						profileSearchResult: [response],
						searchFormData: ''
					});
				}
			});
		}
	};

	handleClose = () => {
		this.setState({...this.state, open: false});
	}

	followUser = (follow, follower) => {

		if (!window.localStorage.getItem("currentUser")) {
			this.setState({
				...this.state,
				open: true
			});
			return;
		}
		userService.followUser(follow, follower)
			.then(response =>
				userService.getUserData(localStorage.getItem("currentUser"))
					.then(userData => {
						if (userData !== undefined) {
							this.setState({
								...this.state,
								redirect: true
							})
						}
					}));
	};

	render() {
		const {classes} = this.props;
		return (
			<React.Fragment>
				{this.state.redirect && <Redirect to={'/profile'}/>}
				<ProfileNavBar
					renderProfileList={this.renderProfileList}
					changeField={this.changeField}
					searchProfile={false}
					username={localStorage.getItem("currentUser")}/>
				{/*Render the column names inside a card.*/}
				<Grid style={{"marginTop":"100"}} item sm={12} md={12} lg={12} xl={12}>
					<Grid container spacing={2}>
						<Grid item xs={6} sm={6} md={2} lg={2}>
							<Box p={3} fontWeight={"fontWeightBold"}>
								<Typography align={"justify"} variant={"body1"} component={"p"}>
									Username
								</Typography>
							</Box>
						</Grid>
						<Hidden smDown xsDown>
							<Grid item sm={2} md={2} lg={2}>
								<Box p={3}>
									<Typography align={"justify"} variant={"body1"} component={"p"}>
										First Name
									</Typography>
								</Box>
							</Grid>
						</Hidden>
						<Hidden smDown xsDown>
							<Grid item sm={2} md={2} lg={2}>
								<Box p={3}>
									<Typography align={"justify"} variant={"body1"} component={"p"}>
										Last Name
									</Typography>
								</Box>
							</Grid>
						</Hidden>
						<Hidden smDown xsDown>
							<Grid item sm={2} md={2} lg={2}>
								<Box p={3}>
									<Typography align={"justify"} variant={"body1"} component={"p"}>
										Total Followers
									</Typography>
								</Box>
							</Grid>
						</Hidden>
						<Hidden smDown xsDown>
							<Grid item sm={2} md={2} lg={2}>
								<Box p={3}>
									<Typography align={"justify"} variant={"body1"} component={"p"}>
										Total Following
									</Typography>
								</Box>
							</Grid>
						</Hidden>
						<Grid item xs={6} sm={6} md={2} lg={2}>
							<Box p={3}>
								<Typography align={"justify"} variant={"body1"} component={"p"}>
									Follow
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</Grid>

				{/*Render the data inside relevant column of the entire grid.*/}
				<Grid
					item
					className={classes.dataGrid}
					xs={12}
					sm={12}
					md={12}
					lg={12}>
					{
						(this.state.profileSearchResult !== null) &&
						this.state.profileSearchResult.map((result, index) => (
								<Card key={index} className={classes.eventCard}>

									<Grid container spacing={2}>
										<Grid item xs={6} sm={6} md={2} lg={2}>
											<Box p={3}>
												<Typography align={"justify"} variant={"body1"} component={"p"}>
													<Link to={`/profile/${result._id}`}
													      className={classes.profileName}>{result.username}</Link>
												</Typography>
											</Box>
										</Grid>
										<Hidden smDown xsDown>
											<Grid item sm={2} md={2} lg={2}>
												<Box p={3}>
													<Typography align={"justify"} variant={"body1"} component={"p"}>
														{result.firstName}
													</Typography>
												</Box>
											</Grid>
										</Hidden>
										<Hidden smDown xsDown>
											<Grid item sm={2} md={2} lg={2}>
												<Box p={3}>
													<Typography align={"justify"} variant={"body1"} component={"p"}>
														{result.lastName}
													</Typography>
												</Box>
											</Grid>
										</Hidden>
										<Hidden smDown xsDown>
											<Grid item sm={2} md={2} lg={2}>
												<Box p={3}>
													{result.followers.length}
												</Box>
											</Grid>
										</Hidden>
										<Hidden smDown xsDown>
											<Grid item sm={2} md={2} lg={2}>
												<Box p={3}>
													{result.following.length}
												</Box>
											</Grid>
										</Hidden>
										<CardActions>
											<Grid item xs={6} sm={6} md={2} lg={2}>
												<Box p={3}>
													<Button
														onClick={(follow, follower) => this.followUser(result._id, window.localStorage.getItem("currentUser"))}>
														<AddIcon>
														</AddIcon>
													</Button>
												</Box>
											</Grid>
										</CardActions>
									</Grid>
								</Card>
							)
						)
					}
				</Grid>
				<Snackbar
					open={this.state.open}
					onClose={this.handleClose}
					message="Please login or register to follow the user."
				/>
			</React.Fragment>
		);
	}
};

export default withStyles(styles)(ProfileList);
