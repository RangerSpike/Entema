import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";
import {
  Container,
  Grid,
  Paper,
  Box,
  TextField,
  IconButton,
  Button,
} from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useEffect } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import {GetClientData} from "../Common/CommonCode";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    height: "auto",
    // backgroundColor: theme.palette.grey[300],
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  inputGroup: {
    minWidth: 130,
  },
}));

function CreateQuotation() {
  const history = useHistory();
  const classes = useStyles();

  const [stateChange] = useState(false);
  const [quotID, setQuotID] = useState();
  const [cqdate, setCqdate] = useState();
  const [cqclient, setCqclient] = useState();
  const [cqname, setCqname] = useState();
  const [cqmobileNo, setCqmobileNo] = useState();
  const [cqemail, setCqemail] = useState();
  const [termCond, setTermCond] = useState(
    "1. Above rate is applicable for 10 hours per day, 260 hours per month. \n2. Working less than 10 hours day will be considered as full working day. \n3. Supply Food, accommodation & site transportation Scope of Client. \n4. In case of non-availability of work or inadequate weather conditions, normal daily rate will be charged. \n5. Payment terms will be 30 days after receipt of the Entema al-shamal invoice. \n6. Above Rate is Exclusive of VAT . \n7. Mobilization will be done immediately after receiving the P.O. \n8. Our quotation valid for ten days from the date of this offers and is subject to the availability of manpower & equipment, until receipt of the P.O. \n9. All above mentioned conditions must be mentioned in your purchase order. Hope above quotation is made good and looking forward to get your valuable purchase order at the earliest. Your usual Cooperation would behighly appreciated."
  );
  const [ischeked, setIsChecked] = useState(false);
  const [cqtypes, setCqtypes] = useState("Equipment");

  const [entPhone, setEntPhone] = useState("013 363 1210");
  const [entEmail, setEntEmail] = useState("info@entema-sa.com");
  const [entVAT, setEntVAT] = useState("310005823700003");
  const [entMobile, setEntMobile] = useState("0559258940");
  const [entFrom, setEntFrom] = useState("Entemasw");

  const [quotDate, setQuotDate] = useState();
  const [quotRefNo, setQuotRefNo] = useState("ENT/Jun-21/111");
  const [newData, setNewData] = useState([]);

  const [clientDispValue, setClientDispValue] = useState();

  //   let newData = [];
  //   let arrayData = [];

  const onTypeChange = () => {
    setIsChecked(!ischeked);
    setCqtypes(ischeked ? "Equipment" : "Man Power");

    if (ischeked === true) {
      setCqtypes("Equipment");
    } else {
      setCqtypes("Man Power");
    }    
  };

  let taskList = {
    description: "",
    unit: "",
    qty: "",
    mobAnddemob: "",
    amount: "",
    totalAmount: "",
  };

  const [multiSet, setMultiSet] = useState([]);

  useEffect(() => {
    fetch("https://mssoftware.xyz/getClientData", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setNewData(response);
        //console.log("My API data : ", response);
      });

    let currentDate = new Date();
    let currentYear = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
      currentDate
    );
    let currentMonth = new Intl.DateTimeFormat("en", {
      month: "numeric",
    }).format(currentDate);
    let currentDay = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
      currentDate
    );
    //console.log(`${currentDay}-${currentMonth}-${currentYear}`);

    let formatedDate = currentDay + "-0" + currentMonth + "-" + currentYear;

    setQuotDate(formatedDate);

    generateUniqueId();
  }, [stateChange]);

  const generateUniqueId = () => {
    let currentDate = new Date();
    let uniqueValue =
      "" +
      currentDate.getFullYear() +
      (currentDate.getMonth() + 1) +
      currentDate.getDate() +
      currentDate.getHours() +
      currentDate.getMinutes() +
      currentDate.getSeconds() +
      currentDate.getMilliseconds();

    setQuotID(uniqueValue);
    setQuotRefNo("ENT - " + uniqueValue);
    //console.log("My unique Values :", uniqueValue);
    return uniqueValue;
  };

  const onChangeClientData = (value) => {
    //console.log("onchange value is : ", value);
    let computedComments = newData;
    //console.log("onchange computedComments is : ", computedComments);
    if (value) {
      computedComments = computedComments.filter(
        (comment) => comment.CLIENT_ID == value
      );

      setCqname(computedComments[0].CLIENT_CPNAME);
      setCqmobileNo(computedComments[0].CLIENT_PHONE);
      setCqemail(computedComments[0].CLIENT_EMAIL);
      setClientDispValue(computedComments[0].CLIENT_COMP_NAME);
    }
  };

  const optionUnit = [
    { key: "", value: "" },
    { key: "Month", value: "Month" },
    { key: "Week", value: "Week" },
    { key: "Day", value: "Day" },
    { key: "Hour", value: "Hour" },
  ];

  const handleChangeEvent = (e, index) => {
    //console.log("my data set : ", newData);

    const input = e.target.name;

    if (input === "cqdate") {
      setCqdate(e.target.value);
    } else if (input === "cqclient") {
      setCqclient(e.target.value);
      onChangeClientData(e.target.value);
    } else if (input === "cqname") {
      setCqname(e.target.value);
    } else if (input === "cqmobileNo") {
      setCqmobileNo(e.target.value);
    } else if (input === "cqemail") {
      setCqemail(e.target.value);
    } else if (input === "cqtypes") {
      setCqtypes(e.target.value);
    } else if (input === "termCond") {
      setTermCond(e.target.value);
    } else if (
      [
        "description",
        "unit",
        "qty",
        "mobAnddemob",
        "amount",
        "totalAmount",
      ].includes(input)
    ) {
      //console.log("exceptional handling");
      changeHandler(e, index);
    }

    //console.log("log of order Items : ", multiSet);
  };

  const addRow = () => {
    setMultiSet([...multiSet, taskList]);
  };

  const removeUsers = (index) => {
    //console.log("index value :", index);
    const filteredDataSet = [...multiSet];
    filteredDataSet.splice(index, 1);

    setMultiSet(filteredDataSet);
  };

  const changeHandler = (e, index) => {
    const updatedDataSet = multiSet.map((item, i) =>
      index === i
        ? Object.assign(item, { [e.target.name]: e.target.value })
        : item
    );
    //console.log("newnew:", e.target.value);

    setMultiSet(updatedDataSet);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://mssoftware.xyz/insertQuotData", {
        quotID: quotID,
        quotRefNo: quotRefNo,
        cqdate: cqdate,
        entFrom: entFrom,
        entMobile: entMobile,
        cqclient: cqclient,
        cqname: cqname,
        cqmobileNo: cqmobileNo,
        cqemail: cqemail,
        cqtypes: cqtypes,
        termCond: termCond,
        multiSet: multiSet,
        clientDispValue: clientDispValue,
      })
      .then((res) => {
        //console.log("updated Values Successfully : ", res.data);
      });

    history.push("/ViewQuotation");
  };

  return (
    <>
      <div class="scrollbar square scrollbar-lady-lips thin">
        <div
          class="container"
          style={{ paddingTop: "30px", paddingLeft: "50px" }}
        >
          <div className="row">
            <div className="top-quot2" style={{ marginLeft: "157px" }}></div>
          </div>
          <form onSubmit={handleSubmit} onChange={handleChangeEvent}>
            <div className="heading-layout1">
              <div className="item-title">
                <h4 style={{ color: "blue" }}>Work Schedule</h4>
              </div>
            </div>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="cqdate" style={{ marginLeft: "0px" }}>
                  Start Date
                </label>
                <input
                  type="date"
                  class="form-control is-valid"
                  id="cqdate"
                  name="cqdate"
                  value={cqdate}
                  onChange={(e) => handleChangeEvent(e)}
                />
              </div>
              <div className="top-quot2" style={{ marginLeft: "337px" }}>
                <div className="  qt-left">Date : {quotDate} </div>
                <div className=" qt-left">Quot# : {quotRefNo} </div>
              </div>
            </div>
            <div className="heading-layout1">
              <div className="item-title">
                <h4 style={{ color: "blue" }}>Company</h4>
              </div>
            </div>
            {/* <form onSubmit={handleSubmit} onChange={handleChangeEvent}> */}
            <div className="row">
              <div class="col-md-6 mb-3">
                <label for="cqclient">Client</label>
                <select
                  class="form-control is-valid"
                  id="cqclient"
                  name="cqclient"
                  value={cqclient}
                  required
                >
                  <option key="" value="">
                    Select Client
                  </option>
                  {newData.map((data) => (
                    <option key={data.CLIENT_ID} value={data.CLIENT_ID}>
                      {data.CLIENT_COMP_NAME}
                    </option>
                  ))}
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label for="cqname">Name</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="cqname"
                  name="cqname"
                  value={cqname}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div class="col-md-6 mb-3">
                <label for="cqmobileNo">Mobile No</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="cqmobileNo"
                  name="cqmobileNo"
                  value={cqmobileNo}
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="cqemail">Email</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="cqemail"
                  name="cqemail"
                  value={cqemail}
                />
              </div>
              <div className="centre">
                <h6 style={{ marginLeft: "50px" }}>
                  With reference to the above subject we are very much
                  interested to supply and Hereby Quote our best reasonable
                  price for the same.
                </h6>
              </div>
            </div>
            Equipment
            <Switch
              onChange={onTypeChange}
              color="primary"
              name="cqpes"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            Man Power
            <Container className={classes.root}>
              <Paper component={Box} p={4}>
                {multiSet.map((item, index) => (
                  <Grid
                    container
                    spacing={3}
                    key={index}
                    className={classes.inputGroup}
                  >
                    <Grid item md={2}>
                      <TextField
                        label="Description"
                        name="description"
                        type="textarea"
                        placeholder="Description"
                        variant="outlined"
                        value={item.description}
                        key={index}
                        onChange={(e) => handleChangeEvent(e, index)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={2}>
                      <FormControl
                        variant="outlined"
                        className={classes.inputGroup}
                      >
                        <InputLabel htmlFor="outlined-age-native-simple">
                          Unit
                        </InputLabel>
                        <Select
                          native
                          value={item.unit}
                          onChange={(e) => handleChangeEvent(e, index)}
                          label="unit"
                          id="unit"
                          inputProps={{
                            name: "unit",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          {optionUnit.map((data) => {
                            return (
                              <option key={data.key} value={data.value}>
                                {data.key}
                              </option>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item md={2}>
                      <TextField
                        type="number"
                        label="Qty"
                        name="qty"
                        //placeholder="Enter Your address"
                        variant="outlined"
                        value={item.qty}
                        onChange={(e) => handleChangeEvent(e, index)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={2}>
                      <TextField
                        type="number"
                        label="Price"
                        name="amount"
                        //placeholder="Enter Your address"
                        variant="outlined"
                        value={item.amount}
                        onChange={(e) => handleChangeEvent(e, index)}
                        fullWidth
                      />
                    </Grid>

                    {ischeked ? (
                      <Grid item md={2}>
                        <TextField
                          type="number"
                          label="Total Amount"
                          name="totalAmount"
                          id="totalAmount"
                          //placeholder="Enter Your address"
                          variant="outlined"
                          value={item.totalAmount}
                          onChange={(e) => handleChangeEvent(e, index)}
                          fullWidth
                        />
                      </Grid>
                    ) : (
                      <Grid item md={2}>
                        <TextField
                          label="Mob And Demob"
                          name="mobAnddemob"
                          variant="outlined"
                          value={item.mobAnddemob}
                          onChange={(e) => handleChangeEvent(e, index)}
                          fullWidth
                        />
                      </Grid>
                    )}

                    <Grid item md={1}>
                      <IconButton color="secondary">
                        <DeleteOutlineIcon onClick={() => removeUsers(index)} />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
              </Paper>
            </Container>
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={addRow}
              style={{ marginTop: "10px" }}
            >
              Add Details
            </Button>
            <div class="col-md-12 mb-3">
              <br></br>
              <label for="termCond">Terms & Conditions</label>
              <textarea
                type="text"
                className="form-control is-valid textarea"
                name="termCond"
                value={termCond}
                rows="11"
              ></textarea>
              <h6 style={{ marginTop: "10px" }}>
                Client has to return the same Quotation to Entema Al-shamal by
                Fax or Email after Confirmation Signature.
              </h6>
            </div>
            <div className="col-sm-12">
              <div className="bot-cl">
                <div className="heading-layout1">
                  <div className="item-title">
                    <h4 style={{ color: "blue" }}>Client Acceptance</h4>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="bot-cl2">
                      <div className="row">
                        <div className="col-sm-8 col-xs-8 bot-left">Name</div>
                        <div className="col-sm-8 col-xs-8 bot-right">
                          {cqname}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-8 col-xs-8 bot-left">Title</div>
                        <div className="col-sm-8 col-xs-8 bot-right">
                          {clientDispValue}{" "}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-8 col-xs-8 bot-left">Date</div>
                        <div className="col-sm-8 col-xs-8 bot-right">
                          {" "}
                          {quotDate}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-8 col-xs-8 bot-left">
                          Signature
                        </div>
                        <div className="col-sm-8 col-xs-8 bot-right">
                          {cqname}
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    type="hidden"
                    name="type"
                    id="quot-type"
                    value="equipment"
                  />
                  <input type="hidden" name="unit" value="month" />
                  <input type="hidden" name="user_id" value="4" />

                  <div className="col-sm-6">
                    <div className="bot-cl3">
                      <h4>For Entema Al Shamal Gen. cont. Est</h4>
                      <div className="bot-in">Entemasw , Manager </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <button
              type="submit"
              class="btn btn-outline-success"
              style={{ marginBottom: "30px" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateQuotation;
