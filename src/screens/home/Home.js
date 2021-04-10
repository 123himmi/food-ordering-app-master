import React, { Component } from 'react';
import Header from '../../common/header/Header';
//import { Route, Link } from 'react-router-dom';
import * as Utils from "../../common/Utils";
import * as Constants from "../../common/Constants";
import { withStyles } from "@material-ui/core/styles";
import './Home.css';


const styles = {
    resCard: { width: "90%", cursor: "pointer" }
};

class Home extends Component {

    constructor() {
        super();
        this.state = {
            imageData: [],
            data: []
        }
    }

    componentDidMount() {
    }

    
    //Logout action from drop down menu on profile icon
    loginredirect = () => {
        sessionStorage.clear();
        this.props.history.push({
            pathname: "/"
        });
        window.location.reload();
    }

    // Restaurant search by name
    searchRestaurantsByName = event => {
        const searchValue = event.target.value;
        const requestUrl = this.props.baseUrl + "restaurant/name/" + searchValue;
        const that = this;
        if (!Utils.isEmpty(searchValue)) {
            Utils.makeApiCall(
                requestUrl,
                null,
                null,
                Constants.ApiRequestTypeEnum.GET,
                null,
                responseText => {
                    that.setState(
                        {
                            imageData: JSON.parse(responseText).restaurants
                        }
                    );
                },
                () => { }
            );
        } 
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header logoutHandler={this.loginredirect} baseUrl={this.props.baseUrl} searchRestaurantsByName={this.searchRestaurantsByName} showSearch={true} history={this.props.history} />
            </div>
        )
    }
}

export default withStyles(styles)(Home);