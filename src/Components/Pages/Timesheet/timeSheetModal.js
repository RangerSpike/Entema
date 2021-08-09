import ButtonGroup from "@material-ui/core/ButtonGroup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { Container, Grid, TextField, Button } from "@material-ui/core";
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
  root: {
    width: "auto",
    height: "auto",
    //backgroundColor: theme.palette.grey[300],
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  inputGroup: {
    minWidth: 120,
  },
}));

export default function PopupTS(props) {
  const { setId, id, openPopup, setOpenPopup } = props;

  const classes = useStyles();

  const [isCalculated, setIsCalculated] = useState(true);
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
  const [tsId, setTsid] = useState();
  const [whTotal, setwhTotal] = useState(0);
  const [oTtotal, setoTtotal] = useState(0);

  const [vendorLov, setVendorLov] = useState([]);
  const [yearLov, setYearLov] = useState([]);

  const [vendorDispValue, setVendorDispValue] = useState();

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

  let [oTList, setOtList] = useState({
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

  const [users, setUsers] = useState([]);
  const [oTData, setOtData] = useState([]);

  const [isInputHidden29, setIsInputHidden29] = useState(false);
  const [isInputHidden30, setIsInputHidden30] = useState(false);
  const [isInputHidden31, setIsInputHidden31] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledRemove, setisDisabledRemove] = useState(true);

  let newData = [];
  let test = [];

  //console.log(taskList);

  let noOfDays = 0;

  useEffect(() => {
    axios
      .post("http://mssoftware.xyz/getVenTimesheetDataListBasedonId", {
        vtsId: id,
      })
      .then((res) => {
        if (res.data.length > 0) {
          console.log(res.data);
          setTsid(res.data[0].VTS_ID);
          settsVendor(res.data[0].TS_VENDOR);
          settsMont(res.data[0].TS_MONTH);
          settsYear(res.data[0].TS_YEAR);
          settsDescription(res.data[0].TS_DESCRIPTION);
          settsPlotNo(res.data[0].TS_PLOT);
          settsOperatorName(res.data[0].TS_OP_NAME);
          settsMonthlyRate(res.data[0].TS_MONTH_RATE);
          settsOtRate(res.data[0].TS_OT_RATE);
          settsHrRate(res.data[0].TS_HR_RATE);
          settsTotalHours(res.data[0].TS_TOTAL_HOUR);
          settsTotalOt(res.data[0].TS_TOTAL_OT);
          settsTotal(res.data[0].TS_TOTAL);
          settsExpectedWorkingHours(res.data[0].TS_EXP_HOURS);
          checkApproved(res.data[0].TS_STATUS);
          test[0] = {
            days1: res.data[0].RDAY_1,
            days2: res.data[0].RDAY_2,
            days3: res.data[0].RDAY_3,
            days4: res.data[0].RDAY_4,
            days5: res.data[0].RDAY_5,
            days6: res.data[0].RDAY_6,
            days7: res.data[0].RDAY_7,
            days8: res.data[0].RDAY_8,
            days9: res.data[0].RDAY_9,
            days10: res.data[0].RDAY_10,
            days11: res.data[0].RDAY_11,
            days12: res.data[0].RDAY_12,
            days13: res.data[0].RDAY_13,
            days14: res.data[0].RDAY_14,
            days15: res.data[0].RDAY_15,
            days16: res.data[0].RDAY_16,
            days17: res.data[0].RDAY_17,
            days18: res.data[0].RDAY_18,
            days19: res.data[0].RDAY_19,
            days20: res.data[0].RDAY_20,
            days21: res.data[0].RDAY_21,
            days22: res.data[0].RDAY_22,
            days23: res.data[0].RDAY_23,
            days24: res.data[0].RDAY_24,
            days25: res.data[0].RDAY_25,
            days26: res.data[0].RDAY_26,
            days27: res.data[0].RDAY_27,
            days28: res.data[0].RDAY_28,
            days29: res.data[0].RDAY_29,
            days30: res.data[0].RDAY_30,
            days31: res.data[0].RDAY_31,
          };
          newData[0] = {
            oTdays1: res.data[0].ODAY_1,
            oTdays2: res.data[0].ODAY_2,
            oTdays3: res.data[0].ODAY_3,
            oTdays4: res.data[0].ODAY_4,
            oTdays5: res.data[0].ODAY_5,
            oTdays6: res.data[0].ODAY_6,
            oTdays7: res.data[0].ODAY_7,
            oTdays8: res.data[0].ODAY_8,
            oTdays9: res.data[0].ODAY_9,
            oTdays10: res.data[0].ODAY_10,
            oTdays11: res.data[0].ODAY_11,
            oTdays12: res.data[0].ODAY_12,
            oTdays13: res.data[0].ODAY_13,
            oTdays14: res.data[0].ODAY_14,
            oTdays15: res.data[0].ODAY_15,
            oTdays16: res.data[0].ODAY_16,
            oTdays17: res.data[0].ODAY_17,
            oTdays18: res.data[0].ODAY_18,
            oTdays19: res.data[0].ODAY_19,
            oTdays20: res.data[0].ODAY_20,
            oTdays21: res.data[0].ODAY_21,
            oTdays22: res.data[0].ODAY_22,
            oTdays23: res.data[0].ODAY_23,
            oTdays24: res.data[0].ODAY_24,
            oTdays25: res.data[0].ODAY_25,
            oTdays26: res.data[0].ODAY_26,
            oTdays27: res.data[0].ODAY_27,
            oTdays28: res.data[0].ODAY_28,
            oTdays29: res.data[0].ODAY_29,
            oTdays30: res.data[0].ODAY_30,
            oTdays31: res.data[0].ODAY_31,
          };
          setUsers(test);
          setOtData(newData);
        }
      });
  }, [id]);
  const [isHidden, setisHidden] = useState(true);

  const checkApproved = (sts) => {
    console.log(sts);
    if (sts === "Approved") {
      return true;
    }else{
      return false;
    }
  };
  
  const addUser = () => {
    setIsDisabled(!isDisabled);
    setIsCalculated(false);
    noOfDays = checkCalendarDays(tsMonth, tsYear);
    setisHidden(false);
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
      testing();
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isCalculated) {
      axios
        .post("http://mssoftware.xyz/removeVenTsRGHDataonId", {
          TSID: id,
        })
        .then((res) => {
          axios
            .post("http://mssoftware.xyz/removeVenTsOTHDataonId", {
              TSID: id,
            })
            .then((res) => {});
          axios
            .post("http://mssoftware.xyz/updateVenTsData", {
              tsvenId: id,
              tsid: id,
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
              tsrhdata: users,
              tsotdata: oTData,
            })
            .then((res) => {
              //console.log("updated Values Successfully : ", res.data);
            });
        });
      setwhTotal(0);
      setoTtotal(0);
      setOpenPopup(false);
      setIsDisabled(false);
      setisHidden(true);
      setId(0);
    } else {
      alert("TimeSheet Has Not Been Calculated");
    }
  };

  const onYearChange = (value) => {
    axios
      .post("http://mssoftware.xyz/getVenTimesheetValidation", {
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

  const getVendorLovData = () => {
    fetch("http://mssoftware.xyz/getVendorData", {
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
    fetch("http://mssoftware.xyz/getYearLov", {
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
    settsYear("");
  };

  const testing = () => {
    // if(!tsTotalHours){
    //   settsTotal(whTotal+oTtotal);
    // }
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
      settsTotal(TotalAmount.toFixed(2));

      //console.log("RHamount : ", RHamount);
      //console.log("TotalAmount : ", TotalAmount);
    } else {
      //console.log("lesser man");
      RHamount = tsTotalHours * tsHrRate;
      settsTotalOt(0);
      settsTotal(RHamount.toFixed(2));
    }
  };

  const onClosePopup = () => {
    setId(0);
    setisHidden(true);
    setOpenPopup(false);
    setisDisabledRemove(true);
    setwhTotal(0);
    setoTtotal(0);
    setIsDisabled(false);
  };

  const calculateTimesheet = () => {
    setIsCalculated(true);
    console.log("CAlculated Timesheet");

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

    if (id > 0) {
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
    }
    return tot;
  };

  useEffect(() => {
    testing();
  }, [tsTotalHours]);

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
            onClick={() => onClosePopup()}
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
          <div className="heading-layout1">
            <div className="item-title">
              <h3 style={{ padding: "50px" }}>Vendor Time sheet</h3>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label htmlfor="userRole">Vendor</label>
                <select
                  class="form-control is-valid"
                  value={tsVendor}
                  id="tsVendor"
                  name="tsVendor"
                  required
                  disabled
                  onChange={handleChangeEvent}
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
                <label htmlfor="userRole">Month</label>
                <select
                  class="form-control is-valid"
                  value={tsMonth}
                  id="tsMonth"
                  name="tsMonth"
                  required
                  disabled
                  onChange={handleChangeEvent}
                >
                  {MonthLov.map((data) => (
                    <option key={data.key} value={data.key}>
                      {data.value}
                    </option>
                  ))}
                </select>
              </div>
              <div class="col-md-4 mb-3">
                <label htmlfor="userRole">Years</label>
                <select
                  class="form-control is-valid"
                  value={tsYear}
                  id="tsYear"
                  name="tsYear"
                  required
                  disabled
                  onChange={handleChangeEvent}
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
                <label htmlfor="userFname">Description</label>
                <textarea
                  type="text"
                  class="form-control is-valid"
                  value={tsDescription}
                  id="tsDescription"
                  name="tsDescription"
                  required
                  onChange={handleChangeEvent}
                />
              </div>
            </div>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label htmlfor="userName">Plot No</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={tsPlotNo}
                  id="tsPlotNo"
                  name="tsPlotNo"
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-4 mb-3">
                <label htmlfor="userName">Operator Name</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={tsOperatorName}
                  id="tsOperatorName"
                  name="tsOperatorName"
                  onChange={handleChangeEvent}
                />
              </div>{" "}
              <div class="col-md-4 mb-3">
                <label htmlfor="userName">Expected Working Hours</label>
                <input
                  type="text"
                  class="form-control is-valid"                  
                  value={tsExpectedWorkingHours}
                  onBlur={testing}
                  id="tsExpectedWorkingHours"
                  name="tsExpectedWorkingHours"
                  required
                  onChange={handleChangeEvent}
                />
              </div>
            </div>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label htmlfor="userName">Monthly Rate</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={tsMonthlyRate}
                  onBlur={testing}
                  id="tsMonthlyRate"
                  name="tsMonthlyRate"
                  required
                  onChange={handleChangeEvent}
                />
              </div>

              <div class="col-md-4 mb-3">
                <label htmlfor="userName">OT Rate</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="tsOtRate"
                  value={tsOtRate}
                  onBlur={testing}
                  name="tsOtRate"
                  required
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-4 mb-3">
                <label htmlfor="userName">HR Rate</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="tsHrRate"
                  value={tsHrRate}
                  onBlur={testing}
                  name="tsHrRate"
                  required
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-4 mb-3">
                <label htmlfor="userName">Total Hours</label>
                <input
                  type="number"
                  class="form-control is-valid"
                  value={tsTotalHours}
                  id="tsTotalHours"
                  onBlur={testing}
                  name="tsTotalHours"
                  required
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-4 mb-3">
                <label htmlfor="userName">Total OT</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="tsTotalOt"
                  value={tsTotalOt}
                  name="tsTotalOt"
                  required
                  disabled
                  onChange={handleChangeEvent}
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
                  onChange={handleChangeEvent}
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
                  >
                    Show
                  </Button>
                  <Button
                    color="default"
                    onClick={() => removeUsers()}
                    disabled={!isDisabled}
                    style={{ marginLeft: "10px" }}
                  >
                    Remove
                  </Button>
                </ButtonGroup>
              </div>
              <div className="col-md-12">
                <span style={{ color: "red" }}>
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
                          name="oTday7"
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
              type="button"
              class="btn btn-outline-success"
              style={{ marginTop: "20px", marginBottom: "40px" }}
              onClick={handleSubmit}
              disabled={checkApproved()}
            >
              Update
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
