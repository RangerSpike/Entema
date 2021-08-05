import { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Container,
  Grid,
  TextField,
  IconButton,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "auto",
    paddingTop: theme.spacing(5),
  },
  inputGroup: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function AddVat() {
  const classes = useStyles();
  const history = useHistory();

  const [vendorvat, setVendorvat] = useState();

  const vatTemplate = {
    vatsdate: "",
    vat: "",
    vatedate: "",
  };
  const [data, setData] = useState([vatTemplate]);

  const addData = (data) => {
    setData([...data, vatTemplate]);
    let x = data.length;
    let setDate = setDateFormat();
    if ((x = data.length)) {
      data[x - 1].vatedate = setDate;
    }

    console.log(data);
  };

  const loadDate = () => {
    let x = data.length;
    let setDate = setDateFormat();
    if ((x = data.length)) {
      data[x - 1].vatsdate = setDate;
    }
  };

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
    //vatTemplate.vatsdate = formatedDate;
    return formatedDate;
  };

  const onChange = (e, index) => {
    const updatedUsers = data.map((data, i) =>
      index === i
        ? Object.assign(data, { [e.target.name]: e.target.value })
        : data
    );
    console.log("newnew:", e.target.value);
    setData(updatedUsers);
  };

  const removeUsers = (index) => {
    console.log("index value :", index);
    const filteredUsers = [...data];
    filteredUsers.splice(index, 1);

    setData(filteredUsers);
  };

  const handleSubmit = (event) => {
    console.log(data);

    event.preventDefault();
    console.log("event : ", event);

    // Axios.post("https://mssoftware.xyz/removeVendorVat", {}).then((res) => {});

    Axios.post("https://mssoftware.xyz/insertVatData", {
      vendorvatdetails: data,
    }).then((res) => {});

    history.push("/");
  };

  return (
    <div>
      <div className="heading-layout1">
        <div className="item-title">
          <h3 style={{ padding: "10px" }}> VAT Details</h3>
        </div>
      </div>

      <div className="row">
        <div style={{ marginLeft: "8%" }}>Start Date</div>
        <div style={{ marginLeft: "22%" }}>VAT</div>
        <div style={{ marginLeft: "22%" }}>End Date</div>
      </div>

      <Container className={classes.root}>
        {data.map((data, index) => (
          <Grid
            container
            spacing={3}
            key={index}
            className={classes.inputGroup}
          >
            <Grid item md={4}>
              <TextField
                //label="CreatedDate"
                name="vatsdate"
                placeholder=""
                type="date"
                variant="outlined"
                value={data.vatsdate}
                onChange={(e) => onChange(e, index)}
                fullWidth
              />
            </Grid>

            <Grid item md={3}>
              <TextField
                label="vat /in%"
                name="vat"
                placeholder="vat"
                variant="outlined"
                onChange={(e) => onChange(e, index)}
                value={data.vat}
                fullWidth
              />
            </Grid>

            <Grid item md={4}>
              <TextField
                // label="End Date"
                name="vatedate"
                type="date"
                placeholder=""
                variant="outlined"
                value={data.vatedate}
                onChange={(e) => onChange(e, index)}
                fullWidth
              />
            </Grid>

            <Grid item md={1}>
              <IconButton color="secondary">
                <DeleteOutlineIcon onClick={() => removeUsers(index)} />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={() => addData(data)}
        >
          Add VAT Details
        </Button>
      </Container>

      <button
        type="submit"
        class="btn btn-outline-success"
        onClick={handleSubmit}
        style={{ marginTop: "20px", marginBottom: "20px", marginLeft: "30px" }}
      >
        Submit
      </button>
    </div>
  );
}

export default AddVat;
