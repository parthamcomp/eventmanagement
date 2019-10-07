import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';

const styles = theme => ({
	title: {
		fontSize: 24,
	},
	placeholder: toolbarStyles(theme).root,
	toolbar: {
		justifyContent: 'space-between',
	},
	left: {
		flex: 1,
	},
	leftLinkActive: {
		color: theme.palette.common.white,
	},
	right: {
		flex: 1,
		display: 'flex',
		justifyContent: 'flex-end',
	},
	rightLink: {
		fontSize: 16,
		color: theme.palette.common.white,
		marginLeft: theme.spacing(3),
	},
	linkSecondary: {
		color: theme.palette.secondary.main,
	},
});

function AppAppBar(props) {
	const { classes } = props;

	return (
		<div>
			<AppBar position="fixed">
				<Toolbar className={classes.toolbar}>
					<div className={classes.left} />
					<Link
						variant="h6"
						underline="none"
						color="inherit"
						className={classes.title}
						href="/"
					>
						{'Meraki Events'}
					</Link>
					<div className={classes.right}>
						{!window.localStorage.getItem("currentUser") && <Link
							color="inherit"
							variant="h6"
							underline="none"
							className={classes.rightLink}
							href="/login/"
						>
							{'Sign In'}
						</Link>}
						{!window.localStorage.getItem("currentUser") && <Link
							variant="h6"
							underline="none"
							className={clsx(classes.rightLink, classes.linkSecondary)}
							href="/register/"
						>
							{'Sign Up'}
						</Link>}

						{/*Dynamic Content*/}
						{window.localStorage.getItem("currentUser") && <Link
							color="inherit"
							variant="h6"
							underline="none"
							className={classes.rightLink}
						>
							Followers: {props.followerCount}
						</Link>}
						{window.localStorage.getItem("currentUser") && <Link
							variant="h6"
							underline="none"
							className={clsx(classes.rightLink, classes.linkSecondary)}

						>
							Following: {props.followingCount}
						</Link>}
						<Link
							variant="h6"
							underline="none"
							className={clsx(classes.rightLink, classes.linkSecondary)}
							href="/profile/">
							Profile
						</Link>
						{/*Dynamic Content End*/}

						<Link
							variant="h6"
							underline="none"
							className={clsx(classes.rightLink, classes.linkSecondary)}
							href="/search"
						>
							{'Search'}
						</Link>
					</div>
				</Toolbar>
			</AppBar>
			<div className={classes.placeholder} />
		</div>
	);
}

AppAppBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
