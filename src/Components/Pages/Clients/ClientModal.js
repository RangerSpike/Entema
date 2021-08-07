import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
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

export default function Popup(props) {
  const { setId, id, openPopup, setOpenPopup } = props;

  // console.log("FROM MODAL WINDOW ", id);
  const classes = useStyles();

  const [clientcpname, setClientcpname] = useState();
  const [clientcompname, setClientcompname] = useState();
  const [clientphone, setClientphone] = useState();
  const [clientemail, setClientemail] = useState();
  const [clientadd, setClientadd] = useState();
  const [createdby, setCreatedby] = useState();

  useEffect(() => {
    axios
      .post("http://mssoftware.xyz/getClientBasedOnId", {
        clientID: id,
      })
      .then((res) => {
        // console.log("records received ", res.data[0]);

        if (id > 0) {
          setClientcpname(res.data[0].CLIENT_CPNAME);
          setClientcompname(res.data[0].CLIENT_COMP_NAME);
          setClientphone(res.data[0].CLIENT_PHONE);
          setClientemail(res.data[0].CLIENT_EMAIL);
          setClientadd(res.data[0].CLIENT_ADD);
          setCreatedby(res.data[0].CLIENT_CREATED_BY);
        }
      });
  }, [id]);

  const handleChangeEvent = (e) => {
    const input = e.target.name;

    if (input === "clientcpname") {
      setClientcpname(e.target.value);
    } else if (input === "clientcompname") {
      setClientcompname(e.target.value);
    } else if (input === "clientphone") {
      setClientphone(e.target.value);
    } else if (input === "clientemail") {
      setClientemail(e.target.value);
    } else if (input === "clientadd") {
      setClientadd(e.target.value);
    }
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    // console.log("event : ", event);
    // console.log("FROM SUBMIT", id);
    axios
      .post("http://mssoftware.xyz/UpdateClientData", {
        clientID: id,
        clientcpname: clientcpname,
        clientcompname: clientcompname,
        clientphone: clientphone,
        clientemail: clientemail,
        clientadd: clientadd,
      })
      .then((res) => {
        setId(0);
        // setData(res.data);
        //  setDupData(res.data);
        // console.log("result set in effect: ", res);
      });

    setOpenPopup(false);
  };
  const onClosePopup = () => {
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
              <h4 style={{ paddingBottom: "10px" }}>Add Client</h4>
            </div>
          </div>
          <div className="scroll">
            <form>
              <div className="row">
                <div class="col-md-6 mb-3">
                  <label for="userName">Contact Person Name</label>
                  <input
                    type="text"
                    class="form-control is-valid"
                    id="clientcpname"
                    name="clientcpname"
                    required
                    value={clientcpname}
                    onChange={handleChangeEvent}
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="userName">Company Name</label>
                  <input
                    type="text"
                    class="form-control is-valid"
                    id="clientcompname"
                    name="clientcompname"
                    required
                    value={clientcompname}
                    onChange={handleChangeEvent}
                  />
                </div>
              </div>
              <div className="row">
                <div class="col-md-6 mb-3">
                  <label for="userName">Mobile</label>
                  <input
                    type="text"
                    class="form-control is-valid"
                    id="clientphone"
                    name="clientphone"
                    required
                    value={clientphone}
                    onChange={handleChangeEvent}
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="userName">Email</label>
                  <input
                    type="text"
                    class="form-control is-valid"
                    id="clientemail"
                    name="clientemail"
                    required
                    value={clientemail}
                    onChange={handleChangeEvent}
                  />
                </div>
              </div>
              <div class="col-md-8 mb-3">
                <label for="userFname">Address</label>
                <textarea
                  type="text"
                  class="form-control is-valid"
                  id="clientadd"
                  name="clientadd"
                  required
                  value={clientadd}
                  onChange={handleChangeEvent}
                />
              </div>

              <div>
                <button
                  type="button"
                  class="btn btn-outline-success"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
