// eslint-disable-next-line

import React, { useState, useEffect } from "react";
import { Container, Grid, TextField, Button } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import { RiUserSettingsLine } from 'react-icons/ri'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    height: "auto",
    backgroundColor: theme.palette.white,
    paddingTop: theme.spacing(5),
  },
  inputGroup: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
}));

function Createtimesheet() {
  const classes = useStyles();
  const history = useHistory();

  const [tsVendor, settsVendor] = useState();
  const [tsMonth, settsMont] = useState();
  const [tsYear, settsYear] = useState();
  const [tsDescription, settsDescription] = useState();
  const [tsPlotNo, settsPlotNo] = useState();
  const [tsOperatorName, settsOperatorName] = useState();
  const [tsMonthlyRate, settsMonthlyRate] = useState(10000);
  const [tsOtRate, settsOtRate] = useState();
  const [tsHrRate, settsHrRate] = useState();
  const [tsTotalHours, settsTotalHours] = useState();
  const [tsTotalOt, settsTotalOt] = useState();
  const [tsTotal, settsTotal] = useState();
  const [tsExpectedWorkingHours, settsExpectedWorkingHours] = useState(260);
  const [isCalculated, setIsCalculated] = useState(true);
  const [whTotal, setwhTotal] = useState(0);
  const [oTtotal, setoTtotal] = useState(0);

  const [vendorLov, setVendorLov] = useState([]);
  const [yearLov, setYearLov] = useState([]);

  const [vendorDispValue, setVendorDispValue] = useState();
  const [curDate, setCurdate] = useState(new Date());


  let [taskList, setTasklist] = useState({
    days1: 0,
    days2: 0,
    days3: 0,
    days4: 0,
    days5: 0,
    days6: 0,
    days7: 0,
    days8: 0,
    days9: 0,
    days10: 0,
    days11: 0,
    days12: 0,
    days13: 0,
    days14: 0,
    days15: 0,
    days16: 0,
    days17: 0,
    days18: 0,
    days19: 0,
    days20: 0,
    days21: 0,
    days22: 0,
    days23: 0,
    days24: 0,
    days25: 0,
    days26: 0,
    days27: 0,
    days28: 0,
    days29: 0,
    days30: 0,
    days31: 0,
  });

  let [oTSheet, setOtSheet] = useState({
    oTdays1: 0,
    oTdays2: 0,
    oTdays3: 0,
    oTdays4: 0,
    oTdays5: 0,
    oTdays6: 0,
    oTdays7: 0,
    oTdays8: 0,
    oTdays9: 0,
    oTdays10: 0,
    oTdays11: 0,
    oTdays12: 0,
    oTdays13: 0,
    oTdays14: 0,
    oTdays15: 0,
    oTdays16: 0,
    oTdays17: 0,
    oTdays18: 0,
    oTdays19: 0,
    oTdays20: 0,
    oTdays21: 0,
    oTdays22: 0,
    oTdays23: 0,
    oTdays24: 0,
    oTdays25: 0,
    oTdays26: 0,
    oTdays27: 0,
    oTdays28: 0,
    oTdays29: 0,
    oTdays30: 0,
    oTdays31: 0,
  });

  const [users, setUsers] = useState([taskList]);
  const [oTData, setOtData] = useState([oTSheet]);

  const [isInputHidden29, setIsInputHidden29] = useState(false);
  const [isInputHidden30, setIsInputHidden30] = useState(false);
  const [isInputHidden31, setIsInputHidden31] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledRemove, setisDisabledRemove] = useState(true);

  const optionUnit = [
    { key: "Select Unit", value: "" },
    { key: "Month", value: "Month" },
    { key: "Week", value: "Week" },
    { key: "Day", value: "Day" },
    { key: "Hour", value: "Hour" },
  ];

  let newData = [];

  //console.log(taskList);

  let noOfDays = 0;
  const [isHidden, setisHidden] = useState(true);

  const addUser = () => {
    if (tsMonth != "" && tsYear != "") {
      setIsDisabled(!isDisabled);
      setisDisabledRemove(true);
      setisHidden(false);
    }

    noOfDays = checkCalendarDays(tsMonth, tsYear);

    //console.log("returned value of calendar : ", noOfDays);

    if (noOfDays === 28) {
      setIsInputHidden29(true);
      setIsInputHidden30(true);
      setIsInputHidden31(true);
    } else if (noOfDays === 29) {
      setIsInputHidden30(true);
      setIsInputHidden31(true);
    } else if (noOfDays === 30) {
      setIsInputHidden31(true);
    } else {
      setIsInputHidden29(false);
      setIsInputHidden30(false);
      setIsInputHidden31(false);
    }
    //console.log(isInputHidden29, isInputHidden30, isInputHidden31);
  };

  const onChangeVendorData = (value) => {
    //console.log("onchange value is : ", value);
    let computedComments = vendorLov;
    //console.log("onchange computedComments is : ", computedComments);
    if (value) {
      computedComments = computedComments.filter(
        (comment) => comment.VENDOR_ID == value
      );

      setVendorDispValue(computedComments[0].VENDOR_NAME);
    }
  };

  const removeUsers = (index) => {
    setIsDisabled(!isDisabled);
    setIsCalculated(true);
    setisHidden(true);
    //setIsDisabled(!isDisabled);
    //setisDisabledRemove(!isDisabledRemove);
  };

  const checkCalendarDays = (month, year) => {
    /*assuming month = 3 and year = 2021 (make sure when you select march your variable returns you in number that is 3)*/
    return new Date(year, month, 0).getDate();
  };

  const changeHandler = (e, index) => {
    const updatedUsers = users.map((item, i) =>
      index === i
        ? Object.assign(item, { [e.target.name]: e.target.value })
        : item
    );
    //console.log("newnew:", e.target.value);

    setUsers(updatedUsers);
  };

  const changeOtHandler = (e, index) => {
    const updatedSheet = oTData.map((item, i) =>
      index === i
        ? Object.assign(item, { [e.target.name]: e.target.value })
        : item
    );
    //console.log("newnew:", e.target.value);

    setOtData(updatedSheet);
  };

  const handleChangeEvent = (e, index) => {
    //console.log("e : ", e);
    const input = e.target.name;

    //console.log("field name : ", e.target.name + "- value -", e.target.value);

    if (input === "tsVendor") {
      settsVendor(e.target.value);
      clearMonthnYear();
      onChangeVendorData(e.target.value);
    } else if (input === "tsMonth") {
      settsMont(e.target.value);
    } else if (input === "tsYear") {
      settsYear(e.target.value);
      onYearChange(e.target.value);
    } else if (input === "tsDescription") {
      settsDescription(e.target.value);
    } else if (input === "tsPlotNo") {
      settsPlotNo(e.target.value);
    } else if (input === "tsOperatorName") {
      settsOperatorName(e.target.value);
    } else if (input === "tsExpectedWorkingHours") {
      settsExpectedWorkingHours(e.target.value);
    } else if (input === "tsMonthlyRate") {
      settsMonthlyRate(e.target.value);
    } else if (input === "tsOtRate") {
      settsOtRate(e.target.value);
    } else if (input === "tsHrRate") {
      settsHrRate(e.target.value);
    } else if (input === "tsTotalHours") {
      settsTotalHours(e.target.value);
    } else if (input === "tsTotalOt") {
      settsTotalOt(e.target.value);
    } else if (input === "tsTotal") {
      settsTotal(e.target.value);
    } else if (
      [
        "days1",
        "days2",
        "days3",
        "days4",
        "days5",
        "days6",
        "days7",
        "days8",
        "days9",
        "days10",
        "days11",
        "days12",
        "days13",
        "days14",
        "days15",
        "days16",
        "days17",
        "days18",
        "days19",
        "days20",
        "days21",
        "days22",
        "days23",
        "days24",
        "days25",
        "days26",
        "days27",
        "days28",
        "days29",
        "days30",
        "days31",
      ].includes(input)
    ) {
      //console.log("exceptional handling");
      changeHandler(e, index);
    } else if (
      [
        "oTdays1",
        "oTdays2",
        "oTdays3",
        "oTdays4",
        "oTdays5",
        "oTdays6",
        "oTdays7",
        "oTdays8",
        "oTdays9",
        "oTdays10",
        "oTdays11",
        "oTdays12",
        "oTdays13",
        "oTdays14",
        "oTdays15",
        "oTdays16",
        "oTdays17",
        "oTdays18",
        "oTdays19",
        "oTdays20",
        "oTdays21",
        "oTdays22",
        "oTdays23",
        "oTdays24",
        "oTdays25",
        "oTdays26",
        "oTdays27",
        "oTdays28",
        "oTdays29",
        "oTdays30",
        "oTdays31",
      ].includes(input)
    ) {
      //console.log("exceptional handling");
      changeOtHandler(e, index);
    }

    //console.log("log of order Items : ", users);
    if (tsMonth && tsYear != "") {
      setIsDisabled(false);
    }
  };
  const [timesheetId, setTimesheetid] = useState();

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

    setTimesheetid(uniqueValue);
    //console.log("My unique Values :", uniqueValue);
    return uniqueValue;
  };
  useEffect(() => {
    generateUniqueId();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://entemadb.entema-software.com/insertVenTimesheetData", {
        tsvenId: timesheetId,
        tsvendor: tsVendor,
        tsmonth: tsMonth,
        tsyear: tsYear,
        tsdescription: tsDescription,
        tsplot: tsPlotNo,
        tsopname: tsOperatorName,
        tsexphours: tsExpectedWorkingHours,
        tsmonthrate: tsMonthlyRate,
        tsotrate: tsOtRate,
        tshrrate: tsHrRate,
        tstotalhour: tsTotalHours,
        tstotalot: tsTotalOt,
        tstotal: tsTotal,
        tsgrid: true,
        vendorDispValue: vendorDispValue,
        tsrhdata: users,
        tsotdata: oTData,
      })
      .then((res) => {
        //console.log("updated Values Successfully : ", res.data);
      });

    setIsDisabled(false);
    setisHidden(true);
    history.push("/ViewTimesheet");
    //console.log("test submit");
  };

  const onYearChange = (value) => {
    axios
      .post("http://entemadb.entema-software.com/getVenTimesheetValidation", {
        pVendor: tsVendor,
        pMonth: tsMonth,
        pYear: value,
      })
      .then((res) => {
        //console.log("My onchange year value : ", res.data[0].validate);

        if (res.data[0].validate > 0) {
          alert(
            "You have already generated timesheet for this vendor for the same Month and Year, Either Update the Value through report or create a New one"
          );
          settsVendor("");
          settsMont("");
          settsYear("");
        }
      });
  };

  const calculateTimesheet = () => {
    setIsCalculated(true);
    //console.log("CAlculated Timesheet");

    let whtot =
      parseInt(users[0].days1) +
      parseInt(users[0].days2) +
      parseInt(users[0].days3) +
      parseInt(users[0].days4) +
      parseInt(users[0].days5) +
      parseInt(users[0].days6) +
      parseInt(users[0].days7) +
      parseInt(users[0].days8) +
      parseInt(users[0].days9) +
      parseInt(users[0].days10) +
      parseInt(users[0].days11) +
      parseInt(users[0].days12) +
      parseInt(users[0].days13) +
      parseInt(users[0].days14) +
      parseInt(users[0].days15) +
      parseInt(users[0].days16) +
      parseInt(users[0].days17) +
      parseInt(users[0].days18) +
      parseInt(users[0].days19) +
      parseInt(users[0].days20) +
      parseInt(users[0].days21) +
      parseInt(users[0].days22) +
      parseInt(users[0].days23) +
      parseInt(users[0].days24) +
      parseInt(users[0].days25) +
      parseInt(users[0].days26) +
      parseInt(users[0].days27) +
      parseInt(users[0].days28) +
      parseInt(users[0].days29) +
      parseInt(users[0].days30) +
      parseInt(users[0].days31);

    setwhTotal(whtot);

    let otTot =
      parseInt(oTData[0].oTdays1) +
      parseInt(oTData[0].oTdays2) +
      parseInt(oTData[0].oTdays3) +
      parseInt(oTData[0].oTdays4) +
      parseInt(oTData[0].oTdays5) +
      parseInt(oTData[0].oTdays6) +
      parseInt(oTData[0].oTdays7) +
      parseInt(oTData[0].oTdays8) +
      parseInt(oTData[0].oTdays9) +
      parseInt(oTData[0].oTdays10) +
      parseInt(oTData[0].oTdays11) +
      parseInt(oTData[0].oTdays12) +
      parseInt(oTData[0].oTdays13) +
      parseInt(oTData[0].oTdays14) +
      parseInt(oTData[0].oTdays15) +
      parseInt(oTData[0].oTdays16) +
      parseInt(oTData[0].oTdays17) +
      parseInt(oTData[0].oTdays18) +
      parseInt(oTData[0].oTdays19) +
      parseInt(oTData[0].oTdays20) +
      parseInt(oTData[0].oTdays21) +
      parseInt(oTData[0].oTdays22) +
      parseInt(oTData[0].oTdays23) +
      parseInt(oTData[0].oTdays24) +
      parseInt(oTData[0].oTdays25) +
      parseInt(oTData[0].oTdays26) +
      parseInt(oTData[0].oTdays27) +
      parseInt(oTData[0].oTdays28) +
      parseInt(oTData[0].oTdays29) +
      parseInt(oTData[0].oTdays30) +
      parseInt(oTData[0].oTdays31);

    setoTtotal(otTot);
    ValidateCalculations(whtot, otTot);
  };

  const ValidateCalculations = (whtot, otTot) => {
    var tot = whtot + otTot;

    if (parseInt(whtot) !== parseInt(tsExpectedWorkingHours)) {
      alert(
        "Expected Working Hours " +
          tsExpectedWorkingHours +
          " & Working Hours :" +
          whtot +
          " Do Not Match !"
      );
    } else if (parseInt(tsTotalHours) != parseInt(tot)) {
      alert(
        "Total Hours Do Not Match With Calculated Hours(" +
          tot +
          "), Please Verify!"
      );
    } else {
      alert("All fields are validated!");
    }

    if (!tsTotalHours || tsTotalHours == 0) {
      settsTotalHours(tot);
      testing();
    }

    return tot;
  };

  const getVendorLovData = () => {
    fetch("http://entemadb.entema-software.com/getVendorData", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setVendorLov(response);
        //console.log("My API data : ", response);
      });
    return vendorLov;
  };

  const getYearLovData = () => {
    fetch("http://entemadb.entema-software.com/getYearLov", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setYearLov(response);
        //console.log("My API data Year: ", response);
      });
    return yearLov;
  };

  useEffect(() => {
    getVendorLovData();
    getYearLovData();

    if (tsMonthlyRate != "" && tsExpectedWorkingHours != "") {
      // let perDay = Math.round(tsMonthlyRate/tsExpectedWorkingHours);
      let perDay = tsMonthlyRate / tsExpectedWorkingHours;
      settsOtRate(perDay.toFixed(2));
      settsHrRate(perDay.toFixed(2));
    }
  }, [tsMonthlyRate, tsExpectedWorkingHours]);

  const MonthLov = [
    { key: "", value: "Select Month" },
    { key: "1", value: "Jan" },
    { key: "2", value: "Feb" },
    { key: "3", value: "Mar" },
    { key: "4", value: "Apr" },
    { key: "5", value: "May" },
    { key: "6", value: "Jun" },
    { key: "7", value: "Jul" },
    { key: "8", value: "Aug" },
    { key: "9", value: "Sep" },
    { key: "10", value: "Oct" },
    { key: "11", value: "Nov" },
    { key: "12", value: "Dec" },
  ];

  const clearMonthnYear = () => {
    settsMont("");
    //settsYear("");
  };

  const testing = () => {
    //console.log("testing bluee event");
    let Ottime = 0;
    let RHtime = 0;
    let OTamount = 0;
    let RHamount = 0;
    let TotalAmount = 0;

    if (tsTotalHours > tsExpectedWorkingHours) {
      //console.log("Greater man");
      Ottime = tsTotalHours - tsExpectedWorkingHours;
      OTamount = tsOtRate * Ottime;
      settsTotalOt(OTamount.toFixed(2));
      //console.log("Ottime : ", Ottime);
      //console.log("OTamount : ", OTamount);

      RHamount = tsExpectedWorkingHours * tsHrRate;
      TotalAmount = OTamount + RHamount;
      settsTotal(Math.round(TotalAmount));

      //console.log("RHamount : ", RHamount);
      //console.log("TotalAmount : ", TotalAmount);
    } else {
      //console.log("lesser man");
      RHamount = tsTotalHours * tsHrRate;
      settsTotalOt(0);
      settsTotal(Math.round(RHamount.toFixed(2)));
    }
  };

  
  const dateFn = () => {
    let x = curDate.getFullYear();    
    settsYear(x);   
  };

  useEffect(() => {
    dateFn();
  }, []);

  return (
    <>
      <div class="scrollbar square scrollbar-lady-lips thin">
        <div
          class="container"
          style={{ paddingTop: "30px", paddingLeft: "50px" }}
        >
          <div className="heading-layout1">
            <div className="item-title">
              <h3 style={{ padding: "50px" }}>Vendor Time sheet</h3>
            </div>
          </div>
          <form onChange={handleChangeEvent} onSubmit={handleSubmit}>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="userRole">Vendor</label>
                <select
                  class="form-control is-valid"
                  value={tsVendor}
                  id="tsVendor"
                  name="tsVendor"
                  required
                >
                  <option key="" value="">
                    Select Vendor
                  </option>
                  {vendorLov.map((data) => (
                    <option key={data.VENDOR_ID} value={data.VENDOR_ID}>
                      {data.VENDOR_NAME}
                    </option>
                  ))}
                </select>
              </div>
              <div class="col-md-4 mb-3">
                <label for="userRole">Month</label>
                <select
                  class="form-control is-valid"
                  value={tsMonth}
                  id="tsMonth"
                  name="tsMonth"
                  required
                >
                  {MonthLov.map((data) => (
                    <option key={data.key} value={data.key}>
                      {data.value}
                    </option>
                  ))}
                </select>
              </div>
              <div class="col-md-4 mb-3">
                <label for="userRole">Years</label>
                <select
                  class="form-control is-valid"
                  value={tsYear}
                  id="tsYear"
                  name="tsYear"
                  required
                >
                  <option value="">Select Years</option>
                  {yearLov.map((data) => (
                    <option key={data.ID} value={data.ID}>
                      {data.YEAR}
                    </option>
                  ))}
                </select>
              </div>
              <div></div>
            </div>
            <div className="row">
              <div class="col-md-8 mb-3">
                <label for="userFname">Description</label>
                <textarea
                  type="text"
                  class="form-control is-valid"
                  value={tsDescription}
                  id="tsDescription"
                  name="tsDescription"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="userName">Plot No</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={tsPlotNo}
                  id="tsPlotNo"
                  name="tsPlotNo"
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userName">Operator Name</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={tsOperatorName}
                  id="tsOperatorName"
                  name="tsOperatorName"
                />
              </div>{" "}
              <div class="col-md-4 mb-3">
                <label for="userName">Expected Working Hours</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={tsExpectedWorkingHours}
                  id="tsExpectedWorkingHours"
                  name="tsExpectedWorkingHours"
                  onBlur={testing}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="userName">Monthly Rate</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={tsMonthlyRate}
                  id="tsMonthlyRate"
                  name="tsMonthlyRate"
                  onBlur={testing}
                  required
                />
              </div>

              <div class="col-md-4 mb-3">
                <label for="userName">OT Rate</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="tsOtRate"
                  value={tsOtRate}
                  name="tsOtRate"
                  onBlur={testing}
                  required
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userName">HR Rate</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="tsHrRate"
                  value={tsHrRate}
                  name="tsHrRate"
                  onBlur={testing}
                  required
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userName">Total Hours</label>
                <input
                  type="number"
                  class="form-control is-valid"
                  value={tsTotalHours}
                  id="tsTotalHours"
                  onBlur={testing}
                  name="tsTotalHours"
                  required
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userName">Total OT</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="tsTotalOt"
                  value={tsTotalOt}
                  name="tsTotalOt"
                  required
                  disabled
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userName">Total</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="tsTotal"
                  value={tsTotal}
                  name="tsTotal"
                  required
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <ButtonGroup
                  disableElevation
                  variant="contained"
                  color="primary"
                  style={{ marginBottom: "10px" }}
                >
                  <Button
                    color="default"
                    onClick={() => addUser()}
                    disabled={isDisabled}
                    hidden
                  >
                    Show
                  </Button>
                  <Button
                    color="default"
                    onClick={() => removeUsers()}
                    disabled={!isDisabled}
                    style={{ marginLeft: "10px" }}
                    hidden
                  >
                    Remove
                  </Button>
                </ButtonGroup>
              </div>
              <div className="col-md-12">
                <span style={{ color: "red" }} hidden>
                  NOTE : Please Click On Calculate Button In Case of Adding Data
                  In Grid
                </span>
              </div>
              <div className="col-md-6" hidden={isHidden}>
                <lable>REGULAR HOURS</lable>
                <Container className={classes.root}>
                  {users.map((task, i) => (
                    <Grid
                      container
                      spacing={2}
                      key={i}
                      className={classes.inputGroup}
                    >
                      <Grid item md={4}>
                        <TextField
                          label="Day 1"
                          name="days1"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days1}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 2"
                          name="days2"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days2}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 3"
                          name="days3"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days3}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 4"
                          name="days4"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days4}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 5"
                          name="days5"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days5}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 6"
                          name="days6"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days6}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 7"
                          name="days7"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days7}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 8"
                          name="days8"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days8}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 9"
                          name="days9"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days9}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 10"
                          name="days10"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days10}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 11"
                          name="days11"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days11}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 12"
                          name="days12"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days12}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 13"
                          name="days13"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days13}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 14"
                          name="days14"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days14}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day15"
                          name="days15"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days15}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 16"
                          name="days16"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days16}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 17"
                          name="days17"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days17}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 18"
                          name="days18"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days18}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 19"
                          name="days19"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days19}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 20"
                          name="days20"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days20}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 21"
                          name="days21"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days21}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 22"
                          name="days22"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days22}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 23"
                          name="days23"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days23}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 24"
                          name="days24"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days24}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 25"
                          name="days25"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days25}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 26"
                          name="days26"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days26}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 27"
                          name="days27"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days27}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 28"
                          name="days28"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days28}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 29"
                          name="days29"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days29}
                          fullWidth
                          disabled={isInputHidden29}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 30"
                          name="days30"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days30}
                          fullWidth
                          disabled={isInputHidden30}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 31"
                          name="days31"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.days31}
                          fullWidth
                          disabled={isInputHidden31}
                        />
                      </Grid>
                    </Grid>
                  ))}
                </Container>
              </div>
              <div className="col-md-6" hidden={isHidden}>
                <lable>OT HOURS</lable>
                <Container className={classes.root}>
                  {oTData.map((task, i) => (
                    <Grid
                      container
                      spacing={2}
                      key={i}
                      className={classes.inputGroup}
                    >
                      <Grid item md={4}>
                        <TextField
                          label="Day 1"
                          name="oTdays1"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays1}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 2"
                          name="oTdays2"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays2}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 3"
                          name="oTdays3"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays3}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 4"
                          name="oTdays4"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays4}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 5"
                          name="oTdays5"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays5}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 6"
                          name="oTdays6"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays6}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 7"
                          name="oTdays7"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays7}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 8"
                          name="oTdays8"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays8}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 9"
                          name="oTdays9"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays9}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 10"
                          name="oTdays10"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays10}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 11"
                          name="oTdays11"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays11}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 12"
                          name="oTdays12"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays12}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 13"
                          name="oTdays13"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays13}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 14"
                          name="oTdays14"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays14}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day15"
                          name="oTdays15"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays15}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 16"
                          name="oTdays16"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays16}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 17"
                          name="oTdays17"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays17}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 18"
                          name="oTdays18"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays18}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 19"
                          name="oTdays19"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays19}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 20"
                          name="oTdays20"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays20}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 21"
                          name="oTdays21"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays21}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 22"
                          name="oTdays22"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays22}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 23"
                          name="oTdays23"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays23}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 24"
                          name="oTdays24"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays24}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 25"
                          name="oTdays25"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays25}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 26"
                          name="oTdays26"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays26}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 27"
                          name="oTdays27"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays27}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 28"
                          name="oTdays28"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays28}
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 29"
                          name="oTdays29"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays29}
                          fullWidth
                          disabled={isInputHidden29}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 30"
                          name="oTdays30"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays30}
                          fullWidth
                          disabled={isInputHidden30}
                        />
                      </Grid>
                      <Grid item md={4}>
                        <TextField
                          label="Day 31"
                          name="oTdays31"
                          type="number"
                          //placeholder="Enter Your Name"
                          variant="outlined"
                          onChange={(e) => handleChangeEvent(e, i)}
                          value={task.oTdays31}
                          fullWidth
                          disabled={isInputHidden31}
                        />
                      </Grid>
                    </Grid>
                  ))}
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    style={{
                      marginTop: "20px",
                      marginBottom: "40px",
                      marginLeft: "246px",
                    }}
                    onClick={calculateTimesheet}
                  >
                    Calculate
                  </button>
                </Container>
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-outline-success"
              style={{ marginTop: "20px", marginBottom: "40px" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Createtimesheet;
