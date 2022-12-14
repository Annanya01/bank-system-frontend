import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Button,Grid,useTheme,useMediaQuery,makeStyles,Typography,TextField,CircularProgress,Snackbar } from '@material-ui/core';

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
    first_name: "",
    last_name: "",
    email: "",
    password: ""
}

export default function CreateUser(){

    const [formField, setFormField] = useState(defaultFormFeild);
    const { first_name, last_name, email, password } = formField;

    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();

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

    const Push = (e) => {
        e.preventDefault();
        setLoading(false);

        console.log(formField)

        var axios = require('axios');
        var data = JSON.stringify(formField);

    var config = {
    method: 'post',
    url: 'http://127.0.0.1:8000/create_user',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    navigate("/login");
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
                        Create New User
                    </Typography>
                </Grid>
                <Grid 
                    item 
                    container
                    direction='column' 
                    style={{maxWidth:matchesXS ? '20em' : matchesSM? '25em' :'40em'}}
                >

                <Grid item style={{marginTop:'2em' ,marginBottom:'0.5em'}}>
                    <Typography style={{color:theme.palette.common.blue}}>First Name</Typography>
                    <TextField
                        id="first_name"
                        variant="outlined"
                        fullWidth
                        name='first_name'
                        value={first_name}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item style={{marginTop:'2em' ,marginBottom:'0.5em'}}>
                    <Typography style={{color:theme.palette.common.blue}}>Last Name</Typography>
                    <TextField 
                        id="first_name" 
                        variant="outlined"
                        fullWidth
                        name="last_name"
                        value={last_name}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item style={{marginBottom:'0.5em'}}>
                    <Typography style={{color:theme.palette.common.blue}}>Enter your E-mail</Typography>
                    <TextField 
                        id="email"
                        variant="outlined"
                        fullWidth
                        // error={emailHelper.length !== 0}
                        // helperText={emailHelper}
                        name='email'
                        value={email}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item style={{marginTop:'2em' ,marginBottom:'0.5em'}}>
                    <Typography style={{color:theme.palette.common.blue}}>Password</Typography>
                    <TextField 
                        id="first_name" 
                        variant="outlined"
                        fullWidth
                        // error={senderEmailHelper.length !== 0}
                        // helperText={senderEmailHelper}
                        name='password'
                        value={password}
                        onChange={handleChange}
                    />
                </Grid>
                

                <Grid item container justifyContent='center' style={{marginTop:'2em'}}>
                    <Button 
                        disabled={
                            first_name.length === 0 ||
                            last_name.length === 0 ||
                            email.length === 0 ||
                            password.length === 0
                            // phone.length === 0 ||
                            // amount.length === 0 ||
                            // emailHelper.length !== 0 ||
                        }
                        variant='contained' 
                        className={classes.sendButton}
                        onClick={Push}
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
