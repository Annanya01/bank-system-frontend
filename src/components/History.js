import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";
import { Typography, Divider } from "@material-ui/core";
import { fetchToken } from "./Auth";
import { useMediaQuery, useTheme } from '@material-ui/core';

function History() {

  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'))
  const [tra, setTransfers] = useState([]);
  const [transfer, setTransfer] = useState()

  var axios = require('axios');
  useEffect(()=>{
    let token = "Bearer " + fetchToken();
  var config = {
    method: 'get',
    url: 'http://127.0.0.1:8000/transactions',
    headers: {
      'Authorization': token
    }
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setTransfer(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  },[])

  // useEffect(() => {
  //   const getDataFromFirebase = [];
  //   const subscriber = db.collection("users").doc("transfer").collection("lists").onSnapshot((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       getDataFromFirebase.push({ ...doc.data(), key: doc.id });
  //     });
  //     setTransfers(getDataFromFirebase);
  //   });
  //   return () => subscriber();
  // }, [])

  // const transfer_data = 
  const sortedUsers = tra.sort((a, b) => b.time - a.time);
  console.log(transfer);
  return (
    <div style={{ marginBottom: '14em', marginTop: '2em' }}>
      <Typography style={{ textAlign: 'center' }} variant='h3'>
        Transaction History
      </Typography>
      <Divider/>
      <div>
        <table style={{ width: matchesXS ? '25em' : matchesSM ? '30em' : matchesMD ? '60em' : '70em' }}>
          <thead>
            <tr>
              <th>FROM ACCOUNT</th>
              <th>TO ACCOUNT</th>
              <th>AMOUNT(₹)</th>
            </tr>
          </thead>
          <tbody>

            {transfer?.map((data) => {
              return (<tr>
                <td data-column="FROM USER">{data.sender_id}</td>
                <td data-column="TO USER">{data.receiver_id}</td>
                <td data-column="AMOUNT(₹)">{data.transfer_amount}₹</td>
              </tr>)
            })}

          </tbody>
        </table>
      </div>
    </div>
  )

}
export default History;





