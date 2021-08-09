import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
} from "@material-ui/core";
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
}));

export default function PopupVPR(props) {
  const { setId, setRefresh, refresh, venId, tsId, openPopup, setOpenPopup } =
    props;

  const classes = useStyles();

  const [pmVendorName, setPmVendorName] = useState();
  const [pmVendorId, setPmVendorId] = useState();
  const [pmTimesheet, setPmTimesheet] = useState();
  const [pmTimesheetId, setPmTimesheetId] = useState();

  const [pmAmount, setPmAmount] = useState();
  const [pmMode, setPmMode] = useState();
  const [pmDescription, setPmDescription] = useState();
  const [pmStatus, setPmStatus] = useState("Request");
  const [pmClearedAmt, setPmClearedAmt] = useState();

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

  useEffect(() => {
    axios
      .post("http://mssoftware.xyz/getVenTimesheetDataBasedonId", {
        vtsId: tsId,
      })
      .then((res) => {
        console.log("TS KA DATA : ", res.data);
        if (res.data.length > 0) {
          setPmVendorName(res.data[0].TS_VENDOR_DISP_NAME);
          setPmTimesheet(
            setTimeSheetName(res.data[0].TS_MONTH, res.data[0].TS_YEAR)
          );
          setPmAmount(res.data[0].TS_TOTAL);
          setPmMode(res.data[0].PM_PMNT_MODE ? res.data[0].PM_PMNT_MODE : "");
          setPmDescription(res.data[0].PM_DESCRIPTION);
          setPmStatus("Request");
          setPmVendorId(res.data[0].TS_VENDOR);
          setPmTimesheetId(tsId);
        }
      });
  }, [tsId]);

  const setTimeSheetName = (month, year) => {
    return monthDispValue(month) + "-" + year;
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
    //console.log("switch value : ", output);
    return output;
  };

  const handleChangeEvent = (e) => {
    //console.log("e : ", e);
    const input = e.target.name;

    //console.log("field name : ", e.target.name + "- value -", e.target.value);

    if (input === "pmVendorName") {
      setPmVendorName(e.target.value);
      //onChangeVendor(e.target.value);
      //getTimeSheetForVendor(e.target.value);
    } else if (input === "pmTimesheet") {
      setPmTimesheet(e.target.value);
      //onChangeTS(e.target.value);
      //validatePayments(e.target.value);
    } else if (input === "pmAmount") {
      setPmAmount(e.target.value);
    } else if (input === "pmMode") {
      setPmMode(e.target.value);
    } else if (input === "pmDescription") {
      setPmDescription(e.target.value);
    } else if (input === "pmStatus") {
      setPmStatus(e.target.value);
    } else if (input === "pmStatus") {
      setPmClearedAmt(e.target.value);
    } else if (input === "pmClearedAmt") {
      setPmClearedAmt(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    axios
      .post("http://mssoftware.xyz/updateVenTsRequestStatus", {
        vtsid: tsId,
        reqsts: "Requested",
      })
      .then((res) => {
        //console.log("updated Values Successfully : ", res.data);
      });

    e.preventDefault();

    axios
      .post("http://mssoftware.xyz/insertVendorPaymentData", {
        pmvenname: pmVendorId,
        pmvendispname: pmVendorName,
        pmvents: pmTimesheetId,
        pmamount: pmAmount,
        pmpmntmode: pmMode,
        pmdescription: pmDescription,
        pmstatus: pmStatus,
        pmClearedAmt: pmClearedAmt,
        pmtsDispName: pmTimesheet,
      })
      .then((res) => {
        //console.log("updated Values Successfully : ", res.data);
      });
    //console.log("test submit");
    setId(0);
    setPmClearedAmt();
    setOpenPopup(false);
    setRefresh(!refresh);
  };

  const onClose = () => {
    setId(0);
    setPmClearedAmt();
    setRefresh(!refresh);
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
            onClick={() => onClose()}
            style={{ flex: "end" }}
          >
            Close
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <div class="scrollbar square scrollbar-lady-lips thin">
          <div
            class="container"
            style={{ paddingTop: "30px", paddingLeft: "50px" }}
          >
            <div className="heading-layout1">
              <div className="item-title">
                <h3 style={{ padding: "50px" }}>Vendor Add Payment</h3>
              </div>
            </div>
            <form onSubmit={handleSubmit} onChange={handleChangeEvent}>
              <div className="row">
                <div class="col-md-6 mb-3">
                  <label for="userName">Vendor</label>
                  <input
                    type="text"
                    class="form-control is-valid"
                    value={pmVendorName}
                    id="pmVendorName"
                    name="pmVendorName"
                    required
                    disabled
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="userName">Timesheet</label>
                  <input
                    type="text"
                    class="form-control is-valid"
                    value={pmTimesheet}
                    id="pmTimesheet"
                    name="pmTimesheet"
                    required
                    disabled
                  />
                </div>
              </div>
              <div className="row">
                <div class="col-md-6 mb-3">
                  <label for="userName">Amount</label>
                  <input
                    type="text"
                    class="form-control is-valid"                  
                    value={pmAmount}
                    id="pmAmount"
                    name="pmAmount"
                    required
                    disabled
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="userName">Cleared Amount</label>
                  <input
                    type="text"
                    class="form-control is-valid"
                    value={pmClearedAmt}
                    id="pmClearedAmt"
                    name="pmClearedAmt"
                  />
                </div>
              </div>
              <div className="row">
                <div class="col-md-6 mb-3">
                  <label for="userFname">Description</label>
                  <textarea
                    type="text"
                    class="form-control is-valid"
                    value={pmDescription}
                    id="pmDescription"
                    name="pmDescription"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="userFname">Mode</label>
                  <select
                    class="form-control is-valid"
                    value={pmMode}
                    id="pmMode"
                    name="pmMode"
                    required={true}
                  >
                    {modeOptions.map((data) => (
                      <option key={data.key} value={data.value}>
                        {data.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="userName">Status</label>
                  <select
                    class="form-control is-valid"
                    value={pmStatus}
                    id="pmStatus"
                    name="pmStatus"
                    required
                    disabled
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
                <button type="submit" class="btn btn-outline-success">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
