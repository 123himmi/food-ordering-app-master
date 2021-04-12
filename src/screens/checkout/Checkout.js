import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import { FormControl, InputLabel, StepContent, StepLabel, Tabs } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { AppBar } from '@material-ui/core';
import { Tab } from '@material-ui/core';
import { Step } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import './Checkout.css'
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopCircle } from '@fortawesome/fontawesome-free-solid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Header from '../../common/header/Header';

const styles = {
    tilebar: {
        background: "white"
    },
    button: {
        marginTop: '2%',
        marginRight: '2%'
    },
    gridtile: {
        border: '1px solid red'
    },
    formControl: {
        minWidth: 120
    },
    helptext: {
        color: "red"
    },
    gridlist : {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)'
    }    
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={2}>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            currtab: 'one',
            addresses: {},
            base_url: "address/customer",
            states_array: "",
            paymentMethods: "",
            state_id: "",
            state_selected: false,
            state_open: false,
            order_address_id: "",
            address_selected: false,
            delivery_completed: false,
            payment_completed: false,
            payment_method: "",
            step: 0,
            new_flat_number: "",
            new_locality: "",
            new_city: "",
            new_pincode: 0,
            netamount: 0,
            order_message: "",
            order_id: "",
            order_complete: false,
            order_status: false,
            openstatus: false,
            order_error: false
        }
    }

    componentWillMount() {
        // Get upcoming movies
        let varAddresses = "";
        let that = this;
        let data = null;
        let xhr = new XMLHttpRequest();
        this.setState({ loading: true });
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                varAddresses = JSON.parse(this.responseText);
                that.setState({ addresses: varAddresses, loading: false });
            }
        });
        xhr.open("GET", this.props.baseUrl + this.state.base_url);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Authorization", "Bearer eyJraWQiOiJhZGQ4N2Y2MS1kNTA5LTQyYjEtYjFhYy0wNzNkYTI1ODM1YzkiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJmNjQ3YTAxNy1hMTM3LTQ1OGUtYWY1ZC04MGZkMTZjNDliNzgiLCJpc3MiOiJodHRwczovL0Zvb2RPcmRlcmluZ0FwcC5pbyIsImV4cCI6MTYxODI1MiwiaWF0IjoxNjE4MjIzfQ.zHL4st5QzCdluaQTLnNPZ_AbDW67dCV2n2ZvfptXjCcLlLZc3GMrjEt76ID1U4_J3X_ddvR6sKfkzEM6e0NFkw");
        xhr.send(data);
    }

    componentDidMount() {
    }

    a11yProps(index) {
        return {
            id: `wrapped-tab-${index}`,
            'aria-controls': `wrapped-tabpanel-${index}`,
        };
    }

    handleChange = (event, newValue) => {
        this.setState({ currtab: newValue });
    };

    handleStateChange = (event) => {
        this.setState({ state_open: false, state_id: event.target.value });
    }

    captureaddress = (addressid) => {
        this.setState({ order_address_id: addressid });
    }

    capturePaymentMethod = (e) => {
        this.setState({ payment_method: e.target.value });
    }

    captureFlatNumber = (e) => {
        this.setState({ new_flat_number: e.target.value });
    }

    captureLocality = (e) => {
        this.setState({ new_locality: e.target.value });
    }

    captureCity = (e) => {
        this.setState({ new_city: e.target.value });
    }

    capturePincode = (e) => {
        this.setState({ new_pincode: e.target.value });
    }

    completeDelivery = () => {
        if (this.state.order_address_id !== "") {
            this.setState({ step: 1, delivery_completed: true });
            this.fetchPayment();
        }
    }

    completePayment = () => {
        if (this.state.payment_method !== "") {
            this.setState({ payment_completed: true, step: -1 });
        }
    }

    redoSelection = () => {
        this.setState({ step: 0, delivery_completed: false, payment_completed: false });
        console.log(this.state.payment_method);
        console.log(this.state.order_address_id);
    }

    handleClose = () => {
        this.setState({ openstatus: false });
    }

    placeOrder = () => {
        let itemArray = [];
        this.props.location.state.cartitems.forEach(item => {
            itemArray.push({ "item_id": item.id, "price": item.price, "quantity": item.item_count });
        });
        let ordermsg = {
            "address_id": this.state.order_address_id,
            "bill": this.props.location.state.totalamount,
            "coupon_id": "",
            "discount": 0,
            "item_quantities": itemArray,
            "payment_id": this.state.payment_method,
            "restaurant_id": this.props.location.state.restaurant_id
        };
        let xhr = new XMLHttpRequest();
        let that = this;
        this.setState({ loading: true });
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status === 200 || this.status === 201) {
                    let res = JSON.parse(this.responseText);
                    console.log(res);
                    that.setState({ order_id: res.id, loading: false, order_complete: true, openstatus: true });
                } else { 
                    that.setState({loading: false, order_complete: true, openstatus: true, order_error: true});
                }
            }
        });
        xhr.open("POST", this.props.baseUrl + "order");
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer eyJraWQiOiJhZGQ4N2Y2MS1kNTA5LTQyYjEtYjFhYy0wNzNkYTI1ODM1YzkiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJmNjQ3YTAxNy1hMTM3LTQ1OGUtYWY1ZC04MGZkMTZjNDliNzgiLCJpc3MiOiJodHRwczovL0Zvb2RPcmRlcmluZ0FwcC5pbyIsImV4cCI6MTYxODI1MiwiaWF0IjoxNjE4MjIzfQ.zHL4st5QzCdluaQTLnNPZ_AbDW67dCV2n2ZvfptXjCcLlLZc3GMrjEt76ID1U4_J3X_ddvR6sKfkzEM6e0NFkw");
        xhr.send(JSON.stringify(ordermsg));
    }

    fetchStates = () => {
        let varStates = "";
        let xhr = new XMLHttpRequest();
        let data = null;
        let that = this;
        this.setState({ loading: true });
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                varStates = JSON.parse(this.responseText);
                that.setState({ states_array: varStates, loading: false, state_selected: true, state_open: true });
            }
        });
        xhr.open("GET", this.props.baseUrl + "states");
        xhr.send(data);
    }

    fetchPayment = () => {
        let varPayment = "";
        let xhr = new XMLHttpRequest();
        let data = null;
        let that = this;
        this.setState({ loading: true });
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                varPayment = JSON.parse(this.responseText);
                that.setState({ paymentMethods: varPayment, loading: false });
            }
        });
        xhr.open("GET", this.props.baseUrl + "payment");
        xhr.send(data);
    }

    render() {
        const { classes } = this.props;
        const orderamount = this.props.location.state.totalamount;

        if (this.state.loading) {
            return (<div className="loader"></div>)
        }

        return (
            <div className="checkoutpage">
                <Header />
                <Stepper orientation="vertical" className="stepper" activeStep={this.state.step}>
                    <Step completed={this.state.delivery_completed}>
                        <StepLabel>Delivery</StepLabel>
                        <StepContent>
                            <div>
                                <AppBar position="static">
                                    <Tabs value={this.state.currtab} onChange={this.handleChange} aria-label="Addresses">
                                        <Tab value="one" label="EXISTING ADDRESS"  {...this.a11yProps('one')} />
                                        <Tab value="two" label="NEW ADDRESS" {...this.a11yProps('two')} />
                                    </Tabs>
                                </AppBar>
                                <TabPanel value={this.state.currtab} index='one' className="tabpanel">
                                    <GridList className={classes.gridlist} cols={3} cellHeight={250}>
                                        {this.state.addresses.addresses.map((address) => (
                                            <GridListTile classes={{ root: this.state.order_address_id === address.id && classes.gridtile }} key={address.id} >
                                                <Typography>{address.flat_building_name}</Typography>
                                                <Typography>{address.locality}</Typography>
                                                <Typography>{address.city}</Typography>
                                                <Typography>{address.state.state_name}</Typography>
                                                <Typography>{address.pincode}</Typography>
                                                <GridListTileBar classes={{ root: classes.tilebar, titlePositionBottom: classes.tilebar }}
                                                    actionIcon={
                                                        <IconButton onClick={(e) => this.captureaddress(address.id)}>
                                                            <CheckCircleIcon className={this.state.order_address_id === address.id ? "iconcolor" : ""} />
                                                        </IconButton>
                                                    }
                                                />
                                            </GridListTile>
                                        ))}
                                    </GridList>
                                </TabPanel>
                                <TabPanel value={this.state.currtab} index='two'>
                                    <FormControl className={classes.formControl} required>
                                        <InputLabel htmlFor="flat_building_number" >Flat / Building No.</InputLabel>
                                        <Input id="flat_building_number" flat_building_number={this.state.new_flat_number} onChange={this.captureFlatNumber} />
                                        <FormHelperText classes={{ root: classes.helptext }}>required</FormHelperText>
                                    </FormControl><br /><br />
                                    <FormControl className={classes.formControl} required>
                                        <InputLabel htmlFor="locality" >Locality</InputLabel>
                                        <Input id="locality" locality={this.state.new_locality} onChange={this.captureLocality} />
                                        <FormHelperText classes={{ root: classes.helptext }}>required</FormHelperText>
                                    </FormControl><br /><br />
                                    <FormControl className={classes.formControl} required>
                                        <InputLabel htmlFor="city" >City</InputLabel>
                                        <Input id="city" city={this.state.new_city} onChange={this.captureCity} />
                                        <FormHelperText classes={{ root: classes.helptext }}>required</FormHelperText>
                                    </FormControl><br /><br />
                                    <FormControl className={classes.formControl} required>
                                        <InputLabel htmlFor="state" >State</InputLabel>
                                        <Select open={this.state.state_open}
                                            value={this.state.state_id}
                                            onOpen={this.fetchStates}
                                            onChange={this.handleStateChange}
                                            className={classes.formControl}
                                        >
                                            {this.state.state_selected && this.state.states_array.states.map((state_i) => (
                                                <MenuItem id={state_i.id} value={state_i.state_name}>{state_i.state_name}</MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText classes={{ root: classes.helptext }}>required</FormHelperText>
                                    </FormControl><br /><br />
                                    <FormControl required>
                                        <InputLabel htmlFor="pincode" >Pincode</InputLabel>
                                        <Input id="pincode" pincode={this.state.new_pincode} onChange={this.capturePincode} />
                                        <FormHelperText classes={{ root: classes.helptext }}>required</FormHelperText>
                                    </FormControl><br /><br />
                                    <div>
                                        <Button variant="contained" color="secondary">
                                            Save Address
                                        </Button>
                                    </div>
                                </TabPanel>
                            </div>
                            <div >
                                <div>
                                    <Button
                                        disabled={false}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={this.completeDelivery}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                    <Step className="payment" completed={this.state.payment_completed}>
                        <StepLabel>Payment</StepLabel>
                        <StepContent className="payment">
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Select Mode of Payment</FormLabel>
                                <RadioGroup aria-label="paymentmodes" name="paymentmode" value={this.state.payment_method} onChange={this.capturePaymentMethod}>
                                    {this.state.delivery_completed && this.state.paymentMethods.paymentMethods.map((payment) => (
                                        <FormControlLabel key={payment.id} value={payment.id} control={<Radio />} label={payment.payment_name} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <div >
                                <div>
                                    <Button
                                        disabled={false}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        onClick={this.completePayment}
                                    >
                                        Finish
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                </Stepper>
                <div className="ordersummary">
                    <Card>
                        <CardHeader
                            titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                            title="Summary"
                        />
                        <div className="cardcontent">
                            {this.props.location.state.cartitems.map(item => (
                                <div className="carditem" key={item.id}>
                                    <div className="carditemname">
                                        <Typography variant="caption" style={{ textTransform: 'capitalize' }}><FontAwesomeIcon icon={faStopCircle} color={item.item_type === "NON_VEG" ? "red" : "green"} /> {item.item_name}  </Typography>
                                    </div>
                                    <div component="div" className="cardincr">
                                        <Typography align="right" variant="caption" style={{ display: "inline", padding: "0 0 0 30px" }} >{item.item_count}</Typography>
                                    </div>
                                    <div style={{ display: "inline", float: "right" }} ><FontAwesomeIcon icon="rupee-sign" /> {(item.item_count * item.price).toFixed(2)}</div>
                                </div>))}
                            {this.props.location.state.cartitems.length > 0 &&
                                <div className="coupon">
                                    <div className="coupontext">
                                        <TextField id="filled-basic" label="Coupon Code" placeholder="Ex. FLAT30" variant="filled" />
                                    </div>
                                    <div className="couponbutton">
                                        <Button variant="contained">APPLY</Button>
                                    </div>
                                </div>}
                        </div>
                        <Divider />
                        <CardContent>
                            <Box style={{ float: "left" }} fontSize="15px" fontWeight="fontWeightBold">NET AMOUNT</Box>
                            <Box style={{ float: "right" }} fontSize="15px" fontWeight="fontWeightBold"><FontAwesomeIcon icon="rupee-sign" />{orderamount.toFixed(2)}</Box>
                        </CardContent>
                        <CardActions className="buttoncontainer">
                            <Button className="checkout" variant="contained" color="primary" size="large" onClick={this.placeOrder}>PLACE ORDER</Button>
                        </CardActions>
                    </Card>
                </div>
                {this.state.payment_completed &&
                    <div className="summarytext">
                        <Typography variant="h5">View the summary & place your order now !</Typography><br />
                        <Button variant="contained" onClick={this.redoSelection}>Change</Button>
                    </div>
                }
                {this.state.order_complete && <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.openstatus}
                    onClose={(e) => this.handleClose()}
                    message={this.state.order_error === true ? "Unable to place your order! Please try again !" : "Order placed successfully. Your order id is " + this.state.order_id + "!"}
                    autoHideDuration={4000}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={(e) => this.handleClose()}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                />}
            </div>
        )
    }

}

export default withStyles(styles)(Checkout);