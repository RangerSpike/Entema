import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import { useRef } from "react";
import "./Qpdf.css";
import { Button } from "@progress/kendo-react-buttons";
import { PDFExport } from "@progress/kendo-react-pdf";
import CachedIcon from "@material-ui/icons/Cached";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: { width: "100%", height: "100%" },
  dialogTitle: {},
}));

export default function PopupPdf(props) {
  const { setId, id, openPopup, setOpenPopup } = props;
  // console.log(id);

  const classes = useStyles();

  const pdfExportComponent = useRef(null);
  const [layoutSelection, setLayoutSelection] = useState({
    text: "A4",
    value: "size-a4",
  });

  const ddData = [
    { text: "A4", value: "size-a4" },
    { text: "Letter", value: "size-letter" },
    { text: "Executive", value: "size-executive" },
  ];

  const [quotID, setQuotID] = useState();
  const [wosdate, setWOsdate] = useState();
  const [cqdate, setCqdate] = useState();
  const [cqclient, setCqclient] = useState("test");
  const [cqname, setCqname] = useState();
  const [cqmobileNo, setCqmobileNo] = useState();
  const [cqemail, setCqemail] = useState();
  const [termCond, setTermCond] = useState(
    "1. Above rate is applicable for 10 hours per day, 260 hours per month. \n2. Working less than 10 hours day will be considered as full working day. \n3. Supply Food, accommodation & site transportation Scope of Client. \n4. In case of non-availability of work or inadequate weather conditions, normal daily rate will be charged. \n5. Payment terms will be 30 days after receipt of the Entema al-shamal invoice. \n6. Above Rate is Exclusive of VAT . \n7. Mobilization will be done immediately after receiving the P.O. \n8. Our quotation valid for ten days from the date of this offers and is subject to the availability of manpower & equipment, until receipt of the P.O. \n9. All above mentioned conditions must be mentioned in your purchase order. Hope above quotation is made good and looking forward to get your valuable purchase order at the earliest. Your usual Cooperation would behighly appreciated."
  );
  const [ischeked, setIsChecked] = useState(false);
  const [cqtypes, setCqtypes] = useState("");

  const [entPhone, setEntPhone] = useState("013 363 1210");
  const [entEmail, setEntEmail] = useState("info@entema-sa.com");
  const [entVAT, setEntVAT] = useState("310005823700003");
  const [entMobile, setEntMobile] = useState("0559258940");
  const [entFrom, setEntFrom] = useState("Entemasw");

  const [quotDate, setQuotDate] = useState("");
  const [quotRefNo, setQuotRefNo] = useState("ENT/Jun-21/111");
  const [myDataSet, setMyDataSet] = useState([]);

  const getData = () => {
    axios
      .post("http://mssoftware.xyz/getQOMULDataonID", {
        QOID: id,
      })
      .then((response) => {
        // console.log("My API data : ", response.data);

        if (response.data.length > 0) {
          setMyDataSet(response.data);
          // console.log("MY DATA SET : ", myDataSet);
          setCqclient(response.data[0].CLIENT_DISP_NAME);
          setCqtypes(response.data[0].QO_TYPE);
          setCqmobileNo(response.data[0].QO_COMP_MOB);
          setCqname(response.data[0].QO_COMP_NAME);
          setCqemail(response.data[0].QO_COMP_EMAIL);
          setEntFrom(response.data[0].WO_FROM_COMP);
          setEntMobile(response.data[0].WO_FROM_MOB);
          setQuotDate(response.data[0].CREATED_DATE);
          setQuotID(response.data[0].QO_ID);
          setWOsdate(response.data[0].WO_STARTDATE);
        }
      });
  };

  useEffect(() => {
    getData();
  }, [id]);

  const handleExportWithComponent = (event) => {
    // console.log("my props id value : ", id);
    window.print();
    // pdfExportComponent.current.save();
  };

  const updatePageLayout = (event) => {
    setLayoutSelection(event.target.value);
  };

  let xSts;

  const isEnabled = (sts) => {
    if (sts === "Equipment") {
      xSts = true;
    } else {
      xSts = false;
    }
    return xSts;
  };

  useEffect(() => {
    isEnabled(cqtypes);
  }, [cqtypes]);

  const onClosepopup = () => {
    setId(0);
    setOpenPopup(false);
  };

  const displayTitle = (cqtypes) => {
    if (cqtypes === "Man Power") {
      return <th>Total Amount</th>;
    } else {
      return <th>Mobilization & Demobilization</th>;
    }
  };

  const displayData = (cqtypes,amt,mod) => {
    if (cqtypes === "Man Power") {
      return amt;
    } else {
      return mod;
    }
  };

  const onClosePopup = () => {
    setId(0);
    setOpenPopup(false);
  };

  return (
    <Dialog
      open={openPopup}
      maxWidth="100%"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle>
        <div className="row">
          <div className="col-md-6">
            <text
              onClick={() => onClosePopup()}
              style={{ color: "red", cursor: "pointer", float: "left" }}
            >
              x
            </text>
          </div>
          <div className="col-md-6">
            <text
              style={{ color: "blue", cursor: "pointer", float: "right" }}
              onClick={handleExportWithComponent}
            >
              Print{" "}
            </text>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="page-container hidden-on-narrow">      
          <PDFExport ref={pdfExportComponent}>
            <div className="pdf-page">
              <div className="col-sm-14 print-div">
                <div className="print-quot">
                  <div className="row">
                    <div className="col-sm-3 logo-div">
                      <img
                        src="logoPdf.png"
                        style={{ width: "100%" }}
                        alt="logo"
                      />
                    </div>
                    <div className="col-sm-4 print-quot1">
                      <h1>Quotation</h1>
                    </div>

                    <div className="col-sm-5">
                      <div className="print-quot3">
                        <div className="row">
                          <div className="col-sm-5 col-xs-4 pt-left">
                            Date :
                          </div>
                          <div className="col-sm-7 col-xs-8 pt-right">
                            {quotDate}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-5 col-xs-4 pt-left">
                            Quot# :
                          </div>
                          <div className="col-sm-7 col-xs-8 pt-right">
                            {quotID}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <h1 className="quot-hd">{cqtypes}</h1>
                </div>
              </div>
              <div className="row print-detail">
                <div className="col-sm-6 left1">
                  <div className="print-detail1">
                    <h1 style={{ marginTop: "10px" }}>
                      Entema Al Shamal Gen. cont. Est
                    </h1>
                    <p className="m-0">
                      Al-Jubail St P.O. Box 2816, Jubail 31951, Saudi Arabia
                      <br />
                      <strong>Phone:</strong> 013 363 1210
                      <br />
                      <strong>Email:</strong> info@entema-sa.com
                      <br />
                      <strong>VAT No:</strong> 310005823700003
                    </p>
                  </div>
                </div>

                <div className="col-sm-6 right1">
                  <div className="print-detail3 pd3">
                    <h1 style={{ marginTop: "10px" }}>Work Schedule</h1>
                    <div className="row pd3-det">
                      <div className="col-sm-12">
                        <div className="row">
                          <div className="col-sm-5 pri-field-head">Valid</div>
                          <div className="col-sm-7 pri-field-data">
                            {wosdate}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-5 pri-field-head">From</div>
                          <div className="col-sm-7 pri-field-data">
                            {entFrom}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-5 pri-field-head">
                            User Mobile No.
                          </div>
                          <div className="col-sm-7 pri-field-data">
                            {entMobile}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <div className="print-detail3" style={{ marginTop: "11px" }}>
                    <h1>Client</h1>
                    <div className="row pd3-det">
                      <div className="col-sm-6">
                        <div className="row">
                          <div className="col-sm-4 pri-field-head">Name</div>
                          <div className="col-sm-8 pri-field-data">
                            {cqclient}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-4 pri-field-head">
                            Mobile No
                          </div>
                          <div className="col-sm-8 pri-field-data">
                            {cqmobileNo}
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="row">
                          <div className="col-sm-4 pri-field-head">Company</div>
                          <div className="col-sm-8 pri-field-data">
                            {cqname}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-4 pri-field-head">Email</div>
                          <div className="col-sm-8 pri-field-data">
                            {cqemail}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="dash-pr">
                    <div className="row">
                      <div className="col-sm-9">
                        With reference to the above subject we are very much
                        interested to supply and Hereby Quote our best
                        reasonable price for the same.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 mt-3">
                  <div className="">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Serial No.</th>
                          <th>Description</th>
                          <th>QTY</th>
                          <th>Price</th>
                          {displayTitle(cqtypes)}
                        </tr>
                      </thead>
                      <tbody>
                        {myDataSet.map((comment, index) => (
                          <tr>
                            <th scope="row" key={index}>
                              {comment.QO_ROW + 1}
                            </th>
                            <td>{comment.TAB_DESC}</td>
                            <td>{comment.TAB_QTY}</td>
                            <td>{comment.TAB_AMOUNT}</td>
                            <td>{displayData(cqtypes,comment.TAB_TOTAL_AMT,comment.TAB_MAD)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="dash-terms">
                    <h1>Terms &amp; Conditions:</h1>
                    <p>
                      1. Above rate is applicable for 10 hours per day, 260
                      hours per month. 6 Days A week <br />
                      2. Working less than 10 hours day will be considered as
                      full working day.
                      <br />
                      3. Lubricants, top-up oil, repairs, daily maintenance,
                      Service. and Consumables of the Equipment's shall be
                      provide by Clien.
                      <br />
                      4. In case of non-availability of work or inadequate
                      weather conditions, normal daily rate will be charged.
                      <br />
                      5. Payment terms will be 30 days after receipt of the
                      Entema al-shamal invoice.
                      <br />
                      6. Above Rate is Exclusive of VAT .<br />
                      7. Mobilization will be done immediately after receiving
                      the P.O.
                      <br />
                      8. Our quotation valid for ten days from the date of this
                      offers and is subject to the availability of manpower
                      &amp; equipment, until receipt of the P.O.
                      <br />
                      9. All above mentioned conditions must be mentioned in
                      your purchase order. Hope above quotation is made good and
                      looking forward to get your valuable purchase order at the
                      earliest. Your usual Cooperation would be highly
                      appreciated.
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <div className="bot-cl">
                    Client has to return the same Quotation to Entema Al-shamal
                    by Fax or Email after Confirmation Signature.
                    <h1 className="quotation">Client Acceptance</h1>
                    <h6 style={{ fontSize: "12px", textAlign: "left" }}>
                      {cqclient}
                    </h6>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="bot-cl2">
                          <div className="row">
                            <div className="col-sm-4 col-xs-4 bot-left">
                              Name
                            </div>
                            <div className="col-sm-8 col-xs-8 bot-right">
                              {cqclient}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-4 col-xs-4 bot-left">
                              Title
                            </div>
                            <div className="col-sm-8 col-xs-8 bot-right">
                              {cqname}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-4 col-xs-4 bot-left">
                              Date
                            </div>

                            <div className="col-sm-8 col-xs-8 bot-right">
                              {" "}
                              {quotDate}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-4 col-xs-4 bot-left">
                              Signature
                            </div>
                            <div className="col-sm-8 col-xs-8 bot-right"></div>
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="bot-cl3">
                          <h4>For Entema Al Shamal Gen. cont. Est</h4>
                          <div className="bot-in">Entemasw , Manager </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PDFExport>
        </div>
      </DialogContent>
    </Dialog>
  );
}
