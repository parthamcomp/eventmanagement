import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import {CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

function getModalStyle() {
	const top = window.screen.availHeight / 20;
	const left = window.screen.availHeight / 20;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles(theme => ({
	dataPanel: {
		marginTop: 8
	},
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[20],
		padding: theme.spacing(2, 4, 4),
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 300
	}
	,
	modalButton: {
		alignContent: 'left',
		alignItems:'left',
		width: 100
	},
	modalButton2: {
		alignContent: 'left',
		alignItems:'left',
		width: 100,
		marginRight: theme.spacing(1)
	}

}));

const Demographics = ({username, firstName, lastName, updateUser, flag}) => {

	const classes = useStyles();
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);
	const [values, setValues] = React.useState({
		firstName: firstName,
		lastName: lastName
	});

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Grid item xs={12} sm={12} md={12} lg={12}>
				<Card>
					<CardActionArea>
						<CardMedia
							component="img"
							alt="Profile Picture"
							height="140"
							image="https://picsum.photos/200/300"
							title="Profile Picture"
						/>
						<CardContent>
							{
								/*This code iterates over the json data directly thereby eliminating the need to pass props separately.*/
								<React.Fragment>
									<Grid className={classes.dataPanel} item xs={12} sm={12} md={12} lg={12}>
										<Typography
											display={"initial"}
											align={"justify"}
											gutterBottom={false}
											variant={"body1"}
											component={"p"}>
											{username}
										</Typography>
									</Grid>
									<Grid className={classes.dataPanel} item xs={12} sm={12} md={12} lg={12}>
										<Typography
											display={"initial"}
											align={"justify"}
											gutterBottom={false}
											variant={"body1"}
											component={"p"}>
											{firstName}
										</Typography>
									</Grid>
									<Grid className={classes.dataPanel} item xs={12} sm={12} md={12} lg={12}>
										<Typography
											display={"initial"}
											align={"justify"}
											gutterBottom={false}
											variant={"body1"}
											component={"p"}>
											{lastName}
										</Typography>
									</Grid>

								</React.Fragment>}
						</CardContent>
					</CardActionArea>
					<CardActions>
						{
							flag &&
							<Button onClick={() => handleOpen()}>
								Edit
							</Button>
						}
					</CardActions>
				</Card>
			</Grid>

			{/*Modal component start.*/}
			<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={open}
				onClose={handleClose}
			>
				<div style={modalStyle} className={classes.paper}>
					<h2 id="simple-modal-title">Edit Personal Information</h2>
					<TextField
						id="standard-name"
						label="First Name"
						className={classes.textField}
						defaultValue={firstName}
						onChange={(event) => setValues({...values, "firstName": event.target.value})}
						margin="normal"
					/>
					<TextField
						id="standard-name2"
						label="Last Name"
						className={classes.textField}
						defaultValue={lastName}
						onChange={(event) => setValues({...values, "lastName": event.target.value})}
						margin="normal"
					/>
					<Grid container direction={"row"} style={{"marginRight":"5"}}>
						<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
							<Button onClick={(firstName, lastName) => updateUser(values.firstName, values.lastName)}
							        className={classes.modalButton}>
								Save
							</Button>
						</Grid>
						<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
							<Button onClick={() => handleClose()}
							        className={classes.modalButton2}>
								Close
							</Button>
						</Grid>
					</Grid>
				</div>
			</Modal>
			{/*Modal component end.*/}
		</React.Fragment>
	);
};

export default Demographics;

