import React, { useState } from "react";

function CreateNote() {
  const [PmVendorName, setPmVendorName] = useState();
  const [PmTimesheet, setPmTimesheet] = useState();
  const [PmAmount, setPmAmount] = useState();
  const [PmMode, setPmMode] = useState();
  const [PmDescription, setPmDescription] = useState();
  const [PmStatus, setPmStatus] = useState();

  const handleChangeEvent = (e) => {
    // console.log("e : ", e);
    const input = e.target.name;

    // console.log("field name : ", e.target.name + "- value -", e.target.value);

    if (input === "PmVendorName") {
      setPmVendorName(e.target.value);
    } else if (input === "PmTimesheet") {
      setPmTimesheet(e.target.value);
    } else if (input === "PmAmount") {
      setPmAmount(e.target.value);
    } else if (input === "PmMode") {
      setPmMode(e.target.value);
    } else if (input === "PmDescription") {
      setPmDescription(e.target.value);
    } else if (input === "PmStatus") {
      setPmStatus(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("test submit");
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
              <label for="userName">Vendor Name</label>
              <input
                type="text"
                class="form-control is-valid"
                value={PmVendorName}
                id="PmVendorName"
                name="PmVendorName"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="userName">Timesheet</label>
              <select
                class="form-control is-valid"
                value={PmTimesheet}
                id="PmTimesheet"
                name="PmTimesheet"
                required
              >
                <option value="">Client Name</option>
                <option value="1">Zeeshan</option>
                <option value="2">shabaz</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div class="col-md-6 mb-3">
              <label for="userName">Amount</label>
              <input
                type="text"
                class="form-control is-valid"
                value={PmAmount}
                id="PmAmount"
                name="PmAmount"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="userFname">Mode</label>
              <select
                class="form-control is-valid"
                value={PmMode}
                id="PmMode"
                name="PmMode"
                required
              >
                <option value="">Select Mode</option>
                <option value="1">Cash</option>
                <option value="2">Bank</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div class="col-md-6 mb-3">
              <label for="userFname">Description</label>
              <textarea
                type="text"
                class="form-control is-valid"
                value={PmDescription}
                id="PmDescription"
                name="PmDescription"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label for="userName">Status</label>
              <select
                class="form-control is-valid"
                value={PmStatus}
                id="PmStatus"
                name="PmStatus"
                required
              >
                <option value="">Select Status</option>
                <option value="1">Advance</option>
                <option value="2">Request</option>
                <option value="3">Paid</option>
                <option value="4">Approved</option>
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

export default CreateNote;
