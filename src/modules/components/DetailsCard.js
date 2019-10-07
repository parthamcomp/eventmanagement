import React from 'react'
import {Card, makeStyles} from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Link} from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import Rating from 'react-rating'
import Snackbar from "./Snackbar";

const styleCustom = makeStyles({
	/*Set the css property for the card to be rendered after retrieval of the data from the back-end service.*/
	card: {
		margin: 10,
		padding: 10,
	},
	link: {
		textDecoration: "none",
		color: "black",
	}
});

/*Stateless component that renders the card with the information obtained from the parent component.*/
const DetailsCard = ({
	                     result,
	                     imageHeight,
	                     showLearnMore,
	                     merakiRating,
	                     showBookNow

                     }) => {
	const [open, setOpen] = React.useState(true);
	const classes = styleCustom();
	return (
		<React.Fragment>
			<Card raised
			      margin={2}
			      className={classes.card}>
				<Link className={classes.link} to={`/property/${result.place_id}/`}>
					<CardActionArea>
						<CardMedia
							height={imageHeight}
							component="img"
							alt={result["name"]}
							image="https://picsum.photos/id/870/500/500?"
							title={result["name"]}/>
						<CardContent>
							<Grid container justify={"space-between"}>
								<Grid item>
									<Typography variant={"body1"} component={"p"}>
										{result["name"]}
									</Typography>
								</Grid>
								<Grid item>
									{
										showLearnMore &&
										<Grid container spacing={1} direction={"row"} justify={"space-between"}>
											<Grid item>
												<Typography variant={"body1"} component={"p"}>
													Google Rating:
												</Typography>
											</Grid>
											<Grid item>
												<Rating initialRating={result["rating"]}
												        readonly
												        stop={5}
												        emptySymbol={['fa fa-star-o  red']}
												        fullSymbol={['fa fa-star  red']}/>
											</Grid>
										</Grid>
									}
								</Grid>
							</Grid>
							<Grid container justify={"space-between"}>
								<Grid item>
									<Typography gutterBottom
									            variant="body1"
									            component="p">
										{result["description"] ? result["description"] : result["formatted_address"]}
									</Typography>
								</Grid>
								{
									merakiRating &&
									<Grid item>
										<Grid container spacing={1} direction={"row"} justify={"space-between"}>
											<Grid item>
												<Typography variant={"body1"} component={"p"}>
													Meraki Rating:
												</Typography>
											</Grid>
											<Grid item>
												<Rating initialRating={merakiRating}
												        readonly
												        stop={5}
												        emptySymbol={['fa fa-star-o  red']}
												        fullSymbol={['fa fa-star  red']}/>
											</Grid>
										</Grid>
									</Grid>
								}
							</Grid>
						</CardContent>
					</CardActionArea>
				</Link>
				<CardActions>
					{window.localStorage.getItem("currentUser") && showBookNow &&
					<Link to={{pathname: '/book-now/', hotelData: result}} className={classes.link}>
						<Button size="small"
						        className={classes.link}
						        color="primary">
							Book Now
						</Button>
					</Link>
					}
					{
						!window.localStorage.getItem("currentUser") && showBookNow &&
						<Snackbar
							open={open}
							onClose={(flag) => setOpen(false)}
							message="Please register to gain access to register an event."
						/>
					}
					{!showLearnMore &&
					<Link className={classes.link} to={`/property/${result.place_id}/`}>
						<Button size="small"
						        className={classes.link}
						        color="primary">
							Learn More
						</Button>
					</Link>}
				</CardActions>
			</Card>

		</React.Fragment>
	);
};

export default DetailsCard;
