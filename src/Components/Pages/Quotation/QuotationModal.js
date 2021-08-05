import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
} from "@material-ui/core";
import { useState, useEffect } from "react";
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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Select from "@material-ui/core/Select";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    paddingRight: "0px",
  },
}));

export default function Popup(props) {
  const { setId, id, openPopup, setOpenPopup } = props;

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

  const [cqtypes, setCqtypes] = useState();
  const [ischecked, setIsChecked] = useState();

  const [entPhone, setEntPhone] = useState("013 363 1210");
  const [entEmail, setEntEmail] = useState("info@entema-sa.com");
  const [entVAT, setEntVAT] = useState("310005823700003");
  const [entMobile, setEntMobile] = useState("0559258940");
  const [entFrom, setEntFrom] = useState("Entemasw");

  const [quotDate, setQuotDate] = useState();
  const [quotRefNo, setQuotRefNo] = useState("ENT/Jun-21/111");

  let newData = [];
  let test = [];

  const [clientDispValue, setClientDispValue] = useState();

  let taskList = {
    description: "",
    unit: "",
    qty: "",
    mobAnddemob: "",
    amount: "",
    totalAmount: "",
  };

  const [multiSet, setMultiSet] = useState([]);
  const [clientLov, setClientLov] = useState([]);

  useEffect(() => {
    fetch("https://mssoftware.xyz/getClientData", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setClientLov(response);
        // console.log("My API data : ", response);
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
    return uniqueValue;
  };

  const onChangeClientData = (value) => {
    let computedComments = clientLov;
    if (value) {
      computedComments = computedComments.filter(
        (comment) => comment.CLIENT_ID == value
      );

      setCqname(computedComments[0].CLIENT_CPNAME);
      setCqmobileNo(computedComments[0].CLIENT_PHONE);
      setCqemail(computedComments[0].CLIENT_EMAIL);
      setClientDispValue(computedComments[0].CLIENT_COMP_NAME);
      // setClientDispValue(res.data[0].CLIENT_DISP_NAME);
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
      changeHandler(e, index);
    }
  };
  const handleBlur = (e, index) => {
    console.log("blurr on call e value : ", e);
    console.log("blurr on call index value : ", index);

    if (e.target.name === "amount") {
      if (multiSet[index].qty != "") {
        let calc = multiSet[index].qty * multiSet[index].amount;

        const updatedUsers = multiSet.map((item, i) =>
          index === i ? Object.assign(item, { ["totalAmount"]: calc }) : item
        );

        setMultiSet(updatedUsers);
      }
    } else if (e.target.name === "qty") {
      if (multiSet[index].amount != "") {
        let calc = multiSet[index].qty * multiSet[index].amount;

        const updatedUsers = multiSet.map((item, i) =>
          index === i ? Object.assign(item, { ["totalAmount"]: calc }) : item
        );

        setMultiSet(updatedUsers);
      }
    }
  };
  useEffect(() => {
    axios
      .post("https://mssoftware.xyz/getQuotDataBasedOnId", {
        quotID: id,
      })
      .then((res) => {
        ///setNewData(res.data[0]);
        if (id > 0) {
          setCqdate(res.data[0].CREATED_DATE);
          setCqclient(res.data[0].QO_COMP_CLIENT);
          setCqname(res.data[0].QO_COMP_NAME);
          setCqmobileNo(res.data[0].QO_COMP_MOB);
          setCqemail(res.data[0].QO_COMP_EMAIL);
          setCqtypes(res.data[0].QO_TYPE);
          setClientDispValue(res.data[0].CLIENT_DISP_NAME);
          // console.log("CQ :", cqtypes);
          axios
            .post("https://mssoftware.xyz/getMultirowQuotDataBasedOnId", {
              quotID: id,
            })
            .then((res) => {
              newData = res.data;

              var x = newData.length;
              var rows = [];

              for (var i = 0; i < x; i++) {
                rows.push(taskList);

                test[i] = {
                  description: newData[i].TAB_DESC,
                  unit: newData[i].TAB_UNIT,
                  qty: newData[i].TAB_QTY,
                  mobAnddemob: newData[i].TAB_MAD,
                  amount: newData[i].TAB_AMOUNT,
                  totalAmount: newData[i].TAB_TOTAL_AMT,
                };
              }
              setMultiSet(test);
            });
        }
      });
  }, [id]);

  const addRow = () => {
    setMultiSet([...multiSet, taskList]);
  };

  const removeUsers = (index) => {
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

    setMultiSet(updatedDataSet);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://mssoftware.xyz/removeQUOMulDataonId", {
        qoid: id,
      })
      .then((res) => {});

    axios
      .post("https://mssoftware.xyz/UpdateQuotData", {
        qoid: id,
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
      })
      .then((res) => {});

    setOpenPopup(false);
    setId(0);
  };

  const onTypeChange = () => {
    setIsChecked(!ischecked);
    setCqtypes(ischecked ? "Equipment" : "Man Power");

    if (ischecked === true) {
      setCqtypes("Equipment");
    } else {
      setCqtypes("Man Power");
    }
  };

  let xSts;

  const isEnabled = (sts) => {
    if (sts === "Man Power") {
      xSts = true;
    } else {
      xSts = false;
    }
    return xSts;
  };

  const onCloseOpup = () => {
    setOpenPopup(false);
    setId(0);
    setCqtypes();
    //xSts = false
  };

  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle>
        <div style={{ display: "flex" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onCloseOpup()}
            style={{ flex: "end" }}
          >
            Close
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
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
                  Valid{" "}
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
              <div className="top-quot2" style={{ marginLeft: "157px" }}>
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
                  disabled
                  onChange={handleChangeEvent}
                >
                  <option key="" value="">
                    Select Client
                  </option>
                  {clientLov.map((data) => (
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
                  onChange={handleChangeEvent}
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
                  onChange={handleChangeEvent}
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
                  onChange={handleChangeEvent}
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
              name="cqtypes"
              disabled
              checked={isEnabled(cqtypes)}
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
                    <Grid item md={3}>
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
                        onBlur={(e) => handleBlur(e, index)}
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
                        onBlur={(e) => handleBlur(e, index)}
                        onChange={(e) => handleChangeEvent(e, index)}
                        fullWidth
                      />
                    </Grid>

                    {xSts ? (
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
                rows="13"
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
                        <div className="col-sm-4 col-xs-8 bot-left">Name</div>
                        <div className="col-sm-8 col-xs-8 bot-right">
                          {" "}
                          {cqname}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4 col-xs-8 bot-left">Title</div>
                        <div className="col-sm-8 col-xs-8 bot-right">
                          {clientDispValue}{" "}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4 col-xs-8 bot-left">Date</div>
                        <div className="col-sm-8 col-xs-8 bot-right">
                          {quotDate}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4 col-xs-8 bot-left">
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
              type="button"
              class="btn btn-outline-success"
              style={{ marginBottom: "30px" }}
              onClick={handleSubmit}
            >
              Update
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
