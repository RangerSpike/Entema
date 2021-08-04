// eslint-disable-next-line
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
} from "@material-ui/core";
//import crypto from "crypto";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    paddingRight: "0px",
  },
  root: {
    width: "auto",
    height: "auto",
    backgroundColor: theme.palette.grey[300],
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  inputGroup: {
    minWidth: 120,
  },
}));

export default function Popup(props) {
  const { setId, id, openPopup, setOpenPopup } = props;

  // const algorithm = "aes-256-cbc";

  // const initVector = crypto.randomBytes(16);

  // const Securitykey = crypto.randomBytes(32);

  // const decryptData = (encryptedData) => {
  //   const decipher = crypto.createDecipheriv(
  //     algorithm,
  //     Securitykey,
  //     initVector
  //   );

  //   let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

  //   decryptedData += decipher.final("utf8");

  //   console.log("Decrypted message: " + decryptedData);
  //   return decryptedData;
  // };

  const classes = useStyles();

  const [userName, setUserName] = useState();
  const [userFname, setUserFname] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPwd, setUserPwd] = useState();
  const [userCpwd, setUserCpwd] = useState();
  const [userPhone, setUserPhone] = useState();
  const [userDesignation, setUserDesignation] = useState();
  const [userRole, setUserRole] = useState();
  const [userStatus, setUserStatus] = useState("1");
  const [userActdate, setUserActdate] = useState();
  const [userDactdate, setUserDactdate] = useState();

  const [showForm, setShowForm] = useState(true);

  const [roleLov, setRoleLov] = useState([]);
  const [mandDact, setMandDact] = useState(false);

  if (props.formAccess === false) {
    setShowForm(false);
  }

  const statusLov = [
    { key: "", value: "Select Status" },
    { key: "1", value: "Active" },
    { key: "2", value: "Inactive" },
  ];

  const getRoleLovData = () => {
    fetch("https://mssoftware.xyz/getRolesData", {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setRoleLov(response);
      });
    return roleLov;
  };

  useEffect(() => {
    getRoleLovData();
    setUserActdate(setDateFormat());
  }, []);

  useEffect(() => {
    axios
      .post("https://mssoftware.xyz/getUserDataonId", {
        userID: id,
      })
      .then((res) => {
        // console.log("FROM MODAL :", res.data);

        if (id > 0) {
          setUserName(res.data[0].USER_NAME);
          setUserFname(res.data[0].USER_FNAME);
          setUserEmail(res.data[0].USER_EMAIL);
          setUserPhone(res.data[0].USER_PHONE);
          setUserPwd(res.data[0].USER_PWD);
          setUserCpwd(res.data[0].USER_PWD);
          setUserDesignation(res.data[0].USER_DESIG);
          setUserRole(res.data[0].USER_ROLE);
          setUserStatus(res.data[0].USER_STATUS);
          //setUserID(res.data[0].USER_ID);
          setUserActdate(res.data[0].USER_ACT_DATE);
          setUserDactdate(res.data[0].USER_DACT_DATE);
        }
      });
  }, [id]);

  const setDateFormat = (value) => {
    let currentDate;
    if (value) {
      currentDate = new Date(value);
    } else {
      currentDate = new Date();
    }

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

  const onStatusChange = (value) => {
    if (value === "2") {
      setMandDact(true);
      setUserDactdate(setDateFormat());
    } else {
      setMandDact(false);
      setUserDactdate("");
    }
  };

  const handleChangeEvent = (e) => {
    // return (e.target.name = e.target.value);

    const input = e.target.name;

    if (input == "userName") {
      setUserName(e.target.value);
    } else if (input === "userFname") {
      setUserFname(e.target.value);
    } else if (input === "userEmail") {
      setUserEmail(e.target.value);
    } else if (input === "userPwd") {
      setUserPwd(e.target.value);
    } else if (input === "userCpwd") {
      setUserCpwd(e.target.value);
    } else if (input === "userPhone") {
      setUserPhone(e.target.value);
    } else if (input === "userDesignation") {
      setUserDesignation(e.target.value);
    } else if (input === "userRole") {
      setUserRole(e.target.value);
    } else if (input === "userStatus") {
      setUserStatus(e.target.value);
      onStatusChange(e.target.value);
    } else if (input === "userActdate") {
      setUserActdate(e.target.value);
    } else if (input === "userDactdate") {
      setUserDactdate(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (userPwd === userCpwd) {
      axios
        .post("https://mssoftware.xyz/UpdateUserData", {
          userId: id,
          userName: userName,
          userFname: userFname,
          userEmail: userEmail,
          userPwd: userPwd,
          userCpwd: userCpwd,
          userPhone: userPhone,
          userDesignation: userDesignation,
          userRole: userRole,
          userStatus: userStatus,
          userActdate: userActdate,
          userDactdate: userDactdate,
        })
        .then((res) => {});
      setOpenPopup(false);
    } else {
      alert("your password are not Identical");
      return false;
    }
  };

  const onClosePopup = () => {
    setId(0);
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
            style={{ flex: "End" }}
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
          <div className="heading-layout1">
            <div className="item-title">
              <h3 style={{ padding: "50px" }}>Update User</h3>
            </div>
          </div>
          <form>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="userName">User name</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="userName"
                  name="userName"
                  value={userName}
                  onChange={handleChangeEvent}
                  required
                />
              </div>

              <div class="col-md-4 mb-3">
                <label for="userFname">Full Name</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="userFname"
                  name="userFname"
                  value={userFname}
                  onChange={handleChangeEvent}
                  required
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userEmail">User Email</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="userEmail"
                  name="userEmail"
                  value={userEmail}
                  onChange={handleChangeEvent}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="userPwd">Password</label>
                <input
                  type="password"
                  class="form-control is-valid"
                  id="userPwd"
                  name="userPwd"
                  value={userPwd}
                  onChange={handleChangeEvent}
                  required
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userCpwd">Confirm Password</label>
                <input
                  type="password"
                  class="form-control is-valid"
                  id="userCpwd"
                  name="userCpwd"
                  value={userCpwd}
                  onChange={handleChangeEvent}
                  required
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userPhone">Phone</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="userPhone"
                  name="userPhone"
                  value={userPhone}
                  onChange={handleChangeEvent}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="userDesignation">Designation</label>
                <input
                  type="text"
                  class="form-control is-valid"
                  id="userDesignation"
                  name="userDesignation"
                  value={userDesignation}
                  onChange={handleChangeEvent}
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userRole">Role</label>
                <select
                  class="form-control is-valid"
                  id="userRole"
                  name="userRole"
                  value={userRole}
                  onChange={handleChangeEvent}
                  required
                >
                  <option key="" value="">
                    Select Role
                  </option>
                  {roleLov.map((data) => (
                    <option key={data.RL_ID} value={data.RL_ID}>
                      {data.RL_NAME}
                    </option>
                  ))}
                </select>
              </div>
              <div class="col-md-4 mb-3">
                <label for="userStatus">Status</label>
                <select
                  class="form-control is-valid"
                  id="userStatus"
                  name="userStatus"
                  value={userStatus}
                  onChange={handleChangeEvent}
                  required
                >
                  {statusLov.map((data) => (
                    <option key={data.key} value={data.key}>
                      {data.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div class="col-md-4 mb-3">
                <label for="userActdate">Activation Date</label>
                <input
                  type="date"
                  class="form-control is-valid"
                  id="userActdate"
                  name="userActdate"
                  onChange={handleChangeEvent}
                  required
                  value={userActdate}
                />
              </div>
              <div class="col-md-4 mb-3">
                <label for="userDactdate">Deactivation Date</label>
                <input
                  type="date"
                  class="form-control is-valid"
                  id="userDactdate"
                  name="userDactdate"
                  onChange={handleChangeEvent}
                  value={userDactdate}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="btn btn-outline-success"
                style={{ marginTop: "20px", marginBottom: "20px" }}
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
