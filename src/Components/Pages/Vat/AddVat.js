import { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import CachedIcon from "@material-ui/icons/Cached";
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
  let newData = [];
  let test = [];

  const getVatData = () => {
    Axios.get("http://entemadb.entema-software.com/getVatData", {}).then((res) => {
      if (res.data.length > 0) {
        // console.log(res.data);
        newData = res.data;

        var x = newData.length;
        var rows = [];

        for (var i = 0; i < x; i++) {
          rows.push(vatTemplate);

          test[i] = {
            vatsdate: newData[i].VEN_START_DATE,
            vat: newData[i].VAT,
            vatedate: newData[i].VEN_END_DATE,
          };
        }
        setData(test);
      }
    });
  };

  useEffect(() => {
    getVatData();
  }, []);

  const addData = (data) => {
    setData([...data, vatTemplate]);
    let x = data.length;
    let setDate = setDateFormat();
    if ((x = data.length)) {
      data[x - 1].vatedate = setDate;
    }    
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
    // console.log("newnew:", e.target.value);
    setData(updatedUsers);
  };

  const removeUsers = (index) => {
    // console.log("index value :", index);
    const filteredUsers = [...data];
    filteredUsers.splice(index, 1);

    let x = filteredUsers.length;
      if ((x = filteredUsers.length)) {
      // console.log(filteredUsers[x - 1].vatedate);
      filteredUsers[x - 1].vatedate = "";
    }

    setData(filteredUsers);
  };

  const handleSubmit = (event) => {
    // console.log(data);

    event.preventDefault();
    // console.log("event : ", event);

    Axios.post("http://entemadb.entema-software.com/removeVendorVat").then((res) => {
      // console.log("deleted Successfully");
    });

    Axios.post("http://entemadb.entema-software.com/insertVatData", {
      vendorvatdetails: data,
    }).then((res) => {});

    history.push("/");
  };

  return (
    <div class="scrollbar square scrollbar-lady-lips thin">
      <div>
        <div className="heading-layout1">
          <div className="item-title">
            <h3 style={{ padding: "10px" }}> VAT Details</h3>
          </div>
        </div>
        <CachedIcon
          onClick={() => getVatData()}
          style={{ marginRight: "10px", marginTop: "10px" }}
        />

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
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            marginLeft: "30px",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddVat;
