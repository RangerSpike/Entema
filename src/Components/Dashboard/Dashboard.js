import React, { useEffect, useState } from "react";
import { Column, Row } from "simple-flexbox";
import { createUseStyles } from "react-jss";
import MiniCardComponent from "./MiniCardComponent";
import { FaUsers } from "react-icons/fa";
import { BsBlockquoteRight } from "react-icons/bs";
import { RiUserSettingsFill } from "react-icons/ri";
import { GoCalendar } from "react-icons/go";
import { BiPurchaseTag } from "react-icons/bi";
import axios from "axios";
import { History } from "history";
import { useHistory } from "react-router-dom";

const useStyles = createUseStyles({
  cardsContainer: {
    marginRight: -30,
    marginTop: -30,
  },
  cardRow: {
    marginTop: 30,
    "@media (max-width: 768px)": {
      marginTop: 0,
    },
  },
  miniCardContainer: {
    flexGrow: 1,
    marginRight: 30,
    "@media (max-width: 768px)": {
      marginTop: 30,
      maxWidth: "none",
    },
  },
  todayTrends: {
    marginTop: 30,
  },
  lastRow: {
    marginTop: 30,
  },
  unresolvedTickets: {
    marginRight: 30,
    "@media (max-width: 1024px)": {
      marginRight: 0,
    },
  },
  tasks: {
    marginTop: 0,
    "@media (max-width: 1024px)": {
      marginTop: 30,
    },
  },
});
function DashboardComponent() {
  const history = useHistory();

  const [users, setUsers] = useState();
  const [vendors, setVendors] = useState();
  const [clients, setClients] = useState();
  const [po, setPO] = useState();
  const [qo, setQO] = useState();
  const [vts, setVTS] = useState();
  const [manpower, setManpower] = useState();
  const [mts, setMTS] = useState();
  const [dataSet, setDataset] = useState([]);

  const getDashboardData = () => {
    axios.get("https://mssoftware.xyz/getDashboard", {}).then((res) => {
      console.log("result set in login page: ", res.data);
      setDataset(res.data);
      setUsers(res.data[5].COUNT);
      setVendors(res.data[6].COUNT);
      setClients(res.data[0].COUNT);
      setPO(res.data[3].COUNT);
      setQO(res.data[4].COUNT);
      setVTS(res.data[7].COUNT);
      setManpower(res.data[1].COUNT);
      setMTS(res.data[2].COUNT);
    });
  };

  const onClickNavigate = (toUrl) => {
    history.push(`${toUrl}`);
  };
  useEffect(() => {
    getDashboardData();
  }, []);

  const classes = useStyles();

  return (
    <>
      <div className="scrollbar square scrollbar-lady-lips thin">
        <div className="container">
          <div className="heading-layout1">
            <div className="item-title">
              <h3 style={{ padding: "50px" }}>Dashboard</h3>
            </div>
          </div>

          <Column>
            <div className="row" style={{ marginLeft: "50px" }}>
              <MiniCardComponent
                className={classes.miniCardContainer}
                title="Users"
                value={users}
                icon={<FaUsers onClick={() => onClickNavigate("/Viewuser")} />}
              />
              <MiniCardComponent                
                className={classes.miniCardContainer}
                title="Vendors"
                value={vendors}
                icon={<RiUserSettingsFill onClick={() => onClickNavigate("/ViewVendors")}/>}
              />
              <MiniCardComponent
                className={classes.miniCardContainer}
                title="Clients "
                value={clients}
                icon={
                  <img
                    src="client1.png"
                    style={{ width: "40px", color: "black" }}
                    alt="logo"
                    onClick={() => onClickNavigate("/ViewClients")}
                  />                  
                }
              />{" "}
            </div>

            <div
              className="row"
              style={{ marginTop: "30px", marginLeft: "50px" }}
            >
              <MiniCardComponent
                className={classes.miniCardContainer}
                title="Purchase "
                value={po}
                icon={<BiPurchaseTag onClick={() => onClickNavigate("/Viewpurchaseorder")}/>}
              />

              <MiniCardComponent
                className={classes.miniCardContainer}
                title="Quotation"
                value={qo}
                icon={<BsBlockquoteRight onClick={() => onClickNavigate("/ViewQuotation")}/>}
              />
              <MiniCardComponent
                className={classes.miniCardContainer}
                title="ManPower"
                value={manpower}
                icon={<GoCalendar onClick={() => onClickNavigate("/ViewManpower")}/>}
              />
            </div>

            <div
              className="row"
              style={{
                marginTop: "30px",
                marginLeft: "101px",
                marginBottom: "30px",
              }}
            >
              <MiniCardComponent
                className={classes.miniCardContainer}
                title="Vendor Time Sheet"
                value={vts}
                icon={
                  <img
                    src="manpower1.png"
                    style={{ width: "40px", color: "white" }}
                    alt="logo"
                    onClick={() => onClickNavigate("/ViewTimesheet")}
                  />
                }
              />

              <MiniCardComponent
                className={classes.miniCardContainer}
                title="ManPower Time Sheet"
                value={mts}
                icon={<GoCalendar onClick={() => onClickNavigate("/ViewTimesheetm")}/>}
              />
            </div>
          </Column>
        </div>
      </div>
    </>
  );
}

export default DashboardComponent;
