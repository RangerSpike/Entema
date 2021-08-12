// eslint-disable-next-line
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

export default function PopupVP(props) {
  const { setId, id, openPopup, setOpenPopup } = props;

  const classes = useStyles();
  const [pmVendorName, setPmVendorName] = useState();
  const [vendorDispValue, setVendorDispValue] = useState();
  const [pmTimesheet, setPmTimesheet] = useState();
  const [pmAmount, setPmAmount] = useState();
  const [pmMode, setPmMode] = useState();
  const [pmDescription, setPmDescription] = useState();
  const [pmStatus, setPmStatus] = useState();
  const [pmClearedAmt, setPmClearedAmt] = useState();

  const [vendorLov, setVendorLov] = useState([]);
  const [tsLov, setTsLov] = useState([]);

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

  useEffect(() => {
    getVendorLovData();
  }, [id]);

  const getTimeSheetForVendor = (vendorID) => {
    axios
      .post("http://entemadb.entema-software.com/getVenTimesheetDataonVendorId", {
        venId: vendorID,
      })
      .then((res) => {
        //console.log("updated Values Successfully : ", res.data);
        setTsLov(res.data);
      });
    return tsLov;
  };

  const onChangeVendor = (vendorID) => {
    //console.log("onchange value is : ", vendorID);
    let computedComments = vendorLov;

    if (vendorID) {
      computedComments = computedComments.filter(
        (comment) => comment.VENDOR_ID == vendorID
      );
      setVendorDispValue(computedComments[0].VENDOR_NAME);
    }
    //console.log("data set value is : ", computedComments);
  };

  let x;

  const isDisabled = (sts) => {
    if (sts === "Paid") {
      x = true;
    } else {
      x = false;
    }
    return x;
  };

  const onChangeTS = (tsValue) => {
    //console.log("onchange value is : ", tsValue);
    let computedComments = tsLov;

    if (tsValue) {
      computedComments = computedComments.filter(
        (comment) => comment.VTS_ID == tsValue
      );
      setPmAmount(computedComments[0].TS_TOTAL);
    } else {
      setPmAmount(0);
    }
    //console.log("data set value is : ", computedComments);
  };

  const onChangeGlobalValues = (idValue, dataSet, uniqueKeyColumn) => {
    let seggregatedData = dataSet;

    if (idValue) {
      seggregatedData = seggregatedData.filter(
        (comment) => comment.uniqueKeyColumn == idValue
      );
    }
    return seggregatedData;
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

  const [isPaid, setIsPaid] = useState();

  const handleChangeEvent = (e) => {
    //console.log("e : ", e);
    const input = e.target.name;

    //console.log("field name : ", e.target.name + "- value -", e.target.value);

    if (input === "pmVendorName") {
      setPmVendorName(e.target.value);
      onChangeVendor(e.target.value);
      getTimeSheetForVendor(e.target.value);
    } else if (input === "pmTimesheet") {
      setPmTimesheet(e.target.value);
      onChangeTS(e.target.value);
    } else if (input === "pmAmount") {
      setPmAmount(e.target.value);
    } else if (input === "pmMode") {
      setPmMode(e.target.value);
    } else if (input === "pmDescription") {
      setPmDescription(e.target.value);
    } else if (input === "pmStatus") {
      setPmStatus(e.target.value);
    } else if (input === "pmClearedAmt") {
      setPmClearedAmt(e.target.value);
    }
  };
  useEffect(() => {
    axios
      .post("http://entemadb.entema-software.com/getVenPmntDataonId", {
        PMID: id,
      })
      .then((res) => {
        //console.log("TS KA DATA : ", res.data);
        if (res.data.length > 0) {
          setPmVendorName(res.data[0].PM_VEN_DISP_NAME);
          setPmTimesheet(res.data[0].TS_DISP_NAME);
          setPmAmount(res.data[0].PM_AMOUNT);
          setPmMode(res.data[0].PM_PMNT_MODE);
          setPmDescription(res.data[0].PM_DESCRIPTION);
          setPmStatus(res.data[0].PM_STATUS);
          setIsPaid(res.data[0].PM_STATUS);
          setPmClearedAmt(res.data[0].CLEARED_AMOUNT);
        }
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://entemadb.entema-software.com/updateVenPmData", {
        vpmid: id,
        pmamount: pmAmount,
        pmpmntmode: pmMode,
        pmdescription: pmDescription,
        pmstatus: pmStatus,
        pmClearedAmt: pmClearedAmt,
      })
      .then((res) => {
        //console.log("updated Values Successfully : ", res.data);
      });
    //console.log("test submit");
    setId(0);
    setOpenPopup(false);
  };

  const onClose = () => {
    setId(0);
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
                <h3 style={{ padding: "50px" }}>Update Payment</h3>
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
                    type="number"
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
                    type="number"
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
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="userFname">Mode</label>
                  <select
                    class="form-control is-valid"
                    value={pmMode}
                    id="pmMode"
                    name="pmMode"
                    required
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
