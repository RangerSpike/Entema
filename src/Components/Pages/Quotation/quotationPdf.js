// eslint-disable-next-line
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
  const [termCond, setTermCond] = useState();
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

  let str;

  const getData = () => {
    axios
      .post("http://mssoftware.xyz/getQOMULDataonID", {
        QOID: id,
      })
      .then((response) => {
        // console.log("My API data : ", response.data);

        if (response.data.length > 0) {
          setMyDataSet(response.data);
          console.log("MY DATA SET : ", myDataSet);
          setCqclient(response.data[0].CLIENT_DISP_NAME);
          setCqtypes(response.data[0].QO_TYPE);
          setCqmobileNo(response.data[0].QO_COMP_MOB);
          setCqname(response.data[0].QO_COMP_NAME);
          setCqemail(response.data[0].QO_COMP_EMAIL);
          setEntFrom(response.data[0].WO_FROM_COMP);
          setEntMobile(response.data[0].WO_FROM_MOB);
          setQuotDate(response.data[0].CREATED_DATE);
          setQuotID("ENT - " + response.data[0].SEQ_NO);
          setTermCond(response.data[0].QO_TERMS_COND);
          // str = response.data[0].QO_TERMS_COND;
          // str.replace(".","\n");
          // setTermCond(str);
          formatChange(
            response.data[0].WO_STARTDATE,
            response.data[0].CREATED_DATE
          );
        }
      });
  };

  useEffect(() => {
    getData();
  }, [id]);

  const formatChange = (wDate, crtdDate) => {
    let wrkDate = new Date(wDate);
    let crtDate = new Date(crtdDate);

    let wrkDay = wrkDate.getDate();
    let wrkMonth = wrkDate.getMonth();
    let wrkYear = wrkDate.getFullYear();

    if (wrkMonth in [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
      setWOsdate(wrkDay + "-0" + wrkMonth + "-" + wrkYear);
    } else {
      setWOsdate(wrkDay + "-" + wrkMonth + "-" + wrkYear);
    }

    //console.log(wosdate);

    let crtDay = crtDate.getDate();
    let crtMonth = crtDate.getMonth();
    let crtYear = crtDate.getFullYear();

    if (wrkMonth in [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
      setQuotDate(crtDay + "-0" + crtMonth + "-" + crtYear);
    } else {
      setQuotDate(crtDay + "-" + crtMonth + "-" + crtYear);
    }
  };

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

  const displayData = (cqtypes, amt, mod) => {
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
                          <th>UNIT</th>
                          <th>QTY</th>
                          <th>Price</th>
                          {displayTitle(cqtypes)}
                        </tr>
                      </thead>
                      <tbody>
                        {myDataSet.map((comment, index) => (
                          <tr>
                            <th scope="row" key={index}>
                              {parseInt(comment.QO_ROW) + 1}
                            </th>
                            <td>{comment.TAB_DESC}</td>
                            <td>{comment.TAB_UNIT}</td>
                            <td>
                              {comment.TAB_QTY}/{" " + comment.TAB_UNIT}
                            </td>
                            <td>{comment.TAB_AMOUNT}</td>
                            <td>
                              {displayData(
                                cqtypes,
                                comment.TAB_TOTAL_AMT,
                                comment.TAB_MAD
                              )}
                            </td>
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
                    <textarea style={{border:"0px" ,width:"850px"}} rows="13">{termCond}</textarea>
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
