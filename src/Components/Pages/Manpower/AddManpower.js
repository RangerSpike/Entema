import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function AddManpower() {
  const history = useHistory();

  const [MpDescription, setMpDescription] = useState();
  const [MpIqamaId, setMpIqamaId] = useState();
  const [MpCategory, setMpCategory] = useState();
  const [MpBankName, setMpBankName] = useState();
  const [MpAccountNo, setMpAccountNo] = useState();
  const [MpIbanNumber, setMpIbanNumber] = useState();
  const [MpLocation, setMpLocation] = useState();
  const [MpName, setMpName] = useState();
  const [MpBenificaryName, setMpBenificaryName] = useState();

  const handleChangeEvent = (e) => {
    // console.log("e : ", e);
    const input = e.target.name;

    // console.log("field name : ", e.target.name + "- value -", e.target.value);

    if (input === "MpDescription") {
      setMpDescription(e.target.value);
    } else if (input === "MpIqamaId") {
      setMpIqamaId(e.target.value);
    } else if (input === "MpName") {
      setMpName(e.target.value);
    } else if (input === "MpCategory") {
      setMpCategory(e.target.value);
    } else if (input === "MpBankName") {
      setMpBankName(e.target.value);
    } else if (input === "MpBenificaryName") {
      setMpBenificaryName(e.target.value);
    } else if (input === "MpAccountNo") {
      setMpAccountNo(e.target.value);
    } else if (input === "MpIbanNumber") {
      setMpIbanNumber(e.target.value);
    } else if (input === "MpLocation") {
      setMpLocation(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://mssoftware.xyz/insertManpowerData", {
        mpname: MpName,
        mpiqamaid: MpIqamaId,
        mpcategory: MpCategory,
        mpbenfname: MpBenificaryName,
        mpbankname: MpBankName,
        mpaccount: MpAccountNo,
        mpiban: MpIbanNumber,
        mploc: MpLocation,
        mpdesc: MpDescription,
      })
      .then((res) => {
        // console.log("updated Values Successfully : ", res.data);
      });

    // console.log("test submit");
    history.push("/ViewManpower");
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
            <h3 style={{ padding: "50px" }}>Add Manpower</h3>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div class="col-md-4 mb-3">
              <label for="userName">Iqama Id</label>
              <input
                type="text"
                class="form-control is-valid"
                value={MpIqamaId}
                id="MpIqamaId"
                name="MpIqamaId"
                required
                onChange={handleChangeEvent}
              />
            </div>
            <div class="col-md-4 mb-3">
              <label for="userName">Name</label>
              <input
                type="text"
                class="form-control is-valid"
                value={MpName}
                id="MpName"
                name="MpName"
                required
                onChange={handleChangeEvent}
              />
            </div>
            <div class="col-md-4 mb-3">
              <label for="userName">Category</label>
              <input
                type="text"
                class="form-control is-valid"
                value={MpCategory}
                id="MpCategory"
                name="MpCategory"
                required
                onChange={handleChangeEvent}
              />
            </div>
          </div>

          <div className="row">
            <div class="col-md-4 mb-3">
              <label for="userName">Benificary Name</label>
              <input
                type="text"
                class="form-control is-valid"
                value={MpBenificaryName}
                id="MpBenificaryName"
                name="MpBenificaryName"
                required
                onChange={handleChangeEvent}
              />
            </div>
            <div class="col-md-4 mb-3">
              <label for="userName">Bank Name</label>
              <input
                type="text"
                class="form-control is-valid"
                value={MpBankName}
                id="MpBankName"
                name="MpBankName"
                required
                onChange={handleChangeEvent}
              />
            </div>

            <div class="col-md-4 mb-3">
              <label for="userName">Account No</label>
              <input
                type="text"
                class="form-control is-valid"
                value={MpAccountNo}
                id="MpAccountNo"
                name="MpAccountNo"
                required
                onChange={handleChangeEvent}
              />
            </div>
          </div>

          <div className="row">
            <div class="col-md-4 mb-3">
              <label for="userName">Iban Number</label>
              <input
                type="text"
                class="form-control is-valid"
                value={MpIbanNumber}
                id="MpIbanNumber"
                name="MpIbanNumber"
                required
                onChange={handleChangeEvent}
              />
            </div>
            <div class="col-md-4 mb-3">
              <label for="userName">Location</label>
              <input
                type="text"
                class="form-control is-valid"
                value={MpLocation}
                id="MpLocation"
                name="MpLocation"
                required
                onChange={handleChangeEvent}
              />
            </div>
            <div class="col-md-8 mb-3">
              <label for="userFname">Description</label>
              <textarea
                type="text"
                class="form-control is-valid"
                value={MpDescription}
                id="MpDescription"
                name="MpDescription"
                required
                onChange={handleChangeEvent}
              />
            </div>
          </div>

          <div></div>
          <button
            type="submit"
            class="btn btn-outline-success"
            style={{ marginTop: "20px", marginBottom: "40px" }}
          >
            Submit
          </button>
        </form>
      </div>
      </div>iv
    </>
  );
}

export default AddManpower;
