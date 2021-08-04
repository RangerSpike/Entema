import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { useRef } from "react";
import "./Ppdf.css";
import { PDFExport } from "@progress/kendo-react-pdf";
import { Button } from "@progress/kendo-react-buttons";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    width: "100%",
    height: "100%",
  },
  dialogTitle: {
    paddingRight: "0px",
  },
}));

export default function PopupPdf(props) {
  const { id, openPopup, setOpenPopup } = props;

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

  const [poid, setPoid] = useState();
  const [podocno, setPodocno] = useState();
  const [podate, setPodate] = useState();
  const [porevno, setPorevno] = useState();
  const [ponumber, setPonumber] = useState();
  const [poquotationref, setPoquotationref] = useState();
  const [poproject, setPoproject] = useState();
  const [popaymentmode, setPopaymentmode] = useState();
  const [povendor, setPovendor] = useState();
  const [pocode, setPocode] = useState();
  const [pophone, setPophone] = useState();
  const [pocpperson, setPocpperson] = useState();
  const [pomobile, setPomobile] = useState();
  const [poemail, setPoemail] = useState();
  const [povat, setPovat] = useState();
  const [poadd, setPoadd] = useState();
  const [postartdate, setPostartdate] = useState();
  const [poenddate, setPoenddate] = useState();
  const [polocation, setPolocation] = useState();
  const [pomobilizationdate, setPomobilizationdate] = useState();
  const [podesc, setPodesc] = useState();
  const [pototal, setPototal] = useState(0);
  const [pogst, setPogst] = useState(0);
  const [pograndtotal, setPograndtotal] = useState(0);
  const [status, setStatus] = useState(0);

  const [myDataSet, setMyDataSet] = useState([]);

  const [instruction, setInstruction] = useState(
    "1. Payment shall be made for the quantities executed as per unit rates given above. \n2. Work Order number and date must be quoted on all correspondence. \n3. This order is subject to the terms and conditions set out on the face and Annexure -A \n4. The acceptance copy must be signed by vender or by its representative ( on vender’s behalf) on the face and Annexure - A \n 5. This Work Order is subject to the cancellation unless the subcontractor returns one copy signed with confirmation that all terms and conditions are accepted. \n 6. The following attachments form an integral part of this work Order."
  );
  const [deliveryTerms, setDeliveryTerms] = useState(
    "1. Lubricants, top-up oil, repairs, daily maintenance, Service and Consumables of the Equipments shall be provide by Vender. \n2. In case of breakDown or Maintenance, Vwndor/Supplier shall provide a replacement of equipment immediatly at no extra cost."
  );
  const [conditionTerms, setConditionTerms] = useState(
    "1. Above rate is applicable for 10 hours per day, 6 days a week, 260 hours per Month. \n2. Working Duration: 2 Month Extandable. \n3. Supply Food, accommodation & Transportation scope Entema al-shamal. \n4. Above Rate is exclusive of VAT. \n5. If you need any clarification on above matter or any assistance please feel free to contract undersigned. \n6. Vendor has to return the same purchase order to Entema Al-shamal by Fax or Email after Confirmation Signature."
  );

  const [sigName, setSigName] = useState();
  const [sigNameNTitle, setSigNameNTitle] = useState();

  useEffect(() => {
    axios
      .post("https://mssoftware.xyz/getPOMULDataonID", {
        POID: id,
      })
      .then((response) => {
        {
          // console.log("My API data : ", response.data);

          if (id) {
            setMyDataSet(response.data);

            setPoid(response.data[0].PO_ID);
            setPodocno(response.data[0].DOC_NO);
            setPodate(response.data[0].CREATED_DATE);
            setPorevno(response.data[0].REV_NO);
            setPonumber(response.data[0].WO_NUMBER);
            setPoquotationref(response.data[0].WO_QUO_REF);
            setPoproject(response.data[0].WO_PROJECT);
            setPopaymentmode(response.data[0].WO_PAYMENT_MODE);
            setPovendor(response.data[0].VENDOR_DISP_NAME);
            setPocode(response.data[0].VI_CODE);
            setPophone(response.data[0].VI_PH_NO);
            setPocpperson(response.data[0].VI_CONTACT_PERSON);
            setPomobile(response.data[0].VI_MOBILE);
            setPoemail(response.data[0].VI_EMAIL);
            setPovat(response.data[0].VI_VAT);
            setPoadd(response.data[0].VI_ADDRESS);
            setPostartdate(response.data[0].WS_START_DATE);
            setPoenddate(response.data[0].WS_END_DATE);
            setPolocation(response.data[0].WS_LOC);
            setPomobilizationdate(response.data[0].WS_MOB_DATE);
            setPodesc(response.data[0].WS_DESC);
            setPototal(response.data[0].PO_TOTAL);
            setPogst(response.data[0].PO_GST);
            setPograndtotal(response.data[0].PO_GRANDTOTAL);
            setInstruction(response.data[0].PO_INSTRUCTION);
            setDeliveryTerms(response.data[0].PO_TOD);
            setConditionTerms(response.data[0].PO_TC);
            setStatus(response.data[0].PO_APPROVE_STATUS);
          }
        }
      });
  }, [id]);

  const handleExportWithComponent = (event) => {
    // console.log("my props id value : ", id);
    pdfExportComponent.current.save();
  };

  var th = ["", "thousand", "million", "billion", "trillion"];
  var dg = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  var tn = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  var tw = [
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  const toWords = (s) => {
    s = s.toString();
    s = s.replace(/[\, ]/g, "");
    if (s != parseFloat(s)) return "not a number";
    var x = s.indexOf(".");
    if (x == -1) x = s.length;
    if (x > 15) return "too big";
    var n = s.split("");
    var str = "";
    var sk = 0;
    for (var i = 0; i < x; i++) {
      if ((x - i) % 3 == 2) {
        if (n[i] == "1") {
          str += tn[Number(n[i + 1])] + " ";
          i++;
          sk = 1;
        } else if (n[i] != 0) {
          str += tw[n[i] - 2] + " ";
          sk = 1;
        }
      } else if (n[i] != 0) {
        // 0235
        str += dg[n[i]] + " ";
        if ((x - i) % 3 == 0) str += "hundred ";
        sk = 1;
      }
      if ((x - i) % 3 == 1) {
        if (sk) str += th[(x - i - 1) / 3] + " ";
        sk = 0;
      }
    }

    if (x != s.length) {
      var y = s.length;
      str += "& ";
      for (var i = x + 1; i < y; i++) str += dg[n[i]] + " ";
    }
    return str.replace(/\s+/g, " ").toUpperCase();
  };

  const updatePageLayout = (event) => {
    setLayoutSelection(event.target.value);
  };

  return (
    <Dialog
      open={openPopup}
      maxWidth="120%"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle>
        <div>
          <button
            variant="contained"
            color="primary"
            onClick={() => setOpenPopup(false)}
          >
            X
          </button>
        </div>
      </DialogTitle>
      <DialogContent>       
        <div className="page-container hidden-on-narrow">
          <PDFExport ref={pdfExportComponent}>
            <div className="pdf-page">
              <div className="col-sm-14 print-div">
                <div className="print-quot" style={{ width: "100%" }}>
                  <div className="row">
                    <div className="col-sm-4 logo-div">
                      <img
                        src="logoPdf.png"
                        style={{ width: "100%" }}
                        alt="logo"
                      />
                    </div>
                    <div className="col-sm-4 print-quot1">
                      <h6>PURCHASE ORDER</h6>
                    </div>

                    <div className="col-sm-4 print-quot6">
                      <div className="row">
                        <div className="col-sm-5 col-xs-4 pt-left">Doc No</div>
                        <div className="col-sm-7 col-xs-8 pt-right">
                          {podocno}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-5 col-xs-4 pt-left">Date</div>
                        <div className="col-sm-7 col-xs-8 pt-right">
                          {podate}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-5 col-xs-4 pt-left">Rev. No</div>
                        <div className="col-sm-7 col-xs-8 pt-right">
                          {porevno}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row print-detail">
                <div className="col-sm-6 left1">
                  <div className="print-detail1">
                    <h5 style={{ fontSize: "14px", textAlign: "left" }}>
                      Invoice To
                    </h5>
                    <h6>Entema Al Shamal Gen. cont. Est</h6>
                    <p>
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
                <h4>Work Order</h4>
                <div className="row pd8-det">
                <div className="row ven-row">
                <div
                  className="col-sm-4 pri-field-head pv3"
                  style={{ fontSize: "14px" }}
                >
                Number
                </div>
                <div
                  className="col-sm-12"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    marginLeft: "78px",
                    marginTop: "-21px",
                  }}
                >
                2021726175245875
                </div>
              </div>
              <div className="row ven-row">
              <div
                className="col-sm-4 pri-field-head pv3"
                style={{ fontSize: "14px" }}
              >
              Project
              </div>
              <div
                className="col-sm-12"
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  marginLeft: "78px",
                  marginTop: "-21px",
                }}
              >
              {poproject}
              </div>
            </div>
            <div className="row ven-row">
                <div
                  className="col-sm-6 pri-field-head pv3"
                  style={{ fontSize: "14px" }}
                >
                Mode / Terms Payment
                </div>
                <div
                  className="col-sm-12"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    marginLeft: "165px",
                    marginTop: "-21px",
                  }}
                >
                {popaymentmode}
                </div>
              </div>
              <div className="row ven-row">
                <div
                  className="col-sm-6 pri-field-head pv3"
                  style={{ fontSize: "14px" }}
                >
                Quatation Ref
                </div>
                <div
                  className="col-sm-12"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    marginLeft: "121px",
                    marginTop: "-21px",
                  }}
                >
                {poquotationref}
                </div>
              </div>






                </div>
                </div>
                </div>
              </div>
              {status === "Not Approved" ? (
                <div id="watermark">Not Approved</div>
              ) : null}

              <div className="row" style={{ marginTop: "10px" }}>
                <div className="col-sm-8 left1">
                  <div className="print-vendor">
                    <div className="row">
                      <div className="col-sm-8 left1">
                        <div className="row ven-row">
                          <div
                            className="col-sm-4 pri-field-head pv3"
                            style={{ fontSize: "14px" }}
                          >
                            Vendor
                          </div>
                          <div
                            className="col-sm-12"
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              marginLeft: "121px",
                              marginTop: "-21px",
                            }}
                          >
                            {povendor}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-8 left1">
                        <div className="row ven-row">
                          <div
                            className="col-sm-6 pri-field-head pv3"
                            style={{ fontSize: "14px" }}
                          >
                            Contact Person
                          </div>
                          <div
                            className="col-sm-12"
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              marginLeft: "120px",
                              marginTop: "-21px",
                            }}
                          >
                            {pocpperson}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-8 left1">
                        <div className="row ven-row">
                          <div
                            className="col-sm-4 pri-field-head pv3"
                            style={{ fontSize: "14px" }}
                          >
                            Address
                          </div>
                          <div
                            className="col-sm-12"
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              marginLeft: "120px",
                              marginTop: "-21px",
                            }}
                          >
                            {poadd}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-8 left1">
                        <div className="row ven-row">
                          <div
                            className="col-sm-4 pri-field-head pv3"
                            style={{ fontSize: "14px" }}
                          >
                            Ph.
                          </div>
                          <div
                            className="col-sm-12"
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              marginLeft: "40px",
                              marginTop: "-21px",
                            }}
                          >
                            {pophone}
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-8 left1">
                        <div className="row ven-row">
                          <div
                            className="col-sm-4 pri-field-head pv3"
                            style={{
                              fontSize: "14px",
                              marginLeft: "177px",
                              marginTop: "-20px",
                            }}
                          >
                            Mobile No
                          </div>
                          <div
                            className="col-sm-12"
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              marginLeft: "271px",
                              marginTop: "-21px",
                            }}
                          >
                            {pomobile}{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-8 left1">
                        <div className="row ven-row">
                          <div
                            className="col-sm-4 pri-field-head pv3"
                            style={{ fontSize: "14px" }}
                          >
                            Code
                          </div>
                          <div
                            className="col-sm-12"
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              marginLeft: "53px",
                              marginTop: "-21px",
                            }}
                          >
                            {pocode}
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-8 left1">
                        <div className="row ven-row">
                          <div
                            className="col-sm-4 pri-field-head pv3"
                            style={{
                              fontSize: "14px",
                              marginLeft: "219px",
                              marginTop: "-20px",
                            }}
                          >
                            VAT
                          </div>
                          <div
                            className="col-sm-12"
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              marginLeft: "271px",
                              marginTop: "-21px",
                            }}
                          >
                            {povat}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-8 left1">
                        <div className="row ven-row">
                          <div
                            className="col-sm-4 pri-field-head pv3"
                            style={{ fontSize: "14px" }}
                          >
                            Email ID
                          </div>
                          <div
                            className="col-sm-12"
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              marginLeft: "121px",
                              marginTop: "-21px",
                            }}
                          >
                            {poemail}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 right1">
                  <div className="print-detail5 pd3a">
                    <h1>Work Schedule</h1>

                    <div className="pvw">
                      <div className="row">
                        <div className="col-sm-6 pri-field-head">Start</div>
                        <div className="col-sm-6 pri-field-data14">
                          {postartdate}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-6 pri-field-head">
                          Completion
                        </div>
                        <div className="col-sm-6 pri-field-data14">
                          {poenddate}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-6 pri-field-head">Location</div>
                        <div className="col-sm-6   pri-field-data14">
                          {polocation}{" "}
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
                      <div className="col-sm-3 pri-field-head">
                        Description of Work
                      </div>
                      <div className="col-sm-9 pri-field-data">{podesc}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <div className="print-table9">
                    <table>
                      <thead>
                        <tr>
                          <th>Sr#</th>
                          <th>Description </th>
                          <th> Unit</th>
                          <th>QTY</th>
                          <th>Unit rate (Sar)</th>
                          <th>Amount (sar)</th>
                          <th>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myDataSet.map((comment, index) => (
                          <tr>
                            <th scope="row" key={index}>
                              {comment.PO_ROW + 1}
                            </th>
                            <td>{comment.PO_DESC}</td>
                            <td>{comment.UNIT_DD}</td>
                            <td>{comment.QUANTITY}</td>
                            <td>{comment.UNIT_RATE}</td>
                            <td>{comment.UNIT_AMOUNT}</td>
                            <td>NA</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row">
              <div className="col-6">
                <div className="row mt-2">
                  <div className="col-sm-6 pri-field-head">
                    Mobilization Date
                  </div>
                  <div className="col-sm-9" style={{marginLeft:'180px',marginTop:'-24px'}}>{pomobilizationdate}</div>
                </div>
              </div>

              <div className="col-6">
                <div className="print-total row mr-0">
                  <div className="col-6 tot-left tl1">TOTAL sar</div>
                  <div className="col-6 tot-right tr1" id="total">
                    {pototal}
                  </div>

                  <div className="col-6 col-xs-6 tot-left">
                    s.tAX/vat/rgst {pogst} %
                  </div>
                  <div className="col-6 col-xs-6 tot-right">{pogst} </div>
                  <div className="col-sm-6 col-xs-6 tot-left tl2">
                    gRAND tOTAL (sAR)
                  </div>
                  <div
                    className="col-sm-6 col-xs-6 tot-right tr2"
                    id="grandtotal"
                  >
                    {pograndtotal}
                  </div>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="print-total7">
                    <h4>
                      <span>
                        TOTAL (IN WORDS ):
                        <span id="total_word" style={{ display: "inline" }}>
                          {toWords(pograndtotal)}
                        </span>
                        SAR{" "}
                        <span
                          id="total_decimal"
                          style={{ display: "inline" }}
                        ></span>
                        Only
                      </span>
                    </h4>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <div className="dash-terms mt-0 pt-0">
                    <h1 className="pl-0">INSTRUCTIONS:</h1>
                    <p>
                      {" "}
                      1. Payment shall be made for the quantities executed as
                      per unit rates given above.
                      <br />
                      2. Work Order number and date must be quoted on all
                      correspondence.
                      <br />
                      3. This order is subject to the terms and conditions set
                      out on the face and Annexure -A
                      <br />
                      4. The acceptance copy must be signed by vender or by its
                      representative ( on vender’s behalf) on the face and
                      Annexure - A<br />
                      5. This Work Order is subject to the cancellation unless
                      the subcontractor returns one copy signed with
                      confirmation that all terms and conditions are accepted.
                      <br />
                      6. The following attachments form an integral part of this
                      work Order.{" "}
                    </p>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="dash-terms mt-0 pt-0">
                    <h1 className="pl-0">Terms of delivery:</h1>
                    <p>
                      {" "}
                      1. Lubricants, top-up oil, repairs, daily maintenance,
                      Service. and Consumables of the Equipment shall be provide
                      by Vender.
                      <br />
                      2. In case of breakDown or Maintenance, Vendor/Supplier
                      shall provide a replacement of equipment immediately at no
                      extra cost. in case of where Vendor/Supplier falls to
                      complete Entema shall impose a delay penalty of 2.5 % per
                      week the P O value , up to maximum of 10 % of P O Value.{" "}
                    </p>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="dash-terms mt-0 pt-0">
                    <h1 className="pl-0">Terms &amp; Conditions:</h1>
                    <p>
                      {" "}
                      1. Above rate is applicable for 10 hours per day, 6 days a
                      week, 260 hours per Month.
                      <br />
                      2. Working Duration: 3 Months Extendable.
                      <br />
                      3. Supply Food scope of Vendor,and accommodation &amp;
                      Transportation scope Entema al-shamal.
                      <br />
                      4. Above Rate is exclusive of VAT.
                      <br />
                      5. If you need any clarification on above matter or any
                      assistance please feel free to contract undersigned.
                      <br />
                      6. Vendor has to return the same purchase order to Entema
                      Al-shamal by Fax or Email after Confirmation Signature.{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12" style={{ maxWidth: "97%" }}>
                  <div className="bot-cl5">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="bot-cl6">
                          <h1>Accepted by</h1>
                          <div className="row">
                            <div className="col-sm-5 col-xs-6 bot-left">
                              Signature
                            </div>
                            <div className="col-sm-7 col-xs-6 bot-right">
                              {pocpperson}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-5 col-xs-6 bot-left">
                              Name &amp; Title
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-5 col-xs-6 bot-left">
                              Date
                            </div>
                            <div className="col-sm-7 col-xs-6 bot-right">
                              {podate}
                            </div>
                          </div>
                          <div className="row">
                            <div
                              className="col-sm-12"
                              style={{ textAlign: "center", fontSize: "13px" }}
                            >
                              {sigName}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="bot-cl10">
                          <h1>Issued by</h1>
                          <h5>
                            Authorised Signatory
                            <br />
                            (Entema Al Shamal Gen. cont. Est)
                          </h5>
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
