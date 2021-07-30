import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import { Button } from "@progress/kendo-react-buttons";
import './timesheedpdf.css';

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

          if (response.data.length > 0) {
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
        <div className="box wide hidden-on-narrow">
          <div className="box-col">
            <Button
              primary={true}
              onClick={() => handleExportWithComponent()}
              style={{ borderColor: "blue" }}
            >
              Download
            </Button>
          </div>
        </div>

        <div className="page-container hidden-on-narrow">
          <PDFExport ref={pdfExportComponent}>
            <div className="pdf-page1">
              <div className="brand">
                <h2>ENTEMA AL-SHAMAL GEN. CONT. EST. (JUBAIL BRANCH)</h2>
              </div>

              <div className="row">
                <div className="company">
                  <div className="col-sm-12  pro-fill">
                    <h4>Company Name</h4>
                  </div>
                  <div className="con">:</div>

                  <div className="col-sm-12  pro-fill1">
                    <h4>MADCAP SOLUTIONS PVT LTD</h4>
                  </div>

                  <div className="slno">
                    <table class="table table-bordered text-center my-5">
                      <tbody>
                        <tr>
                          <th class="text1 ">Sl#</th>
                          <th class="text1">Category</th>
                          <th class="text1">Plate_No</th>
                          <th class="text1">Optr_Name</th>
                        </tr>
                        <tr>
                          <td rowspan="2">1</td>
                          <td rowspan="2">26 MTR MAN LIFT</td>
                          <td rowspan="2"></td>
                          <td rowspan="2">WITH OUT DRIVER</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="roll">
                  <h4>Month Of Jul/2020</h4>
                </div>

                <div className="hour">
                  <table class="table table-bordered text-center my-5">
                    <tbody>
                      <tr>
                        <th id="hour1">Hours</th> <th id="hour1">1</th>
                        <th id="hour1">2</th>
                        <th id="hour1">3</th>
                        <th id="hour1">4</th>
                        <th id="hour1">5</th>
                        <th id="hour1">6</th>
                        <th id="hour1">7</th>
                        <th id="hour1">8</th>
                        <th id="hour1">9</th>
                        <th id="hour1">10</th>
                        <th id="hour1">11</th>
                        <th id="hour1">12</th>
                        <th id="hour1">13</th>
                        <th id="hour1">14</th>
                        <th id="hour1">15</th>
                        <th id="hour1">16</th>
                        <th id="hour1">17</th>
                        <th id="hour1">18</th>
                        <th id="hour1">19</th>
                        <th id="hour1">20</th>
                        <th id="hour1">21</th>
                        <th id="hour1">22</th>
                        <th id="hour1">23</th>
                        <th id="hour1">24</th>
                        <th id="hour1">25</th>
                        <th id="hour1">26</th>
                        <th id="hour1">27</th>
                        <th id="hour1">28</th>
                        <th id="hour1">29</th>
                        <th id="hour1">30</th>
                        <th id="hour1">31</th>
                        <th id="hour1"> Total Hours</th>
                      </tr>

                      <tr>
                        <td>RH</td>

                        <td class="">10.00</td>

                        <td class="text-primary">10.00</td>

                        <td class="">10.00</td>

                        <td class="">10.00</td>
                        <td class="">-</td>

                        <td class="">10.00</td>

                        <td class="">10.00</td>

                        <td class="">10.00</td>

                        <td class="text-primary">10.00</td>

                        <td class="">10.00</td>

                        <td class="">10.00</td>
                        <td class="">-</td>

                        <td class="">10.00</td>

                        <td class="">10.00</td>

                        <td class="">10.00</td>

                        <td class="text-primary">10.00</td>

                        <td class="">10.00</td>

                        <td class="">10.00</td>
                        <td class="">-</td>

                        <td class="">10.00</td>

                        <td class="">10.00</td>

                        <td class="">10</td>

                        <td class="text-primary">10</td>

                        <td class="">10</td>

                        <td class="">10</td>
                        <td class="">-</td>

                        <td class="">10.00</td>

                        <td class="">10.00</td>

                        <td class="">10.00</td>

                        <td class="text-primary">10.00</td>
                        <td class="">-</td>

                        <td class="text-primary">260.00</td>
                      </tr>
                      <tr>
                        <td>OT</td>
                        <td class="">-</td>
                        <td class="text-primary">-</td>
                        <td class="">-</td>
                        <td class="">-</td>
                        <td class="">-</td>
                        <td class="">-</td>
                        <td class="">-</td>
                        <td class="">-</td>
                        <td class="text-primary">-</td>
                        <td class="">-</td>
                        <td class="">-</td>
                        <td class="">-</td>
                        <td class="">-</td>
                        <td class="">-</td>
                        <td class="">-</td>
                        <td class="text-primary">-</td>
                        <td class="">-</td>
                        <td class="">-</td>
                        <td class="">-</td>
                        <td class="">-</td>
                        <td class="">-</td>
                        <td class="">-</td>
                        <td class="text-primary">-</td>
                        <td class="">-</td>
                        <td class="">-</td>
                        <td class="">-</td>
                        <td class="">-</td>
                        <td class="">-</td>
                        <td class="">-</td>
                        <td class="text-primary">-</td>
                        <td class="">-</td>
                        <td class="text-primary">0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="totalhours">
                  <table class="table table-bordered text-center my-5">
                    <tbody>
                      <tr>
                        <th id="hour2">Gross Total Hours</th>
                        <th id="hour2">Rate/Hr</th>
                        <th id="hour2">Amount</th>
                        <th id="hour2">Total Amount</th>
                        <th id="hour2">VAT 15.00%</th>
                        <th id="hour2">Total Payable Amount</th>
                      </tr>

                      <tr>
                        <td className="ten1">260</td>

                        <td className="ten1">48.08</td>
                        <td className="ten1">12,500.00</td>
                        <td className="ten1">12,500.00</td>
                        <td className="ten1">1,875.00</td>
                        <td className="ten1">14,375.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="foot">
                  <div class="row">
                    <div class="col-3">
                      <h6 class="mx-5 px-5 ">____________________</h6>
                      <h6 class="mx-5 px-5 text-decoration-underline">
                        Prepared By
                      </h6>
                    </div>
                    <div class="col-3" style={{ marginLeft: "133px" }}>
                      <h6 class="mx-5 px-5 " style={{ marginLeft: "-34px" }}>
                        ____________________
                      </h6>
                      <h6
                        class="mx-6 px-5 text-decoration-underline"
                        style={{ marginLeft: "63px" }}
                      >
                        Checked Account Department
                      </h6>
                    </div>

                    <div class="col-3" style={{ marginLeft: "132px" }}>
                      <h6 class="mx-5 px-5 ">____________________</h6>
                      <h6
                        class="mx-5 px-5 text-decoration-underline"
                        style={{ marginLeft: "85px" }}
                      >
                        Approved By
                      </h6>
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
