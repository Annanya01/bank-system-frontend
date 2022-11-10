import { Button,Grid,useTheme,useMediaQuery,makeStyles,Typography,TextField,CircularProgress,Snackbar } from '@material-ui/core';
import React,{useState} from 'react';
import {setToken, fetchToken} from './Auth.js'

import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import { useNavigate, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '40ch',
      },
    },
    sendButton:{
        ...theme.typography.estimate,
        borderRadius:50,
        height:45,
        width:245,
        fontSize:'1rem',
        marginBottom:'3em',
        backgroundColor:theme.palette.common.orange,
        "&:hover":{
            backgroundColor:theme.palette.secondary.light
        },
        [theme.breakpoints.down("sm")]: {
            height: 40,
            width: 225
          }
    }
  }));

const defaultFormFeild = {
    email: "",
    password: ""

}

export default function Login(){

    const [formField, setFormField] = useState(defaultFormFeild);
    const { email, password } = formField;

    const navigate = useNavigate();
    
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));  
    const [showModal, setShowModal] = useState(false);
    const [modalValue, setModalValue] = useState("");
    const [alertType, setAlertType] = useState("");


    // const navigate = useNavigate();


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormField({
          ...formField,
          [name]: value,
        });
      };

      const modalAlert = (message, type) => {
        setModalValue(message);
        setShowModal(true);
        setAlertType(type);
      };
    
    const [amount,setAmount] = useState(0)

    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState({ open: false, color: "" });
    const [alertMessage, setAlertMesssage] = useState("");

    const onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
          setAmount(amount);
      }
      }

    // const onChange = event => {
    //     let valid;

    //     switch(event.target.id)
    //     {
    //         case 'email' :
    //             setEmail(event.target.value);
    //             valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value);

    //             if(!valid){
    //                 setEmailHelper('Invaild email');
    //             }else
    //             {
    //                 setEmailHelper('');
    //             }
    //             default:
    //                 break;
    //         }
    // }

    const buttonContents = (
        <React.Fragment>
          Submit
        </React.Fragment>
      );

    const Login = (e) => {

        e.preventDefault();
        setLoading(false);


        var axios = require('axios');
        var data = JSON.stringify(formField);

        var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/login',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then((result) => {
            if(result.data.access){
                setToken(result.data.access)
                navigate('/home')
            }
            })
        .catch(function (error) {
        console.log(error);
        });

}

    return (
        <Grid 
        container 
        direction='column' 
        justifyContent='center'
        style={{
            marginTop:matchesSM ? '4em'  : matchesMD ? '5em' : undefined,
            marginBottom: matchesMD ? '5em' : undefined
        }}
    >
        <Grid item>
            <Grid item container direction='column' style={{alignItems:'center'}}>
                <Grid item>
                    <Typography 
                        variant='h3'
                        align= 'center'
                        style={{lineHeight:1}}
                    >
                        Login
                    </Typography>
                </Grid>
                <Grid 
                    item 
                    container
                    direction='column' 
                    style={{maxWidth:matchesXS ? '20em' : matchesSM? '25em' :'40em'}}
                >

                <Grid item style={{marginTop:'2em' ,marginBottom:'0.5em'}}>
                    <Typography style={{color:theme.palette.common.blue}}>Email</Typography>
                    <TextField
                        id="email"
                        variant="outlined"
                        fullWidth
                        name='email'
                        value={email}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item style={{marginTop:'2em' ,marginBottom:'0.5em'}}>
                    <Typography style={{color:theme.palette.common.blue}}>Password</Typography>
                    <TextField 
                        id="password" 
                        variant="outlined"
                        fullWidth
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </Grid>
                

                <Grid item container justifyContent='center' style={{marginTop:'2em'}}>
                    <Button 
                        disabled={
                            email.length === 0 ||
                            password.length === 0
                            // phone.length === 0 ||
                            // amount.length === 0 ||
                            // emailHelper.length !== 0 ||
                        }
                        variant='contained' 
                        className={classes.sendButton}
                        onClick={Login}
                    >
                      {loading ? <CircularProgress size={30} /> : buttonContents}
                    </Button>
                </Grid>
            </Grid>
            </Grid>
        </Grid>
        <Snackbar
        open={alert.open}
        ContentProps={{
          style: {
            backgroundColor: alert.color
          }
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={alertMessage}
        autoHideDuration={4000}
        onClose={() => setAlert(false)}
      />

    </Grid>
    );
};
