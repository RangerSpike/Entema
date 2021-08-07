import React from "react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 690,
    maxWidth: 700,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Popup(props) {
  const { id, openPopup, setOpenPopup } = props;

  //console.log("MODAL ID ", id);

  const classes = useStyles();

  const [PmManpowerName, setPmManpowerName] = useState();
  const [PmManpowerTimesheet, setPmManpowerTimesheet] = useState();
  const [PmManpowerAmount, setPmManpowerAmount] = useState();
  const [PmManpowerMode, setPmManpowerMode] = useState();
  const [PmManpowerDescription, setPmManpowerDescription] = useState();
  const [PmManpowerStatus, setPmManpowerStatus] = useState();
  const [pmDisplayvalue, setpmDisplayvalue] = useState();
  const [pmtsDispName, setPmtsDispName] = useState();

  const [mpnameLov, setMpNameLov] = useState([]);
  const [mptimesheetLov, setMptimesheetLov] = useState([]);

  const modeOptions = [
    { key: "", value: "Select Payment Mode" },
    { key: "Cash", value: "Cash" },
    { key: "Bank", value: "Bank" },
  ];

  const statusOptions = [
    { key: "", value: "Select Status" },
    { key: "Advance", value: "Advance" },
    { key: "Approved", value: "Approved" },
    { key: "Paid", value: "Paid" },
    { key: "Request", value: "Request" },
  ];

  const getMpLovData = () => {
    fetch("http://mssoftware.xyz/getManpowerData", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setMpNameLov(response);
        //console.log("My API data : ", response);
      });
    return mpnameLov;
  };

  useEffect(() => {
    axios
      .post("http://mssoftware.xyz/getManpowerPmntDataBasedOnId", {
        mppmid: id,
      })
      .then((res) => {
        //console.log("DATADTATDA : ", res.data);
        if (id > 0) {
          setPmManpowerName(res.data[0].PM_NAME);
          setPmManpowerTimesheet(res.data[0].TS_DISP_NAME);
          setPmManpowerAmount(res.data[0].PM_AMOUNT);
          setPmManpowerMode(res.data[0].PM_PMNT_MODE);
          setPmManpowerDescription(res.data[0].PM_DESCRIPTION);
          setPmManpowerStatus(res.data[0].PM_STATUS);          
        }
      });
  }, [id]);

  useEffect(() => {
    getMpLovData();
    getMPtimesheetLovData(id);
  }, []);

  const getMPtimesheetLovData = (MMPID) => {
    axios
      .post("http://mssoftware.xyz/getMPtimesheetdataBasedOnId", {
        mmtsid: MMPID,
      })
      .then((res) => {
        setMptimesheetLov(res.data);
      });
    return mptimesheetLov;
  };

  const onChangeMpData = (value) => {
    //console.log("onchange value is hiii : ", value);
    //console.log("MP NAME :LOV +++ ", mpnameLov);
    let computedComments = mpnameLov;

    if (value) {
      computedComments = computedComments.filter(
        (comment) => comment.MP_ID == value
      );
      //console.log("COMPUTER ::: ", computedComments);

      setpmDisplayvalue(computedComments[0].MP_NAME);
      //console.log("DISP CAL :", pmDisplayvalue);
    }
  };

  const onChangeTS = (tsValue) => {
    //console.log("onchange value is : ", tsValue);
    let computedComments = mptimesheetLov;

    if (tsValue) {
      computedComments = computedComments.filter(
        (comment) => comment.MMTS_ID == tsValue
      );
      
      setPmManpowerAmount(computedComments[0].MTS_TOTAL);
    } else {
      setPmManpowerAmount(0);
    }
    //console.log("data set value is : ", computedComments);
  };
  const monthDispValue = (value) => {
    let output;

    switch (parseInt(value)) {
      case 1:
        output = "Jan";
        break;
      case 2:
        output = "Feb";
        break;
      case 3:
        output = "Mar";
        break;
      case 4:
        output = "Apr";
        break;
      case 5:
        output = "May";
        break;
      case 6:
        output = "Jun";
        break;
      case 7:
        output = "Jul";
        break;
      case 8:
        output = "Aug";
        break;
      case 9:
        output = "Sep";
        break;
      case 10:
        output = "Oct";
        break;
      case 11:
        output = "Nov";
        break;
      case 12:
        output = "Dec";
    }
    return output;
  };

  const handleChangeEvent = (e) => {
    const input = e.target.name;

    //console.log("field name : ", e.target.name + "- value -", e.target.value);
    if (input === "PmManpowerName") {
      setPmManpowerName(e.target.value);
      onChangeMpData(e.target.value);
    } else if (input === "PmManpowerTimesheet") {
      onChangeTS(e.target.value);
      setPmManpowerTimesheet(e.target.value);
    } else if (input === "PmManpowerAmount") {
      setPmManpowerAmount(e.target.value);
    } else if (input === "PmManpowerMode") {
      setPmManpowerMode(e.target.value);
    } else if (input === "PmManpowerDescription") {
      setPmManpowerDescription(e.target.value);
    } else if (input === "PmManpowerStatus") {
      setPmManpowerStatus(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("test submit", pmDisplayvalue);
    axios
      .post("http://mssoftware.xyz/updateManpowerPaymentData", {
        pmntid: id,      
        pmmode: PmManpowerMode,
        mppmbesc: PmManpowerDescription,
        mppmsts: PmManpowerStatus,        
      })
      .then((res) => {
        //console.log("updated Values Successfully : ", res.data);
      });
    setOpenPopup(false);
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
            onClick={() => setOpenPopup(false)}
            style={{ flex: "end" }}
          >
            close
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
    
        <div
          class="container"
          style={{ paddingTop: "30px", paddingLeft: "30px" }}
        >
          <div className="heading-layout1">
            <div className="item-title">
              <h3 style={{ padding: "50px" }}>ManPower Add Payment</h3>
            </div>
          </div>
          <form >
            <div className="row">
              <div class="col-md-6 mb-3">
                <label for="PmManpowerName">ManPower Name</label>
                <select
                  class="form-control is-valid"
                  id="PmManpowerName"
                  name="PmManpowerName"
                  value={PmManpowerName}
                  required
                  onChange={handleChangeEvent}
                  disabled  
                >
                  <option key="" value="">
                    Select ManPower
                  </option>
                  {mpnameLov.map((data) => (
                    <option key={data.MP_ID} value={data.MP_ID}>
                      {data.MP_NAME}
                    </option>
                  ))}
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label for="PmManpowerTimesheet">ManPower Timesheet</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={PmManpowerTimesheet}
                  id="PmManpowerAmount"
                  name="PmManpowerAmount"
                  required
                  onChange={handleChangeEvent}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div class="col-md-6 mb-3">
                <label for="PmManpowerAmount">Amount</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={PmManpowerAmount}
                  id="PmManpowerAmount"
                  name="PmManpowerAmount"
                  required
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="PmManpowerMode">Mode</label>
                <select
                  class="form-control is-valid"
                  id="PmManpowerMode"
                  name="PmManpowerMode"
                  value={PmManpowerMode}
                  required
                  onChange={handleChangeEvent}
                >
                  {modeOptions.map((data) => (
                    <option key={data.key} value={data.value}>
                      {data.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div class="col-md-6 mb-3">
                <label for="userFname">Description</label>
                <textarea
                  type="text"
                  class="form-control is-valid"
                  value={PmManpowerDescription}
                  id="PmManpowerDescription"
                  name="PmManpowerDescription"
                  required
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="userName">Status</label>
                <select
                  class="form-control is-valid"
                  id="PmManpowerStatus"
                  name="PmManpowerStatus"
                  value={PmManpowerStatus}
                  required
                  onChange={handleChangeEvent}
                >              
                  {statusOptions.map((data) => (
                    <option key={data.key} value={data.value}>
                      {data.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button type="button" class="btn btn-outline-success" onClick={handleSubmit}>
                Update
              </button>
            </div>
          </form>
        </div>
        
      </DialogContent>
    </Dialog>
  );
}
