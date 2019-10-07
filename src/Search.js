import React, {Component} from "react"
import withRoot from './modules/withRoot';
import SearchBar from "./modules/views/SearchBar";
import TextSearchAPIService from './APIServices/TextSearchAPIService'
import SearchResult from './modules/views/SearchResult'
import Grid from "@material-ui/core/Grid";

class Search extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchFormData: '',
			searchDataFromPlacesAPI: []
		};
	}

	changeField = (evt) => {
		/*This function keeps a track of the data inserted in the textfield of the search page.*/
		this.setState({
			searchFormData: evt.target.value
		})
	};

	search = () => {
		/*Takes in the data entered in the Text-field of the search page and then calls the service that fetches the
		 property details for the details supplied.
		 Also, updates the state once the required data is retrieved from the service. */
		TextSearchAPIService.getInstance().findPlaces(this.state.searchFormData)
			.then(places => {
				this.setState({
					searchDataFromPlacesAPI: places.predictions
				});
			});
	};

	render() {
		return (
			<div>
				<div>
					<SearchBar searchBoxData={this.state.searchFormData}
					           changeField={this.changeField}
					           search={this.search}/>
				</div>
				<div className={"container"}>
					<Grid alignContent={"center"}
					      container
					      spacing={3}
					      justify={"flex-start"}>
						<SearchResult autoCompleteResults={this.state.searchDataFromPlacesAPI}/>
					</Grid>
				</div>
			</div>
		)
	}
}

export default withRoot(Search);
