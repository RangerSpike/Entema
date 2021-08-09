import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function AddPayment() {
  const history = useHistory();

  const [pmVendorName, setPmVendorName] = useState();
  const [vendorDispValue, setVendorDispValue] = useState();
  const [pmTimesheet, setPmTimesheet] = useState();
  const [pmAmount, setPmAmount] = useState();
  const [pmMode, setPmMode] = useState();
  const [pmDescription, setPmDescription] = useState();
  const [pmStatus, setPmStatus] = useState();
  const [pmClearedAmt, setPmClearedAmt] = useState(0);
  const [pmtsDispName, setPmtsDispName] = useState();

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
    fetch("http://mssoftware.xyz/getVendorData", {
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
  }, []);

  const getTimeSheetForVendor = (vendorID) => {
    axios
      .post("http://mssoftware.xyz/getVenTimesheetDataonVendorId", {
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

  const onChangeTS = (tsValue) => {
    //console.log("onchange value is : ", tsValue);
    let computedComments = tsLov;

    if (tsValue) {
      computedComments = computedComments.filter(
        (comment) => comment.VTS_ID == tsValue
      );
      let tsData =
        monthDispValue(computedComments[0].TS_MONTH) +
        "-" +
        computedComments[0].TS_YEAR;
      //console.log("TS DATATATA :",tsData);

      setPmtsDispName(tsData);
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
    //console.log("switch value : ", output);
    return output;
  };

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
      validatePayments(e.target.value);
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

  const handleSubmit = (e) => {
    // e.preventDefault();

    axios
      .post("http://mssoftware.xyz/insertVendorPaymentData", {
        pmvenname: pmVendorName,
        pmvendispname: vendorDispValue,
        pmvents: pmTimesheet,
        pmamount: pmAmount,
        pmpmntmode: pmMode,
        pmdescription: pmDescription,
        pmstatus: pmStatus,
        pmtsDispName: pmtsDispName,
        pmClearedAmt: pmClearedAmt,
        createdby:localStorage.getItem("userDetails")
      })
      .then((res) => {
        //console.log("updated Values Successfully : ", res.data);
      });
    //console.log("test submit");

    history.push("/ViewVendorPayments");
  };

  const validatePayments = (value) => {
    axios
      .post("http://mssoftware.xyz/venPmntValidation", {
        pmvenname: pmVendorName,
        pmvents: value,
      })
      .then((res) => {
        //console.log("My onchange validation value : ", res.data[0].RECORDCOUNT);

        if (res.data[0].RECORDCOUNT > 0) {
          alert(
            "You have already Initiated Payments for This Vendor, Please check in the Reports for More Details"
          );
          setPmVendorName("");
          setVendorDispValue("");
          setPmTimesheet("");
          setPmtsDispName("");
          setPmAmount("");
          setTsLov([]);
        }
      });
  };

  return (
    <>
      <div class="scrollbar square scrollbar-lady-lips thin">
        <div
          class="container"
          style={{ paddingTop: "30px", paddingLeft: "50px" }}
        >
          <div className="heading-layout1">
            <div className="item-title">
              <h3 style={{ padding: "50px" }}>Vendor Add Payment</h3>
            </div>
          </div>
          <form onSubmit={handleSubmit} onChange={handleChangeEvent}>
            <div className="row">
              <div class="col-md-6 mb-3">
                <label htmlFor="pmVendorName">Vendor Name</label>
                <select
                  class="form-control is-valid"
                  value={pmVendorName}
                  id="pmVendorName"
                  name="pmVendorName"
                  required
                >
                  <option key="" value="">
                    Select Vendor
                  </option>
                  {vendorLov.map((data) => (
                    <option key={data.VENDOR_ID} value={data.VENDOR_ID}>
                      {data.VENDOR_NAME}
                    </option>
                  ))}
                </select>
              </div>

              <div class="col-md-6 mb-3">
                <label for="userName">Timesheet</label>
                <select
                  class="form-control is-valid"
                  value={pmTimesheet}
                  id="pmTimesheet"
                  name="pmTimesheet"
                  required
                >
                  <option value="">Select Timesheet</option>
                  {tsLov.map((data) => (
                    <option key={data.VTS_ID} value={data.VTS_ID}>
                      {monthDispValue(parseInt(data.TS_MONTH))} - {data.TS_YEAR}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div class="col-md-6 mb-3">
                <label for="userName">Amount</label>
                <input
                  type="number"
                  class="form-control is-valid"
                  value={pmAmount}
                  disabled
                  id="pmAmount"
                  name="pmAmount"
                  required
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
    </>
  );
}

export default AddPayment;
