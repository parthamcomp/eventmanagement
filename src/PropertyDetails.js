import React, {Component} from 'react';
import TextSearchAPIService from './APIServices/TextSearchAPIService'
import withRoot from "./modules/withRoot";
import SearchBar from "./modules/views/SearchBar";
import DetailsCard from "./modules/components/DetailsCard";
import {Grid} from "@material-ui/core";
import MerakiReviewSearch from "./APIServices/MerakiReviewSearch";

class PropertyDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {placeDetails: {}, merakiRating: null};
		TextSearchAPIService.getInstance()
			.getPlaceDetails(props.match.params.placeId)
			.then(placeDetails => {
				this.setState({placeDetails});
			});
		MerakiReviewSearch.getInstance()
			.getPlaceReview(props.match.params.placeId)
			.then(response => {
				this.setState({
					...this.state,
					merakiRating: response.rating
				});
			})
			.catch(error => true);
	}


	render() {
		return (
			<div>
				<div>
					<SearchBar/>
				</div>
				<div>
					<Grid item lg={12} md={12} sm={12}>
						<DetailsCard
							merakiRating={this.state.merakiRating}
							result={this.state.placeDetails}
							imageHeight={365}
							showBookNow={true}
							showLearnMore={true}/>
					</Grid>
				</div>
			</div>
		)
	}
}

export default withRoot(PropertyDetails);
