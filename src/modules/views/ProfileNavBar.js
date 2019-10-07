import React, {useState} from 'react';
import {styles as toolbarStyles} from "../components/Toolbar";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {AppBar, TextField} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {Link} from 'react-router-dom'
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import Grid from "@material-ui/core/Grid";
import {fade} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';

const styles = theme => ({

	appBar: {
		backgroundColor: "black"
	},
	title: {
		fontSize: 16,
		color: 'white',
		textDecoration: "none",
	},
	placeholder: toolbarStyles(theme).root,
	toolbar: {
		justifyContent: 'space-between'
	},
	left: {
		flex: 2,

	},
	leftLinkActive: {
		color: theme.palette.common.white,
	},
	leftSmall: {
		flex: 1,
		display: 'flex',
	},
	button: {
		margin: theme.spacing(1),
	},

	searchProfile: {
		flex: 1,
		marginLeft: theme.spacing(70),
		textAlign: 'justify'
	},
	link: {
		textDecoration: 'none',
		color: 'black'
	},
	userName: {
		color: 'white',
		marginTop: theme.spacing(1)
	},
	userName2: {
		color: 'white',
	},
	arrowDownIcon: {
		color: "white"
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 7),
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('lg')]: {
			width: 200,
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		width: theme.spacing(7),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	textField: {
		backgroundColor: fade(theme.palette.common.white, 0.50),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.65),
		},
		borderRadius: "0.2em 0.2em 0.3em 0.3em "
	},
	rightLink: {
		color: theme.palette.common.white
	},
	linkSecondary: {
		color: theme.palette.secondary.main,
	},
	icon: {
		margin: theme.spacing(1),
		fontSize: 40,

	},
	companyTitle: {
		marginTop: theme.spacing(1)
	}
});

const ProfileNavBar = (props) => {
	const {classes} = props;

	const [anchorEl, setAnchorEl] = useState(null);
	const [formData, setFormData] = useState('');

	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function redirectToProfile() {
		setAnchorEl(null);
	}

	return (
		<div>
			<AppBar className={classes.appBar} position={"static"}>
				<Toolbar className={classes.toolbar}>
					{/*goal: w/o login 3 component; with login 4 component*/}
					<Grid container direction={"row"}>
						{/*permanent component: meraki events*/}
						<Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
							<Link
								underline="none"
								color="inherit"
								className={classes.title}
								to={"/"}>
								<Typography variant={"h5"}
								            align={"justify"}
								            className={classes.companyTitle}
								            color={"initial"}>
									{'Meraki Events'}
								</Typography>
							</Link>
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
							{!props.searchProfile ?
								<React.Fragment>
									<Grid container direction={"row"}>
										{/*permanent component: profile search field.*/}
										<Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
											<TextField
												id="filled-search"
												label="Search User by ID"
												autoFocus={false}
												type="text"
												fullWidth
												margin={"dense"}
												className={classes.textField}
												variant={"filled"}
												value={formData}
												onChange={(event) => setFormData(event.target.value)}
											/>
										</Grid>
										{/*permanent component: search button*/}
										<Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
											<Grid item
											     onClick={(data) => props.renderProfileList(formData)}>
												<Button size={"small"}>
													<SearchIcon
														className={clsx(classes.rightLink, classes.linkSecondary, classes.icon)}>
													</SearchIcon>
												</Button>
											</Grid>
										</Grid>
									</Grid>
								</React.Fragment>
								:
								<React.Fragment>
									<Grid container alignContent={"center"} alignItems={"center"} direction={"row"}>
										<Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
										</Grid>
										<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
											<Button
												onClick={(flag) => props.renderProfileList(false)}
												className={classes.userName}>SEARCH PROFILE
											</Button>
										</Grid>
									</Grid>
								</React.Fragment>}

						</Grid>
						{/*component to be displayed only if user is logged in.*/}
						<Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
							{window.localStorage.getItem("currentUser") &&
							<Grid item className={classes.right}>
								<Button
									aria-controls="simple-menu"
									className={classes.button}
									aria-haspopup="true"
									onClick={handleClick}>
									<Typography
									            align={"justify"}
									            className={classes.userName2}
									            gutterBottom={false}
									            variant={"subtitle2"}
									            component={"p"}>
										{props.username}
									</Typography>
									<ArrowDropDownIcon className={classes.arrowDownIcon}>
									</ArrowDropDownIcon>
								</Button>
								<Menu
									id="simple-menu"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'center',
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'center',
									}}
									getContentAnchorEl={null}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={redirectToProfile}>
									<MenuItem>
										<Link className={classes.link} to={'/profile'}>My account
										</Link>
									</MenuItem>
									<MenuItem>
										<Link className={classes.link}
										      to={{
											      pathname: '/login/',
											      clearData: true
										      }}>Logout
										</Link>
									</MenuItem>
								</Menu>
							</Grid>}
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</div>
	);
};
ProfileNavBar.propTypes = {
	classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ProfileNavBar);


