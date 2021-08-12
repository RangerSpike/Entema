// eslint-disable-next-line
import React from "react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Popup(props) {
  const { setId, id, openPopup, setOpenPopup } = props;

  //console.log("MODAL ID ", id);

  const classes = useStyles();
  const theme = useTheme();
  const [DnClient, setDnClient] = useState();
  const [DnAddress, setDnAddress] = useState();
  const [DnShippingAddress, setDnShippingAddress] = useState();
  const [DnOrderDate, setDnOrderDate] = useState();
  const [DnDispatchDate, setDnDispatchDate] = useState();
  const [DnNotice, setDnNotice] = useState();
  const [clientLov, setClientLov] = useState([]);

  const getClientLovData = () => {
    fetch("http://entemadb.entema-software.com/getClientData", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setClientLov(response);
        //console.log("My API data : ", response);
      });
    return clientLov;
  };

  useEffect(() => {
    getClientLovData();
  }, []);

  const handleChangeEvent = (e) => {
    //console.log("e : ", e);
    const input = e.target.name;

    //console.log("field name : ", e.target.name + "- value -", e.target.value);

    if (input === "DnClient") {
      setDnClient(e.target.value);
    } else if (input === "DnAddress") {
      setDnAddress(e.target.value);
    } else if (input === "DnShippingAddress") {
      setDnShippingAddress(e.target.value);
    } else if (input === "DnOrderDate") {
      setDnOrderDate(e.target.value);
    } else if (input === "DnDispatchDate") {
      setDnDispatchDate(e.target.value);
    } else if (input === "DnNotice") {
      setDnNotice(e.target.value);
    }
  };

  useEffect(() => {
    axios
      .post("http://entemadb.entema-software.com/getDelNoteBasedOnId", {
        delId: id,
      })
      .then((res) => {
        //console.log("records received", res.data[0]);

        if (id > 0) {
          setDnClient(res.data[0].DEL_CLIENT);
          setDnAddress(res.data[0].DEL_ADD);
          setDnShippingAddress(res.data[0].DEL_SHIP_ADD);
          setDnOrderDate(res.data[0].DEL_ORDER_DATE);
          setDnDispatchDate(res.data[0].DEL_DISP_DATE);
          setDnNotice(res.data[0].DEL_NOTICE);
        }
      });
  }, [id]);

  const handleSubmit = (e) => {
    //e.preventDefault();

    //console.log("FROM SUBMIT", id);

    axios
      .post("http://entemadb.entema-software.com/UpdateDeliveryNote", {
        delId: id,
        delclient: DnClient,
        deladd: DnAddress,
        delshipadd: DnShippingAddress,
        delorderdate: DnOrderDate,
        deldispdate: DnDispatchDate,
        delnotice: DnNotice,
      })
      .then((res) => {
        // setData(res.data);
        //  setDupData(res.data);
        //console.log("result set in effect: ", res);
      });

    setOpenPopup(false);
    setId(0);
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
              <h3 style={{ padding: "50px" }}>Update Delivery Note</h3>
            </div>
          </div>

          <form>
            <div className="row">
              <div class="col-md-6 mb-3">
                <label for="userName">Client</label>
                <select
                  class="form-control is-valid"
                  value={DnClient}
                  id="DnClient"
                  name="DnClient"
                  required
                >
                  <option value="">Client Name</option>
                  {clientLov.map((data) => (
                    <option key={data.CLIENT_ID} value={data.CLIENT_ID}>
                      {data.CLIENT_CPNAME}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div class="col-md-6 mb-3">
                <label for="userFname">Address</label>
                <textarea
                  type="text"
                  class="form-control is-valid"
                  value={DnAddress}
                  id="DnAddress"
                  name="DnAddress"
                  required
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="userFname">Shipping Address</label>
                <textarea
                  type="text"
                  class="form-control is-valid"
                  value={DnShippingAddress}
                  id="DnShippingAddress"
                  name="DnShippingAddress"
                  required
                  onChange={handleChangeEvent}
                />
              </div>
            </div>
            <div className="row">
              <div class="col-md-6 mb-3">
                <label for="userName">Order Date</label>
                <input
                  type="Date"
                  class="form-control is-valid"
                  value={DnOrderDate}
                  id="DnOrderDate"
                  name="DnOrderDate"
                  required
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="userName">Dispatch Date</label>
                <input
                  type="Date"
                  class="form-control is-valid"
                  value={DnDispatchDate}
                  id="DnDispatchDate"
                  name="DnDispatchDate"
                  required
                  onChange={handleChangeEvent}
                />
              </div>
            </div>

            <div className="row">
              <div class="col-md-9 mb-3">
                <label for="userFname">Notice</label>
                <textarea
                  type="text"
                  class="form-control is-valid"
                  value={DnNotice}
                  id="DnNotice"
                  name="DnNotice"
                  required
                  onChange={handleChangeEvent}
                />
              </div>
            </div>
            <div>
              <Button type="button" onClick={handleSubmit} style={{color:"primary"}}>
                UPDATE
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
