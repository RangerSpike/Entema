import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { useHistory } from "react-router-dom";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 690,
    maxWidth: 700,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Roles() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const [personName, setPersonName] = useState([]);
  const [RoRolesName, setRoRolesName] = useState();
  const [RoCreatedDate, setRoCreatedDate] = useState();
  const [RoEndDate, setRoEndDate] = useState();
  const [RoDescription, setRoDescription] = useState();
  const [actLov, setActLov] = useState([]);
  const [roleID, setRoleID] = useState();

  const getActivitiesLov = () => {
    fetch("http://mssoftware.xyz/getActivitiesData", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setActLov(response);
      });

    return actLov;
  };

  const generateUniqueId = () => {
    let currentDate = new Date();
    let uniqueValue =
      "" +
      currentDate.getFullYear() +
      (currentDate.getMonth() + 1) +
      currentDate.getDate() +
      currentDate.getHours() +
      currentDate.getMinutes() +
      currentDate.getSeconds() +
      currentDate.getMilliseconds();

    setRoleID(uniqueValue);

    // return uniqueValue;
  };

  const clearLov = () => {
    // console.log("Clearing Lov");
    setPersonName([]);
  };

  const handleChangeEvent = (e) => {
    const input = e.target.name;

    if (input === "RoRolesName") {
      setRoRolesName(e.target.value);
    } else if (input === "RoCreatedDate") {
      setRoCreatedDate(e.target.value);
    } else if (input === "RoEndDate") {
      setRoEndDate(e.target.value);
    } else if (input === "RoDescription") {
      setRoDescription(e.target.value);
    } else if (input === "personName") {
      setPersonName(e.target.value);
    }
  };

  useEffect(() => {
    generateUniqueId();
    setRoCreatedDate(setDateFormat());
    getActivitiesLov();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://mssoftware.xyz/insertRolesData", {
        rlId: roleID,
        rlname: RoRolesName,
        rlenddate: RoEndDate,
        rldescription: RoDescription,
        rlactivities: personName,
        createdby:localStorage.getItem("userDetails")
      })
      .then((res) => {
        // setData(res.data);
        //  setDupData(res.data);
      });

    history.push("/Viewuser");
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
              <h3 style={{ padding: "50px" }}>Roles</h3>
            </div>
          </div>
          <form onSubmit={handleSubmit} onChange={handleChangeEvent}>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="userName">Roles Name</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  value={RoRolesName}
                  id="RoRolesName"
                  name="RoRolesName"
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
                  value={RoCreatedDate}
                  id="RoCreatedDate"
                  name="RoCreatedDate"
                  disabled
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userName">End Date</label>
                <input
                  type="Date"
                  class="form-control is-valid"
                  value={RoEndDate}
                  id="RoEndDate"
                  name="RoEndDate"
                />
              </div>
            </div>

            <div className="row">
              <div class="col-md-8 mb-3">
                <label for="userFname">Description</label>
                <textarea
                  type="text"
                  class="form-control is-valid"
                  value={RoDescription}
                  id="RoDescription"
                  name="RoDescription"                
                />
              </div>
            </div>

            <FormControl className={classes.formControl}>
              <label id="demo-mutiple-chip-label">Activities</label>
              <Select
                style={{
                  borderStyle: "groove",
                  borderRadius: "5px",
                  borderColor: "#a2e0a2",
                  backgroundColor: "white",
                  marginTop: "0px",
                }}
                labelId="demo-mutiple-chip-label"
                id="personName"
                name="personName"
                multiple
                value={personName}
                onChange={handleChangeEvent}
                input={<Input id="select-multiple-chip" />}
                required
                renderValue={(selected) => (
                  <div className="demo-mutiple-chip-label">
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {actLov.map((name) => (
                  <MenuItem
                    key={name.ACT_ID}
                    value={name.ACT_NAME}
                    style={getStyles(name, personName, theme)}
                  >
                    ACT_ID-{name.ACT_ID}-------{name.ACT_NAME}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div>
              <Link onClick={clearLov}>Clear Activities</Link>
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
