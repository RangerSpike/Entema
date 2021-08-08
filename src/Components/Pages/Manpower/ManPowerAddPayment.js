import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function ManPowerAddPayments() {
  const history = useHistory();

  const [PmManpowerName, setPmManpowerName] = useState();
  const [PmManpowerTimesheet, setPmManpowerTimesheet] = useState();
  const [PmManpowerAmount, setPmManpowerAmount] = useState();
  const [PmManpowerMode, setPmManpowerMode] = useState();
  const [PmManpowerDescription, setPmManpowerDescription] = useState();
  const [PmManpowerStatus, setPmManpowerStatus] = useState();
  const [pmDisplayvalue, setpmDisplayvalue] = useState();
  const [pmtsDispName, setPmtsDispName] = useState();

  const [mpnameLov, setMpNameLov] = useState([]);
  const [mptimesheetLov, setMptimesheetLov] = useState([]);

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

  const getMpLovData = () => {
    fetch("http://mssoftware.xyz/getManpowerData", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setMpNameLov(response);
        //console.log("My API data : ", response);
      });
    return mpnameLov;
  };

  useEffect(() => {
    getMpLovData();
  }, []);

  const getMPtimesheetLovData = (MMPID) => {
    axios
      .post("http://mssoftware.xyz/getMPtimesheetdataBasedOnId", {
        mmtsid: MMPID,
      })
      .then((res) => {
        setMptimesheetLov(res.data);
      });
    return mptimesheetLov;
  };

  const onChangeMpData = (value) => {
    //console.log("onchange value is hiii : ", value);
    //console.log("MP NAME :LOV +++ ", mpnameLov);
    let computedComments = mpnameLov;

    if (value) {
      computedComments = computedComments.filter(
        (comment) => comment.MP_ID == value
      );
      //console.log("COMPUTER ::: ", computedComments);

      setpmDisplayvalue(computedComments[0].MP_NAME);
      //console.log("DISP CAL :", pmDisplayvalue);
    }
  };

  const onChangeTS = (tsValue) => {
    //console.log("onchange value is : ", tsValue);
    let computedComments = mptimesheetLov;

    if (tsValue) {
      computedComments = computedComments.filter(
        (comment) => comment.MMTS_ID == tsValue
      );
      let tsData =
        monthDispValue(computedComments[0].MTS_MONTH) +
        "-" +
        computedComments[0].MTS_YEAR;
      //console.log("TS DATATATA :", tsData);

      setPmtsDispName(tsData);
      setPmManpowerAmount(computedComments[0].MTS_TOTAL);
    } else {
      setPmManpowerAmount(0);
    }
    //console.log("data set value is : ", computedComments);
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
    return output;
  };
  const validatePayments = (value) => {
    axios
      .post("http://mssoftware.xyz/mpPmntValidation", {
        pmmpname: PmManpowerName,
        pmmpts: value,
      })
      .then((res) => {
        //console.log("My onchange validation value : ", res.data[0].RECORDCOUNT);

        if (res.data[0].RECORDCOUNT > 0) {
          alert(
            "You have already Initiated Payments for This ManPower, Please check in the Reports for More Details"
          );
          setPmManpowerName("");
          setpmDisplayvalue("");
          setPmManpowerTimesheet("");
          setPmtsDispName("");
          setPmManpowerAmount("");
          setMptimesheetLov([]);
          
        }
      });
  };

  const handleChangeEvent = (e) => {
    const input = e.target.name;

    //console.log("field name : ", e.target.name + "- value -", e.target.value);

    if (input === "PmManpowerName") {
      setPmManpowerName(e.target.value);
      getMPtimesheetLovData(e.target.value);
      onChangeMpData(e.target.value);
    } else if (input === "PmManpowerTimesheet") {
      onChangeTS(e.target.value);
      setPmManpowerTimesheet(e.target.value);
      validatePayments(e.target.value);
    } else if (input === "PmManpowerAmount") {
      setPmManpowerAmount(e.target.value);
    } else if (input === "PmManpowerMode") {
      setPmManpowerMode(e.target.value);
    } else if (input === "PmManpowerDescription") {
      setPmManpowerDescription(e.target.value);
    } else if (input === "PmManpowerStatus") {
      setPmManpowerStatus(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("test submit", pmDisplayvalue);
    axios
      .post("http://localhost:3009/insertManpowerPaymentData", {
        mppmname: PmManpowerName,
        mppmts: PmManpowerTimesheet,
        mppmamt: PmManpowerAmount,
        pmmode: PmManpowerMode,
        mppmbesc: PmManpowerDescription,
        mppmsts: PmManpowerStatus,
        mppmDispValue: pmDisplayvalue,
        mptsDispValue: pmtsDispName,
      })
      .then((res) => {
        //console.log("updated Values Successfully : ", res.data);
      });
    history.push("/ManPowerClaims");
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
            <h3 style={{ padding: "50px" }}>ManPower Add Payment</h3>
          </div>
        </div>
        <form onSubmit={handleSubmit} onChange={handleChangeEvent}>
          <div className="row">
            <div class="col-md-6 mb-3">
              <label for="PmManpowerName">ManPower Name</label>
              <select
                class="form-control is-valid"
                id="PmManpowerName"
                name="PmManpowerName"
                value={PmManpowerName}
                required
                onChange={handleChangeEvent}
              >
                <option key="" value="">
                  Select ManPower
                </option>
                {mpnameLov.map((data) => (
                  <option key={data.MP_ID} value={data.MP_ID}>
                    {data.MP_NAME}
                  </option>
                ))}
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label for="PmManpowerTimesheet">ManPower Timesheet</label>
              <select
                class="form-control is-valid"
                id="PmManpowerTimesheet"
                name="PmManpowerTimesheet"
                value={PmManpowerTimesheet}
                required
                onChange={handleChangeEvent}
              >
                <option key="" value="">
                  Select Timesheet
                </option>
                {mptimesheetLov.map((data) => (
                  <option key={data.MMTS_ID} value={data.MMTS_ID}>
                    {monthDispValue(parseInt(data.MTS_MONTH))} - {data.MTS_YEAR}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div class="col-md-6 mb-3">
              <label for="PmManpowerAmount">Amount</label>
              <input
                type="text"
                class="form-control is-valid"
                value={PmManpowerAmount}
                id="PmManpowerAmount"
                name="PmManpowerAmount"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="PmManpowerMode">Mode</label>
              <select
                class="form-control is-valid"
                id="PmManpowerMode"
                name="PmManpowerMode"
                value={PmManpowerMode}
                required
              >
                {modeOptions.map((data) => (
                  <option key={data.key} value={data.value}>
                    {data.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div class="col-md-6 mb-3">
              <label for="userFname">Description</label>
              <textarea
                type="text"
                class="form-control is-valid"
                value={PmManpowerDescription}
                id="PmManpowerDescription"
                name="PmManpowerDescription"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="userName">Status</label>
              <select
                class="form-control is-valid"
                id="PmManpowerStatus"
                name="PmManpowerStatus"
                value={PmManpowerStatus}
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

export default ManPowerAddPayments;
