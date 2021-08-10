// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Activities() {
  const history = useHistory();

  const [AcActivityName, setAcActivityName] = useState();
  const [AcCreatedDate, setAcCreatedDate] = useState();
  const [AcEndDate, setAcEndDate] = useState();
  const [AcDescription, setAcDescription] = useState();

  const handleChangeEvent = (e) => {
    const input = e.target.name;

    if (input === "AcActivityName") {
      setAcActivityName(e.target.value);
    } else if (input === "AcCreatedDate") {
      setAcCreatedDate(e.target.value);
    } else if (input === "AcEndDate") {
      setAcEndDate(e.target.value);
    } else if (input === "AcDescription") {
      setAcDescription(e.target.value);
    }
  };

  useEffect(() => {
    setAcCreatedDate(setDateFormat());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://mssoftware.xyz/insertActivitiesData", {
        actname: AcActivityName,
        actenddate: AcEndDate,
        actdescription: AcDescription,
        createdby:localStorage.getItem("userDetails")
      })
      .then((res) => {
        // setData(res.data);
        //  setDupData(res.data);
        history.push("/Viewuser");
      });
  };

  const setDateFormat = () => {
    let currentDate = new Date();
    let currentYear = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
      currentDate
    );
    let currentMonth = new Intl.DateTimeFormat("en", {
      month: "numeric",
    }).format(currentDate);
    let currentDay = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
      currentDate
    );

    // let formatedDate = currentDay + "-0" + currentMonth + "-" + currentYear;

    let formatedDate;

    if (currentMonth in [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
      formatedDate = currentYear + "-0" + currentMonth + "-" + currentDay;
    } else {
      formatedDate = currentYear + "-" + currentMonth + "-" + currentDay;
    }

    return formatedDate;
  };

  return (
    <>
    <div class="scrollbar square scrollbar-lady-lips thin">
      <div
        class="container"
        style={{ paddingTop: "30px", paddingLeft: "50px" }}
      >
        <div className="scroll">
          <div className="heading-layout1">
            <div className="item-title">
              <h3 style={{ padding: "50px" }}>Activity</h3>
            </div>
          </div>
          <form onSubmit={handleSubmit} onChange={handleChangeEvent}>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="userName">Activity Name</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={AcActivityName}
                  id="AcActivityName"
                  name="AcActivityName"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="userName">Created Date</label>
                <input
                  type="Date"
                  class="form-control is-valid"
                  value={AcCreatedDate}
                  id="AcCreatedDate"
                  name="AcCreatedDate"
                  disabled
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userName">End Date</label>
                <input
                  type="Date"
                  class="form-control is-valid"
                  value={AcEndDate}
                  id="AcEndDate"
                  name="AcEndDate"
                />
              </div>
            </div>

            <div className="row">
              <div class="col-md-8 mb-3">
                <label for="userFname">Description</label>
                <textarea
                  type="text"
                  class="form-control is-valid"
                  value={AcDescription}
                  id="AcDescription"
                  name="AcDescription"
                  required
                />
              </div>
            </div>

            <div>
            <button
              type="submit"
              class="btn btn-outline-success"
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              Submit
            </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}

export default Activities;
