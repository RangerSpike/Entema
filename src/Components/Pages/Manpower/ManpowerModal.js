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
  const { setId,id, openPopup, setOpenPopup } = props;

  const classes = useStyles();
  // console.log("id : ", id);

  const [MpDescription, setMpDescription] = useState();
  const [MpIqamaId, setMpIqamaId] = useState();
  const [MpCategory, setMpCategory] = useState();
  const [MpBankName, setMpBankName] = useState();
  const [MpAccountNo, setMpAccountNo] = useState();
  const [MpIbanNumber, setMpIbanNumber] = useState();
  const [MpLocation, setMpLocation] = useState();
  const [MpName, setMpName] = useState();
  const [MpBenificaryName, setMpBenificaryName] = useState();

  const handleChangeEvent = (e) => {
    const input = e.target.name;

    if (input === "MpDescription") {
      setMpDescription(e.target.value);
    } else if (input === "MpIqamaId") {
      setMpIqamaId(e.target.value);
    } else if (input === "MpName") {
      setMpName(e.target.value);
    } else if (input === "MpCategory") {
      setMpCategory(e.target.value);
    } else if (input === "MpBankName") {
      setMpBankName(e.target.value);
    } else if (input === "MpBenificaryName") {
      setMpBenificaryName(e.target.value);
    } else if (input === "MpAccountNo") {
      setMpAccountNo(e.target.value);
    } else if (input === "MpIbanNumber") {
      setMpIbanNumber(e.target.value);
    } else if (input === "MpLocation") {
      setMpLocation(e.target.value);
    }
  };

  useEffect(() => {
    axios
      .post("http://entemadb.entema-software.com/getManpowerDataBasedOnId", {
        mpid: id,
      })
      .then((res) => {
        //setNewData(res.data[0]);
        if (id > 0) {
          setMpDescription(res.data[0].MP_DESC);
          setMpIqamaId(res.data[0].MP_IQAMA_ID);
          setMpName(res.data[0].MP_NAME);
          setMpCategory(res.data[0].MP_CATEGORY);
          setMpBankName(res.data[0].MP_BANK_NAME);
          setMpBenificaryName(res.data[0].MP_BENF_NAME);
          setMpAccountNo(res.data[0].MP_ACCOUNT);
          setMpIbanNumber(res.data[0].MP_IBAN);
          setMpLocation(res.data[0].MP_LOC);
        }
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://entemadb.entema-software.com/updateManpowerData", {
        mpid:id,
        mpname: MpName,
        mpiqamaid: MpIqamaId,
        mpcategory: MpCategory,
        mpbenfname: MpBenificaryName,
        mpbankname: MpBankName,
        mpaccount: MpAccountNo,
        mpiban: MpIbanNumber,
        mploc: MpLocation,
        mpdesc: MpDescription,
      })
      .then((res) => {
      });
      setId(0);
      setOpenPopup(false);
  };

  const onClosePopup =()=>{
    setId(0);
    setOpenPopup(false);
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
              <h3 style={{ padding: "50px" }}>Update Manpower</h3>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="userName">Iqama Id</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={MpIqamaId}
                  id="MpIqamaId"
                  name="MpIqamaId"
                  required
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userName">Name</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={MpName}
                  id="MpName"
                  name="MpName"
                  required
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userName">Category</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={MpCategory}
                  id="MpCategory"
                  name="MpCategory"
                  required
                  onChange={handleChangeEvent}
                />
              </div>
            </div>

            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="userName">Benificary Name</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={MpBenificaryName}
                  id="MpBenificaryName"
                  name="MpBenificaryName"
                  required
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userName">Bank Name</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={MpBankName}
                  id="MpBankName"
                  name="MpBankName"
                  required
                  onChange={handleChangeEvent}
                />
              </div>

              <div class="col-md-4 mb-3">
                <label for="userName">Account No</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={MpAccountNo}
                  id="MpAccountNo"
                  name="MpAccountNo"
                  required
                  onChange={handleChangeEvent}
                />
              </div>
            </div>

            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="userName">Iban Number</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={MpIbanNumber}
                  id="MpIbanNumber"
                  name="MpIbanNumber"
                  required
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userName">Location</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={MpLocation}
                  id="MpLocation"
                  name="MpLocation"
                  required
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-8 mb-3">
                <label for="userFname">Description</label>
                <textarea
                  type="text"
                  class="form-control is-valid"
                  value={MpDescription}
                  id="MpDescription"
                  name="MpDescription"                  
                  onChange={handleChangeEvent}
                />
              </div>
            </div>

            <div></div>
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
