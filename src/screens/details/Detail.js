import React, { Component } from 'react';
import './Detail.css';
import { Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/fontawesome-free-solid';
import { faStopCircle } from '@fortawesome/fontawesome-free-solid';
import { Card } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';

class Detail extends Component {

    constructor() {
        super();
        this.state = {
            restaurantDetails: {},
            base_url: "http://localhost:8081/api/restaurant/1dd86f90-a296-11e8-9a3a-720006ceb890",
            loading: false,
            cartitemscount: 0,
            cartitems: [],
            totalamount: 0,
            openstatus: true,
            statusmessage: "Please add items to your cart !",
            statustimeduration: 3000
        }
    }

    componentWillMount() {
        // Get upcoming movies
        let varRestaurantDetails = "";
        let that = this;
        let data = null;
        let xhr = new XMLHttpRequest();
        this.setState({ loading: true });
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                varRestaurantDetails = JSON.parse(this.responseText);
                that.setState({ restaurantDetails: varRestaurantDetails, loading: false });
            }
        });
        xhr.open("GET", this.state.base_url);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }

    addItemsToCart = (item) => {
        var tmpitem = { "id": item.id, "item_name": item.item_name, "price": item.price, "item_type": item.item_type, "item_count": 1 };
        var tmpitemslist = this.state.cartitems;
        var tmpcartitemscount = this.state.cartitemscount;
        var tmptotalamount = this.state.totalamount + tmpitem.price;
        var itemexists = false;
        var tmpmessage = "";
        tmpitemslist.forEach(function (item, index, object) {
            if (item.id === tmpitem.id) {
                itemexists = true;
                item.item_count = item.item_count + 1;
                tmpmessage = "Item quantity increased by 1 !";
            }
        });
        if (itemexists === false) {
            tmpitemslist.push(tmpitem);
            tmpcartitemscount = tmpcartitemscount + 1;
            tmpmessage = "Item added to cart !";
        }

        this.setState({ statusmessage: tmpmessage });
        this.setState({ cartitems: tmpitemslist });
        this.setState({ totalamount: tmptotalamount });
        this.setState({ cartitemscount: tmpcartitemscount });
        this.setState({ openstatus: true });
        this.setState({ statustimeduration: 500 });
    }

    decreaseItemCount = (id) => {
        var tmpcartitems = this.state.cartitems;
        var tmptotalamount = this.state.totalamount;
        var tmpcartitemscount = this.state.cartitemscount;
        var tmpmessage = "";
        tmpcartitems.forEach(function (item, index, object) {
            if (item.id === id) {
                item.item_count = item.item_count - 1;
                tmptotalamount = tmptotalamount - item.price;
                tmpmessage = "Item quantity decreased by 1 !";
            }
            if (item.item_count <= 0) {
                object.splice(index, 1);
                tmpcartitemscount = tmpcartitemscount - 1;
                tmpmessage = "Item removed from cart !";
            }
        });
        this.setState({ totalamount: tmptotalamount });
        this.setState({ cartitemscount: tmpcartitemscount });
        this.setState({ cartitems: tmpcartitems });
        this.setState({ statusmessage: tmpmessage });
        this.setState({ openstatus: true });
        this.setState({ statustimeduration: 500 });
    }

    increaseItemCount = (id) => {
        var tmpcartitems = this.state.cartitems;
        var tmptotalamount = this.state.totalamount;
        var tmpmessage = "";
        tmpcartitems.forEach(function (item, index, object) {
            if (item.id === id) {
                item.item_count = item.item_count + 1;
                tmptotalamount = tmptotalamount + item.price;
                tmpmessage = "Item quantity increased by 1 !";
            }
        });
        this.setState({ cartitems: tmpcartitems });
        this.setState({ totalamount: tmptotalamount });
        this.setState({ statusmessage: tmpmessage });
        this.setState({ openstatus: true });
        this.setState({ statustimeduration: 500 });
    }

    handleClose = () => {
        this.setState({ openstatus: false });
    }

    render() {
        if (this.state.loading) {
            return (<div>Loading....</div>)
        }

        return (
            <div className="fullscreen">
                <div className="imagecontainer">
                    <div className="restaurantimage">
                        <img className="image" src={this.state.restaurantDetails.photo_URL} alt="Resaurant Image" />
                    </div>
                    <div className="restaurantdetails">
                        <Typography variant="h5">{this.state.restaurantDetails.restaurant_name}</Typography><br />
                        <Typography style={{ textTransform: 'uppercase' }} variant="subtitle1">{this.state.restaurantDetails.address.locality}</Typography><br />
                        {this.state.restaurantDetails.categories.sort((a, b) => (a.category_name > b.category_name) ? 1 : -1).map(category => (
                            <span>{category.category_name}</span>
                        )).reduce((prev, curr) => [prev, ', ', curr])}<br /><br />
                        <div className="ratingandpricing">
                            <div className="rating">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <StarIcon />
                                    <Typography>{this.state.restaurantDetails.customer_rating}</Typography><br />
                                </div>
                                <Typography variant="caption" color="textSecondary">AVERAGE CUSTOMER RATING BY </Typography><br />
                                <Typography variant="caption" color="textSecondary">{this.state.restaurantDetails.number_customers_rated} CUSTOMERS</Typography>
                            </div>
                            <div className="pricing">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <FontAwesomeIcon icon="rupee-sign" />
                                    <Typography> {this.state.restaurantDetails.average_price}</Typography>
                                </div>
                                <Typography variant="caption" color="textSecondary">AVERAGE COST FOR</Typography><br />
                                <Typography variant="caption" color="textSecondary">TWO PEOPLE</Typography>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sellingmenu">
                    <div className="menu">
                        {this.state.restaurantDetails.categories.sort((a, b) => (a.category_name > b.category_name) ? 1 : -1).map(category => (
                            <div className="itemlist">
                                <Typography variant="caption" style={{ textTransform: 'uppercase' }} >{category.category_name}</Typography>
                                <hr style={{ color: "white", marginRight: 20 }} />
                                {category.item_list.map(item => (
                                    <div className="itemline">
                                        <div className="itemdetails">
                                            <Typography className="menuitem" variant="caption" style={{ textTransform: 'capitalize' }}><FontAwesomeIcon style={{ padding: "0 10px 0 0" }} color={item.item_type === "NON_VEG" ? "red" : "green"} icon={faCircle} />   {item.item_name}</Typography>
                                        </div>
                                        <div className="pricedetails">
                                            <Typography className="menuprice" variant="caption"><FontAwesomeIcon icon="rupee-sign" size="xs" color="black" /> {item.price.toFixed(2)}</Typography>
                                            <IconButton size='small' onClick={(e) => this.addItemsToCart(item)}>
                                                <AddIcon fontSize="small"></AddIcon>
                                            </IconButton>
                                        </div>
                                        <br /><br />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="cart">
                        <Card className="cartdetails">
                            <CardHeader
                                avatar={<Badge badgeContent={this.state.cartitemscount} showZero color="primary">
                                    <ShoppingCartIcon />
                                </Badge>}
                                titleTypographyProps={{ variant: 'h6', fontWeight: ' bold' }}
                                title="My Cart"
                            />
                            <div className="cardcontent">
                                {this.state.cartitems.map(item => (
                                    <div className="carditem">
                                        <div className="carditemname">
                                            <Typography variant="caption" style={{ textTransform: 'capitalize' }}><FontAwesomeIcon icon={faStopCircle} color={item.item_type === "NON_VEG" ? "red" : "green"} /> {item.item_name}  </Typography>
                                        </div>
                                        <div component="div" className="cardincr">
                                            <IconButton style={{ display: "inline", padding: "0" }} onClick={(e) => this.decreaseItemCount(item.id)}>
                                                <RemoveIcon />
                                            </IconButton>
                                            <Typography variant="caption" style={{ display: "inline", padding: "0" }} >{item.item_count}</Typography>
                                            <IconButton style={{ display: "inline", padding: "0" }} onClick={(e) => this.increaseItemCount(item.id)}>
                                                <AddIcon />
                                            </IconButton>
                                        </div>
                                        <div style={{ display: "inline", float: "right" }} ><FontAwesomeIcon icon="rupee-sign"/> {(item.item_count * item.price).toFixed(2)}</div>
                                    </div>))}
                            </div>
                            <CardContent>
                                <Box style={{ float: "left" }} fontSize="15px" fontWeight="fontWeightBold">TOTAL AMOUNT</Box>
                                <Box style={{ float: "right" }} fontSize="15px" fontWeight="fontWeightBold"><FontAwesomeIcon icon="rupee-sign" /> {this.state.totalamount.toFixed(2)}</Box>
                            </CardContent>
                            <CardActions className="buttoncontainer">
                                <Button className="checkout" variant="contained" color="primary" size="large">CHECKOUT</Button>
                            </CardActions>
                        </Card>
                        <Snackbar
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            open={this.state.openstatus}
                            onClose={(e) => this.handleClose()}
                            message={this.state.statusmessage}
                            autoHideDuration={this.state.statustimeduration}
                            action={
                                <React.Fragment>
                                    <IconButton size="small" aria-label="close" color="inherit" onClick={(e) => this.handleClose()}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </React.Fragment>
                            }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;