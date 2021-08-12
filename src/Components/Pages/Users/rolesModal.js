// eslint-disable-next-line
import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
} from "@material-ui/core";

import { useState } from "react";
import { Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import { useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "@material-ui/core";
import { MdRemoveFromQueue } from "react-icons/md";

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

export default function Popup(props) {
  const { id, setId, openPopup, setOpenPopup } = props;

  const classes = useStyles();
  const theme = useTheme();

  const [personName, setPersonName] = useState([]);
  const [RoRolesName, setRoRolesName] = useState();
  const [RoCreatedDate, setRoCreatedDate] = useState();
  const [RoEndDate, setRoEndDate] = useState();
  const [RoDescription, setRoDescription] = useState();
  const [actLov, setActLov] = useState([]);

  const getActivitiesLov = () => {
    fetch("http://entemadb.entema-software.com/getActivitiesData", {
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
    getActivitiesLov();
    if (id > 0) {
      setRoCreatedDate(setDateFormat());
    }
  }, []);

  let test = [];
  let newData = [];

  let a = [];

  useEffect(() => {
    axios
      .post("http://entemadb.entema-software.com/getRolesBasedOnId", {
        rolesid: id,
      })
      .then((res) => {
        ///setNewData(res.data[0]);
        if (id > 0) {
          setRoRolesName(res.data[0].RL_NAME);
          setRoCreatedDate(res.data[0].CREATED_DATE);
          setRoEndDate(res.data[0].RL_END_DATE);
          setRoDescription(res.data[0].RL_DESCRIPTION);
        }
      });

    axios
      .post("http://entemadb.entema-software.com/getRolesActDataBasedOnId", {
        roleactid: id,
      })
      .then((res) => {
        if (id) {
          newData = res.data;

          for (var i = 0; i < newData.length; ) {
            a.push(newData[i].ACTIVITY_NAME);
            setPersonName(a);

            if (i == newData.lengt - 1) {
              break;
            } else {
              i++;
            }
          }
        }
      });
  }, [id]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://entemadb.entema-software.com/removeRolesActDataBasedOnId", {
        rolesid: id,
      })
      .then((res) => {
        // console.log("DELETED");
      });

    axios
      .post("http://entemadb.entema-software.com/updateRolesData", {
        rlId: id,
        rlname: RoRolesName,
        rlenddate: RoEndDate,
        rldescription: RoDescription,        
        rlactivities: personName,
      })
      .then((res) => {
        // console.log("updated Values Successfully : ", res.data);
      });

    setOpenPopup(false);
  };

  const onClosePopup = () => {
    setId("");
    setPersonName([]);
    setOpenPopup(false);
  };
  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle>
        <div style={{ display: "flex" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onClosePopup()}
            style={{ flex: "end" }}
          >
            Close
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
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
            <form>
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
                    onChange={handleChangeEvent}
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
                    onChange={handleChangeEvent}
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
                    onChange={handleChangeEvent}
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
                    required
                    onChange={handleChangeEvent}
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
                      {id
                        ? selected.map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              className={classes.chip}
                            />
                          ))
                        : null}
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
                  type="button"
                  class="btn btn-outline-success"
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
