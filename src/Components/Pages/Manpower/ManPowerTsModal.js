import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
} from "@material-ui/core";
import { Container, Grid, TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
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

export default function Popup(props) {
  const { setId,id, openPopup, setOpenPopup } = props;

  const classes = useStyles();

  const [MpManPower, setMpManPower] = useState();
  const [manpowDispValue, setManpowDispValue] = useState();
  const [MpMonth, setMpMont] = useState();
  const [MpYear, setMpYear] = useState();
  const [MpDescription, setMpDescription] = useState();
  const [MpIqamaId, setMpIqamaId] = useState();
  const [MpOtHrs, setMpOtHrs] = useState();
  const [MpOtRate, setMpOtRate] = useState();
  const [MpTotalAmount, setMpTotalAmount] = useState();
  const [MpTotalOt, setMpTotalOt] = useState();
  const [MpTotal, setMpTotal] = useState();
  const [MpWorkHrs, setMpWorkHrs] = useState();
  const [MpHrRate, setMpHrRate] = useState();
  const [regularhrs, setRegularhrs] = useState();
  const [mpLov, setMPLov] = useState([]);
  const [yearLov, setYearLov] = useState([]);

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

  const getMPLovData = () => {
    fetch("http://mssoftware.xyz/getManpowerData", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setMPLov(response);
        //console.log("My API data : ", response);
      });
    return mpLov;
  };

  const onChangeMPData = (value) => {
    //console.log("onchange value is : ", value);
    let computedComments = mpLov;
    //console.log("onchange computedComments is : ", computedComments);
    if (value) {
      computedComments = computedComments.filter(
        (comment) => comment.MP_ID == value
      );

      setManpowDispValue(computedComments[0].MP_NAME);
      //console.log(computedComments[0].MP_NAME);
    }
  };

  useEffect(() => {
    getMPLovData();
    getYearLovData();
  }, []);

  useEffect(() => {
    axios
      .post("http://mssoftware.xyz/getMPTSDataonId", {
        TSID: id,
      })
      .then((res) => {
        //setNewData(res.data[0]);
        if (id > 0) {
          //console.log("THISIS RESS ", res.data);
          setMpManPower(res.data[0].MTS_MANPOWER);
          setMpMont(res.data[0].MTS_MONTH);
          setMpYear(res.data[0].MTS_YEAR);
          setMpDescription(res.data[0].MTS_DESCRIPTION);
          setMpIqamaId(res.data[0].MTS_IQAMA);
          setMpOtHrs(res.data[0].MTS_OT_HOURS);
          setMpOtRate(res.data[0].MTS_OT_RATE);
          setMpTotalAmount(res.data[0].MTS_TOTAL);
          setMpWorkHrs(res.data[0].MTS_WORKHOURS);
          setMpHrRate(res.data[0].MTS_HR_RATE);
        }
      });
  }, [id]);

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

  const [isInputHidden29, setIsInputHidden29] = useState(false);
  const [isInputHidden30, setIsInputHidden30] = useState(false);
  const [isInputHidden31, setIsInputHidden31] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledRemove, setisDisabledRemove] = useState(false);

  const checkCalendarDays = (month, year) => {
    /*assuming month = 3 and year = 2021 (make sure when you select march your variable returns you in number that is 3)*/
    return new Date(year, month, 0).getDate();
  };

  const onYearChange = (value) => {
    axios
      .post("http://mssoftware.xyz/getMPTimesheetValidation", {
        pManpower: MpManPower,
        pMonth: MpMonth,
        pYear: value,
      })
      .then((res) => {
        //console.log("My onchange year value : ", res.data[0].validate);

        if (res.data[0].validate > 0) {
          alert(
            "You have already generated timesheet for this MAnpower for the same Month and Year, Either Update the Value through report or create a New one"
          );
          setMpManPower("");
          setMpMont("");
          setMpYear("");
        }
      });
  };

  const handleChangeEvent = (e, index) => {
    //console.log("e : ", e);
    const input = e.target.name;

    //console.log("field name : ", e.target.name + "- value -", e.target.value);

    if (input === "MpManPower") {
      setMpManPower(e.target.value);
      onChangeMPData(e.target.value);
    } else if (input === "MpMonth") {
      setMpMont(e.target.value);
    } else if (input === "MpYear") {
      setMpYear(e.target.value);
      onYearChange(e.target.value);
    } else if (input === "MpDescription") {
      setMpDescription(e.target.value);
    } else if (input === "MpIqamaId") {
      setMpIqamaId(e.target.value);
    } else if (input === "MpWorkHrs") {
      setMpWorkHrs(e.target.value);
    } else if (input === "MpOtHrs") {
      setMpOtHrs(e.target.value);
    } else if (input === "MpOtRate") {
      setMpOtRate(e.target.value);
    } else if (input === "MpHrRate") {
      setMpHrRate(e.target.value);
    } else if (input === "MpTotalAmount") {
      setMpTotalAmount(e.target.value);
    } else if (input === "MpTotalOt") {
      setMpTotalOt(e.target.value);
    } else if (input === "MpTotal") {
      setMpTotal(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    // e.preventDefault();

    axios
      .post("http://mssoftware.xyz/updateManPTimesheetData", {
        mmtsid: id,
        mtsdescription: MpDescription,
        mtsiqama: MpIqamaId,
        mtsworkhours: MpWorkHrs,
        mtsothours: MpOtHrs,
        mtshrrate: MpHrRate,
        mtsotrate: MpOtRate,
        mtstotal: MpTotalAmount,
        mtsgrid: true,
      })
      .then((res) => {
        //console.log("updated Values Successfully : ", res.data);
      });

    setOpenPopup(false);
    setId(0);
    //console.log("test submit");
  };

  const onBlurr = () => {
    if (MpHrRate === MpOtRate) {
      setMpTotalAmount(MpWorkHrs * MpHrRate);
    } else {
      let x = MpWorkHrs - MpOtHrs;
      //console.log("x ki calue ", x);
      setRegularhrs(x);
      let otAmount = MpOtHrs * MpOtRate;
      let hrAmount = MpHrRate * regularhrs;
      setMpTotalAmount(otAmount + hrAmount);
    }
  };
const onclosePopup = ()=>{
  setOpenPopup(false);
  setId(0);
}
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
            onClick={() => onclosePopup()}
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
              <h3 style={{ padding: "50px" }}>Manpower Timesheet</h3>
            </div>
          </div>
          <form onChange={handleChangeEvent} onSubmit={handleSubmit}>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="MpManPower">ManPower</label>
                <select
                  class="form-control is-valid"
                  value={MpManPower}
                  id="MpManPower"
                  name="MpManPower"
                  required
                  disabled
                >
                  <option value="">Select ManPower</option>
                  {mpLov.map((data) => (
                    <option key={data.MP_ID} value={data.MP_ID}>
                      {data.MP_NAME}
                    </option>
                  ))}
                </select>
              </div>
              <div class="col-md-4 mb-3">
                <label for="MpMonth">Month</label>
                <select
                  class="form-control is-valid"
                  value={MpMonth}
                  id="MpMonth"
                  name="MpMonth"
                  required
                  disabled
                >
                  {MonthLov.map((data) => (
                    <option key={data.key} value={data.key}>
                      {data.value}
                    </option>
                  ))}
                </select>
              </div>
              <div class="col-md-4 mb-3">
                <label for="MpYear">Years</label>
                <select
                  class="form-control is-valid"
                  value={MpYear}
                  id="MpYear"
                  name="MpYear"
                  required
                  disabled
                >
                  <option value="">Select Year</option>
                  {yearLov.map((data) => (
                    <option key={data.ID} value={data.ID}>
                      {data.YEAR}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              <div class="col-md-8 mb-3">
                <label for="MpDescription">Description</label>
                <textarea
                  type="text"
                  class="form-control is-valid"
                  value={MpDescription}
                  id="MpDescription"       
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="MpIqamaId">Iqama Id</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={MpIqamaId}
                  id="MpIqamaId"
                  name="MpIqamaId"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="MpWorkHrs">Work Hrs</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={MpWorkHrs}
                  id="MpWorkHrs"
                  name="MpWorkHrs"
                  onBlur={(e) => onBlurr(e)}
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="MpOtHrs">Ot Hrs</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={MpOtHrs}
                  id="MpOtHrs"
                  name="MpOtHrs"
                  required
                  onBlur={(e) => onBlurr(e)}
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="MpHrRate">Hr Rate</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={MpHrRate}
                  id="MpHrRate"
                  name="MpHrRate"
                  required
                  onBlur={(e) => onBlurr(e)}
                />
              </div>{" "}
            </div>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="MpOtRate">Ot Rate</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={MpOtRate}
                  id="MpOtRate"
                  name="MpOtRate"
                  required
                  onBlur={(e) => onBlurr(e)}
                />
              </div>

              <div class="col-md-4 mb-3">
                <label for="MpTotalAmount">Total Amount</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={MpTotalAmount}
                  id="MpTotalAmount"
                  name="MpTotalAmount"
                  required
                  disabled
                  onBlur={(e) => onBlurr(e)}
                />
              </div>
            </div>

            <button
              type="button"
              class="btn btn-outline-success"
              style={{ marginTop: "20px", marginBottom: "40px" }}
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
