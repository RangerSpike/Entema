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
  root: {
    width: "auto",
    height: "auto",
    backgroundColor: theme.palette.grey[300],
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  inputGroup: {
    minWidth: 120,
  },
}));

export default function Popup(props) {
  const { id, openPopup, setOpenPopup } = props;

  const classes = useStyles();

  const [AcActivityName, setAcActivityName] = useState();
  const [AcCreatedDate, setAcCreatedDate] = useState();
  const [AcEndDate, setAcEndDate] = useState();
  const [AcDescription, setAcDescription] = useState();

  const handleChangeEvent = (e) => {
    const input = e.target.name;

    if (input === "AcActivityName") {
      setAcActivityName(e.target.value);
    } else if (input === "AcCreatedDate") {
      setAcCreatedDate(e.target.value);
    } else if (input === "AcEndDate") {
      setAcEndDate(e.target.value);
    } else if (input === "AcDescription") {
      setAcDescription(e.target.value);
    }
  };
  useEffect(() => {
    axios
      .post("https://mssoftware.xyz/getActivitiesDataBasedOnId", {
        actid: id,
      })
      .then((res) => {
        ///setNewData(res.data[0]);
        if (id > 0) {
          setAcActivityName(res.data[0].ACT_NAME);
          setAcCreatedDate(res.data[0].CREATED_DATE);
          setAcEndDate(res.data[0].ACT_END_DATE);
          setAcDescription(res.data[0].ACT_DESCRIPTION);
        }
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://mssoftware.xyz/updateActivityData", {
        actid: id,
        actname: AcActivityName,
        actenddate: AcEndDate,
        actdescription: AcDescription,
      })
      .then((res) => {});
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
            Close
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <div
          class="container"
          style={{ paddingTop: "30px", paddingLeft: "50px" }}
        >
          <div className="scroll">
            <div className="heading-layout1">
              <div className="item-title">
                <h3 style={{ padding: "50px" }}>Activity</h3>
              </div>
            </div>
            <form>
              <div className="row">
                <div class="col-md-4 mb-3">
                  <label for="userName">Activity Name</label>
                  <input
                    type="text"
                    class="form-control is-valid"
                    value={AcActivityName}
                    id="AcActivityName"
                    name="AcActivityName"
                    required
                    onChange={handleChangeEvent}
                  />
                </div>
              </div>

              <div className="row">
                <div class="col-md-4 mb-3">
                  <label for="userName">Created Date</label>
                  <input
                    type="Date"
                    class="form-control is-valid"
                    value={AcCreatedDate}
                    id="AcCreatedDate"
                    name="AcCreatedDate"
                    disabled
                    onChange={handleChangeEvent}
                  />
                </div>
                <div class="col-md-4 mb-3">
                  <label for="userName">End Date</label>
                  <input
                    type="Date"
                    class="form-control is-valid"
                    value={AcEndDate}
                    id="AcEndDate"
                    name="AcEndDate"
                    onChange={handleChangeEvent}
                  />
                </div>
              </div>

              <div className="row">
                <div class="col-md-8 mb-3">
                  <label for="userFname">Description</label>
                  <textarea
                    type="text"
                    class="form-control is-valid"
                    value={AcDescription}
                    id="AcDescription"
                    name="AcDescription"
                    required
                    onChange={handleChangeEvent}
                  />
                </div>
              </div>
              <div>
              <button
                type="submit"
                class="btn btn-outline-success"
                style={{ marginTop: "20px", marginBottom: "20px" }}
                onClick={handleSubmit}
              >
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
