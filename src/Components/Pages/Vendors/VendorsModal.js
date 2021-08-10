// eslint-disable-next-line
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useState, useEffect } from "react";
import { Container, Grid, TextField, IconButton } from "@material-ui/core";
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
  const {setId, id, openPopup, setOpenPopup } = props;

  const classes = useStyles();
  // console.log(id);

  const [vendorname, setVendorname] = useState();
  const [vendorcode, setVendorcode] = useState();
  const [vendorfline, setVendorfline] = useState();
  const [vendoradd, setVendoradd] = useState();
  const [vendorcperson, setVendorcperson] = useState();
  const [vendorphone, setVendorphone] = useState();
  const [vendoremail, setVendoremail] = useState();
  const [vendorbfname, setVendorbfname] = useState();
  const [vendorbankname, setVendorbankname] = useState();
  const [vendorbankacc, setVendorbankacc] = useState();
  const [vendoriban, setVendoriban] = useState();
  const [vendorvat, setVendorvat] = useState();
  const [vendordocno, setVendordocno] = useState();
  const [createdby, setCreatedby] = useState("Mazhar");
  const [vendorstatus, setVendorstatus] = useState("Active");

  // const vatTemplate = {
  //   vatsdate: "",
  //   vat: "",
  //   vatedate: "",
  // };
  // const [data, setData] = useState([vatTemplate]);
  // let newData = [];
  // let test = [];

  useEffect(() => {
    axios
      .post("http://mssoftware.xyz/getVendorIDData", {
        vendorID: id,
      })
      .then((res) => {
        // console.log("FROM MODAL:", res.data[0]);

        if (id > 0) {
          setVendorname(res.data[0].VENDOR_NAME);
          setVendorcode(res.data[0].VENDOR_CODE);
          setVendorfline(res.data[0].VENDOR_FL_PHONE);
          setVendoradd(res.data[0].VENDOR_ADD);
          setVendorcperson(res.data[0].VENDOR_CPERSON);
          setVendorphone(res.data[0].VENDOR_PHONE);
          setVendoremail(res.data[0].VENDOR_EMAIL);
          setVendorbfname(res.data[0].VENDOR_BFNAME);
          setVendorbankname(res.data[0].VENDOR_BANK_NAME);
          setVendorbankacc(res.data[0].VENDOR_BANK_ACC);
          setVendoriban(res.data[0].VENDOR_IBAN);
          setVendorvat(res.data[0].VENDOR_VAT);
          setVendordocno(res.data[0].VENDOR_DOC_NO);
        }
        // axios
        //   .post("https://mssoftware.xyz/getVatDataOnID", {
        //     vendorID: id,
        //   })
        //   .then((res) => {
        //     console.log(res.data);
        //     newData = res.data;

        //     var x = newData.length;
        //     var rows = [];

        //     for (var i = 0; i < x; i++) {
        //       rows.push(vatTemplate);

        //       test[i] = {
        //         vatsdate: newData[i].VEN_START_DATE,
        //         vat: newData[i].VAT,
        //         vatedate: newData[i].VEN_END_DATE,
        //       };
        //     }
        //     setData(test);
        //   });
      });
  }, [id]);

  // const onChange = (e, index) => {
  //   const updatedUsers = data.map((data, i) =>
  //     index === i
  //       ? Object.assign(data, { [e.target.name]: e.target.value })
  //       : data
  //   );
  //   console.log("newnew:", e.target.value);
  //   setData(updatedUsers);
  // };

  const handleChangeEvent = (e) => {
    // console.log("e.target.name : ", e.target.value);
    // return (e.target.name = e.target.value);

    const input = e.target.name;

    if (input === "vendorname") {
      setVendorname(e.target.value);
    } else if (input === "vendorcode") {
      setVendorcode(e.target.value);
    } else if (input === "vendorfline") {
      setVendorfline(e.target.value);
    } else if (input === "vendoradd") {
      setVendoradd(e.target.value);
    } else if (input === "vendorcperson") {
      setVendorcperson(e.target.value);
    } else if (input === "vendorphone") {
      setVendorphone(e.target.value);
    } else if (input === "vendoremail") {
      setVendoremail(e.target.value);
    } else if (input === "vendorbfname") {
      setVendorbfname(e.target.value);
    } else if (input === "vendorbankname") {
      setVendorbankname(e.target.value);
    } else if (input === "vendorbankacc") {
      setVendorbankacc(e.target.value);
    } else if (input === "vendoriban") {
      setVendoriban(e.target.value);
    } else if (input === "vendorvat") {
      setVendorvat(e.target.value);
    } else if (input === "vendordocno") {
      setVendordocno(e.target.value);
    } else if (input === "vendorstatus") {
      setVendorstatus(e.target.value);
    }
  };
  // const removeUsers = (index) => {
  //   console.log("index value :", index);
  //   const filteredUsers = [...data];
  //   filteredUsers.splice(index, 1);

  //   setData(filteredUsers);
  // };

  // const addData = (data) => {
  //   setData([...data, vatTemplate]);
  //   // let x = data.length;
  //   // let setDate = setDateFormat();
  //   // if ((x = data.length)) {
  //   //   data[x - 1].vatedate = setDate;
  // };

  const handleSubmit = (event) => {
    // event.preventDefault();
    // console.log("event : ", event);
    axios
      .post("http://mssoftware.xyz/updateVendorData", {
        v_id: id,
        vendorname: vendorname,
        vendorcode: vendorcode,
        vendorphone: vendorphone,
        vendoradd: vendoradd,
        vendorcperson: vendorcperson,
        vendorfline: vendorfline,
        vendoremail: vendoremail,
        vendorbfname: vendorbfname,
        vendorbankname: vendorbankname,
        vendorbankacc: vendorbankacc,
        vendoriban: vendoriban,
        vendorvat: vendorvat,
        vendordocno: vendordocno,
        vendorstatus: vendorstatus,
      })
      .then((res) => {
        // console.log("hi THere from update", data);
        // setData(res.data);
        //  setDupData(res.data);
        // console.log("result set in effect: ", res);
      });
    setId(0);
    setOpenPopup(false);
  };
const onClosePopup =()=>{
  setId(0);
  setOpenPopup(false)
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
              <h3 style={{ padding: "50px" }}>Add Vendors</h3>
            </div>
          </div>
          <form>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="userName">Vendor Name</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="vendorname"
                  name="vendorname"
                  required
                  value={vendorname}
                  onChange={handleChangeEvent}
                />
              </div>

              <div class="col-md-4 mb-3">
                <label for="userFname">Code</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="vendorcode"
                  name="vendorcode"
                  value={vendorcode}
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userName">Phone Number</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="vendorfline"
                  name="vendorfline"
                  value={vendorfline}
                  onChange={handleChangeEvent}
                />
              </div>
            </div>
            <div class="col-md-8 mb-3">
              <label for="userFname">Address</label>
              <textarea
                type="text"
                class="form-control is-valid"
                id="vendoradd"
                name="vendoradd"
                value={vendoradd}
                onChange={handleChangeEvent}
              />
            </div>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="userName">Contact Person</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="vendorcperson"
                  name="vendorcperson"
                  value={vendorcperson}
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userName">Mobile</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="vendorphone"
                  name="vendorphone"
                  value={vendorphone}
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userName">Email</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="vendoremail"
                  name="vendoremail"
                  value={vendoremail}
                  onChange={handleChangeEvent}
                />
              </div>
            </div>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="userName">Benificiary Name</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="vendorbfname"
                  name="vendorbfname"
                  value={vendorbfname}
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userName">Bank Name</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="vendorbankname"
                  name="vendorbankname"
                  value={vendorbankname}
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userName">Account No</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="vendorbankacc"
                  name="vendorbankacc"
                  value={vendorbankacc}
                  onChange={handleChangeEvent}
                />
              </div>
            </div>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="userName">Iban No </label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="vendoriban"
                  name="vendoriban"
                  value={vendoriban}
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userName">VAT</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="vendorvat"
                  name="vendorvat"
                  value={vendorvat}
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userName">Doc No</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="vendordocno"
                  name="vendordocno"
                  value={vendordocno}
                  onChange={handleChangeEvent}
                />
              </div>
            </div>
          </form>
        </div>
        <div>
          <div style={{ marginTop: "30px" }}>
            <button
              type="button"
              class="btn btn-outline-success"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
