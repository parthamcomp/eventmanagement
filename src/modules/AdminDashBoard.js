import React, {Component} from 'react'
import UserService from "../APIServices/UserService";
import {Grid} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import RemoveIcon from "@material-ui/icons/RemoveCircleRounded"
import withStyles from "@material-ui/core/styles/withStyles";
import ProfileNavBar from "./views/ProfileNavBar";
import {Redirect} from "react-router-dom";
import Snackbar from "./components/Snackbar";

const userService = UserService.getInstance();

const style = theme => ({
	card: {
		marginTop: theme.spacing(2),
		width: "100%",
		backgroundColor: "#eceff1"
	}
});

class AdminDashBoard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userList: [],
			redirect: true,
			open: false
		}
	}


	handleClose = () => {
		this.setState({...this.state, open: false});
	}

	componentDidMount() {

		userService.getTotalUsers().then(response => {
			this.setState({
				userList: response.filter(user => user.type !== 'ADMIN')
			});
		});
	}

	deleteUser(username) {
		userService.deleteUser(username)
			.then(response =>
				userService.getTotalUsers()
					.then(response =>
						this.setState(
							{
								open: true,
								userList: response.filter(user => user.type !== 'ADMIN')
							}
						)
					)
			)
	}

	renderProfileList = (flag) => {
		this.setState({
			...this.state,
			redirect: flag
		});
	}

	render() {
		const {classes} = this.props;
		return (
			<React.Fragment>
				{!this.state.redirect && <Redirect to={'/profile-list/'}/>}
				<ProfileNavBar
					renderProfileList={this.renderProfileList}
					searchProfile={true}
					username={localStorage.getItem("currentUser")}/>
				<Grid
					container
					direction={"row"}
					alignContent={"center"}
					alignItems={"center"}>
					<Grid item sm={12} md={12} lg={12} xl={12}>
						<Grid container spacing={2}>
							<Grid item xs={6} sm={6} md={2} lg={2}>
								<Box p={3} fontWeight={"fontWeightBold"}>
									<Typography align={"justify"} variant={"body1"} component={"p"}>
										User Name
									</Typography>
								</Box>
							</Grid>
							<Hidden smDown xsDown>
								<Grid item sm={2} md={2} lg={2}>
									<Box p={3}>
										<Typography align={"justify"} variant={"body1"} component={"p"}>
											FirstName
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
											ProfileId
										</Typography>
									</Box>
								</Grid>
							</Hidden>
							<Hidden smDown xsDown>
								<Grid item sm={2} md={2} lg={2}>
									<Box p={3}>
										<Typography align={"justify"} variant={"body1"} component={"p"}>
											Event Count
										</Typography>
									</Box>
								</Grid>
							</Hidden>
							<Grid item xs={6} sm={6} md={2} lg={2}>
								<Box p={3}>
									<Typography align={"justify"} variant={"body1"} component={"p"}>
										Delete User
									</Typography>
								</Box>
							</Grid>
						</Grid>
					</Grid>
					{
						this.state.userList.map((user, index) => (
								<Card key={index} className={classes.card}>
									<CardContent>
										<Grid item sm={12} md={12} lg={12} xl={12}>
											<Grid container spacing={2}>
												<Grid item xs={6} sm={6} md={2} lg={2}>
													<Box p={3} fontWeight={"fontWeightBold"}>
														<Typography align={"justify"} variant={"body1"} component={"p"}>
															{user.username}
														</Typography>
													</Box>
												</Grid>
												<Hidden smDown xsDown>
													<Grid item sm={2} md={2} lg={2}>
														<Box p={3}>
															<Typography align={"justify"} variant={"body1"} component={"p"}>
																{user.firstName}
															</Typography>
														</Box>
													</Grid>
												</Hidden>
												<Hidden smDown xsDown>
													<Grid item sm={2} md={2} lg={2}>
														<Box p={3}>
															<Typography align={"justify"} variant={"body1"} component={"p"}>
																{user.lastName}
															</Typography>
														</Box>
													</Grid>
												</Hidden>
												<Hidden smDown xsDown>
													<Grid item sm={2} md={2} lg={2}>
														<Box p={3}>
															<Typography align={"justify"} variant={"body1"} component={"p"}>
																{user._id}
															</Typography>
														</Box>
													</Grid>
												</Hidden>
												<Hidden smDown xsDown>
													<Grid item sm={2} md={2} lg={2}>
														<Box p={3}>
															<Typography align={"justify"} variant={"body1"} component={"p"}>
																{user.events.length}
															</Typography>
														</Box>
													</Grid>
												</Hidden>
												<Grid item xs={6} sm={6} md={2} lg={2}>
													<Box p={3} onClick={(username) => this.deleteUser(user.username)}>
														<RemoveIcon>
														</RemoveIcon>
													</Box>
												</Grid>
											</Grid>
										</Grid>
									</CardContent>
								</Card>
							)
						)
					}
				</Grid>
				<Snackbar
					open={this.state.open}
					onClose={this.handleClose}
					message={'Deletion successful'}
				/>
			</React.Fragment>
		);
	}
}

export default withStyles(style)(AdminDashBoard);
