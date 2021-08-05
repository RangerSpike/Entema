import { useEffect, useState, useMemo } from "react";
import useFullPageLoader from "../../../hooks/useFullPageLoader";
import { Pagination } from "../../DataTable";
import axios from "axios";

import PopupPO from "../PurchaseOrder/PurchaseOrderModal";
import PopupTS from "../Timesheet/timeSheetModal";
import PopupVPR from "./PaymentReqModal";
import PopupVP from "../Timesheet/VendorPaymentModal";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CachedIcon from "@material-ui/icons/Cached";

const Statement = (props) => {
  const vid = props.match.params.vid;

  const [comments, setComments] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const ITEMS_PER_PAGE = 10;
  const [openPopup, setOpenPopup] = useState(false);
  const [openTSPopup, setOpenTSPopup] = useState(false);
  const [openVPRPopup, setOpenVPRPopup] = useState(false);
  const [openVPPopup, setOpenVPPopup] = useState(false);
  const [id, setId] = useState(null);

  const [vendorDetails, setVENDeatils] = useState([]);
  const [poDetails, setPOdetails] = useState([]);
  const [venTSDetails, setVENTSdetails] = useState([]);
  const [venPaymentDetails, setVENPaymentdetails] = useState([]);
  const [venAccDetails, setVENACdetails] = useState([]);

  const [venName, setVenName] = useState();
  const [venCPerson, setVenCPerson] = useState();
  const [venPhone, setVenPhone] = useState();
  const [venMobile, setVenMobile] = useState();
  const [venEmail, setVenEmail] = useState();
  const [venCode, setVenCode] = useState();
  const [venVat, setVenVat] = useState();
  const [venDOCNO, setVenDOCNO] = useState();
  const [venADD, setVenADD] = useState();

  const [venTotalAmt, setVenTotalAmt] = useState();
  const [venPaidAmt, setVenPaidAmt] = useState();
  const [venOutStanding, setVenOutStanding] = useState();
  const [venSumStanding, setVenSumStanding] = useState();

  const [venRequested, setVenRequested] = useState();
  const [vatDetails, setVatDetails] = useState();
  const [paidAmount, setPaidAmount] = useState();

  const [venTsid, setVenTsid] = useState();
  const [venid, setVenId] = useState();

  const [refresh, setRefresh] = useState(false);
  const [Tcolor, setColor] = useState("blue");

  const openInPopup = (item) => {
    setId(item);
    setOpenPopup(true);
  };

  const openInTSPopup = (item) => {
    setId(item);
    setOpenTSPopup(true);
  };

  const openInVPPopup = (item) => {
    setId(item);
    setOpenVPPopup(true);
  };

  const openInVPRPopup = (item) => {
    setVenTsid(item);
    setOpenVPRPopup(true);
    setRefresh(!refresh);
  };

  const paidAmntSts = (vid) => {
    axios
      .post("https://mssoftware.xyz/getPaidReqAmt", {
        venId: vid,
      })
      .then((res) => {
        console.log("Hi tthe; ", res.data);
        if (res.data.length > 0) {
          setVenRequested(res.data[0].TOTAL);
          setVenPaidAmt(res.data[1].TOTAL);
          setVenSumStanding(
            parseFloat(res.data[0].TOTAL) + parseFloat(res.data[1].TOTAL)
          );
          setRefresh(!refresh);
        }
      });
  };

  const removeTimeSheet = (tsId) => {
    axios
      .post("https://mssoftware.xyz/removeVenTSDataonId", {
        TSID: tsId,
      })
      .then((res) => {
        //console.log("recsuccessfully deleted user ", tsId);
        setRefresh(!refresh);
      });

    //console.log("TimeSheet ID : ", tsId);
  };

  const getVendorData = (vendorID) => {
    axios
      .post("http://mssoftware.xyz/getVendorIDData", {
        vendorID: vendorID,
      })
      .then((res) => {
        if (res.data.length > 0) {
          setVENDeatils(res.data);
          setVenName(res.data[0].VENDOR_NAME);
          setVenCPerson(res.data[0].VENDOR_CPERSON);
          setVenPhone(res.data[0].VENDOR_FL_PHONE);
          setVenMobile(res.data[0].VENDOR_PHONE);
          setVenEmail(res.data[0].VENDOR_EMAIL);
          setVenCode(res.data[0].VENDOR_CODE);
          setVenVat(res.data[0].VENDOR_VAT);
          setVenDOCNO(res.data[0].VENDOR_DOC_NO);
          setVenADD(res.data[0].VENDOR_ADD);
          axios
            .post("https://mssoftware.xyz/getVatDataOnID", {
              vendorID: vendorID,
            })
            .then((res) => {
              if (res.data.length > 0) {
                setVatDetails(res.data[0].VAT);
              }
            });
        }
      });
    return vendorDetails;
  };

  const getPOData = (vendorId) => {
    axios
      .post("https://mssoftware.xyz/getPODataBasedOnVenId", {
        vendorId: vendorId,
      })
      .then((res) => {
        if (res.data.length > 0) {
          setPOdetails(res.data);
        }
      });
    return poDetails;
  };

  const getTSdata = (vendorId) => {
    axios
      .post("https://mssoftware.xyz/getTSDataBasedOnVenId", {
        vendorId: vendorId,
      })
      .then((res) => {
        if (res.data.length > 0) {
          setVENTSdetails(res.data);
        }
      });
    return venTSDetails;
  };

  const getVpmdata = (vendorId) => {
    axios
      .post("https://mssoftware.xyz/getVPMDataBasedOnVenId", {
        vendorId: vendorId,
      })
      .then((res) => {
        if (res.data.length > 0) {
          setVENPaymentdetails(res.data);
        }
      });
    return venPaymentDetails;
  };

  useEffect(() => {
    getVendorData(vid);
    getPOData(vid);
    getTSdata(vid);
    getVpmdata(vid);
    paidAmntSts(vid);
  }, [vid]);

  useEffect(() => {
    refreshValues();
  }, [venTSDetails, refresh]);

  const refreshValues = () => {
    const lengthvalue = venTSDetails.length;
    let count = 0;

    for (var i = 0; i < lengthvalue; i++) {
      // console.log("amoutn :", venTSDetails[i].TS_TOTAL);
      count = parseFloat(count) + parseFloat(venTSDetails[i].TS_TOTAL);
    }
    let vatAmt = parseFloat(count) + parseFloat(calculateVatAmount(count));
    // console.log("my refreshed values are :", count);
    setVenTotalAmt(vatAmt);
    let diffAmt = vatAmt - venSumStanding;
    setVenOutStanding(diffAmt.toFixed(2));
  };

  const removeVendor = (vendorId) => {
    axios
      .post("https://mssoftware.xyz/removeVendorDataonId", {
        vendorID: vendorId,
      })
      .then((res) => {
        // console.log("recsuccessfully deleted user ", vendorId);
        setRefresh(!refresh);
      });

    // console.log("vendorID : ", vendorId);
  };

  const calculateVatAmount = (value) => {
    return parseFloat((vatDetails / 100) * value).toFixed(2);
  };

  const calculateNetAmt = (value) => {
    let amt = calculateVatAmount(value);
    let x = parseFloat(amt) + parseFloat(value);

    return x.toFixed(2);
  };

  const commentsData = useMemo(() => {
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.VENDOR_NAME.toLowerCase().includes(search.toLowerCase()) ||
          comment.VENDOR_CODE.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedComments.length);

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedComments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [comments, currentPage, search, sorting]);

  const isDisabled = (status) => {
    // console.log("isDiasasda", status);
    if (status == "Requested") {
      return true;
    } else {
      return false;
    }
  };
  const deleteDisable = (value) => {
    if (value != "Paid") return false;
    else return true;
  };
  const removePO = (POId) => {
    axios
      .post("https://mssoftware.xyz/removePODataonId", {
        POID: POId,
      })
      .then((res) => {
        axios
          .post("https://mssoftware.xyz/removePOMulDataonId", {
            POID: POId,
          })
          .then((res) => {
            setRefresh(!refresh);
          });
      });
  };

  const removeVenPm = (pmntId) => {
    axios
      .post("https://mssoftware.xyz/removeVenPmntDataonId", {
        PMID: pmntId,
      })
      .then((res) => {
        // console.log("recsuccessfully deleted user ", pmntId);
        setRefresh(!refresh);
      });

    // console.log('vendor payment ID : ', pmntId);
  };

  const approvePaymentSts = (value) => {
    // alert("hi there" + value);
    setColor("#000");

    axios
      .post("https://mssoftware.xyz/updateVenPmntRequestStatus", {
        pmntSts: "Paid",
        pmntId: value,
      })
      .then((res) => {
        // console.log("updated Values Successfully : ", res.data);
        setRefresh(!refresh);
      });
  };

  return (
    <>
      <div class="scrollbar square scrollbar-lady-lips thin">
        <div
          class="container"
          style={{ paddingTop: "30px", paddingLeft: "50px" }}
        >
          <div
            class="container"
            style={{ paddingTop: "8px", paddingLeft: "8px" }}
          >
            <h1>Vendor : {venName} </h1>
            <div className="heading-layout1">
              <div className="row">
                <div className="col-sm-6">
                  <h3 style={{ padding: "10px" }}></h3>
                  <label>Name : {venName} </label>
                  <br></br>
                  <label>Contact Person : {venCPerson}</label>
                  <br></br>
                  <label>Phone : {venPhone}</label>
                  <br></br>
                  <label>Mobile : {venMobile}</label>
                  <br></br>
                  <label>Email: {venEmail}</label>
                  <br></br>
                </div>
                <div className="col-sm-6">
                  <h3 style={{ padding: "10px" }}></h3>
                  <label>Code : {venCode} </label>
                  <br></br>
                  <label>VAT : {venVat}</label>
                  <br></br>
                  <label>Document No : {venDOCNO}</label>
                  <br></br>
                  <label>Address : {venADD}</label>
                  <br></br>
                </div>
              </div>
            </div>

            <div className="row w-100">
              <text style={{ marginLeft: "20px", marginTop: "40px" }}>
                Purchase Orders
              </text>
              <div className="col mb-3 col-12 text-center">
                <table
                  className="table table-striped"
                  style={{ width: "100%" }}
                >
                  <tr>
                    <th scope="row">Date</th>
                    <th scope="row">Project</th>
                    <th scope="row">Working Location</th>
                    <th scope="row">Mobilization Date</th>
                    <th scope="row">Approved</th>
                    <th scope="row">Actions</th>
                  </tr>
                  <tbody>
                    {poDetails.map((data) => (
                      <tr>
                        <th
                          scope="row"
                          key={data.PO_ID}
                          // onClick={() => openInPopup(data.PMNT_ID)}
                        >
                          {data.CREATED_DATE}
                        </th>
                        <td>{data.WO_PROJECT}</td>
                        <td>{data.WS_LOC}</td>
                        <td>{data.WS_MOB_DATE}</td>
                        <td>{data.PO_APPROVE_STATUS}</td>
                        <td>
                          <EditIcon
                            color="primary"
                            onClick={() => {
                              openInPopup(data.PO_ID);
                            }}
                          />
                          <DeleteIcon
                            color="secondary"
                            onClick={() => removePO(data.PO_ID)}
                            style={{ cursor: "pointer" }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <PopupPO
                  id={id}
                  openPopup={openPopup}
                  setOpenPopup={setOpenPopup}
                ></PopupPO>
              </div>
              <text style={{ marginLeft: "20px", marginTop: "40px" }}>
                TimeSheets
              </text>

              <table
                className="table table-striped"
                style={{ width: "100%", marginLeft: "20px" }}
              >
                <tr>
                  <th scope="row">T NO</th>
                  <th scope="row">Month,Yr</th>
                  <th scope="row">Gross Amt</th>
                  <th scope="row">VAT</th>

                  <th scope="row">Net Amt</th>
                  <th scope="row">Request Payment</th>

                  <th scope="row">Actions</th>
                </tr>
                <tbody>
                  {venTSDetails.map((data) => (
                    <tr>
                      <th
                        scope="row"
                        key={data.VTS_ID}
                        onClick={() => {
                          openInTSPopup(data.VTS_ID);
                        }}
                      >
                        {data.VTS_ID}
                      </th>
                      <td>
                        {data.TS_MONTH},{data.TS_YEAR}
                      </td>
                      <td>{data.TS_TOTAL}</td>
                      <td>
                        {calculateVatAmount(data.TS_TOTAL)} ({vatDetails}%)
                      </td>
                      <td>{calculateNetAmt(data.TS_TOTAL)}</td>
                      <td>
                        <button
                          onClick={() => openInVPRPopup(data.VTS_ID)}
                          style={{ cursor: "pointer" }}
                          disabled={isDisabled(data.REQUEST_STATUS)}
                        >
                          {data.REQUEST_STATUS}
                        </button>
                      </td>

                      <td>
                        <EditIcon
                          color="primary"
                          onClick={() => {
                            openInTSPopup(data.VTS_ID);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                        <DeleteIcon
                          color="secondary"
                          onClick={() => removeTimeSheet(data.VTS_ID)}
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <PopupTS
                id={id}
                openPopup={openTSPopup}
                setOpenPopup={setOpenTSPopup}
              ></PopupTS>
              <PopupVPR
                refresh={refresh}
                setRefresh={setRefresh}
                venId={venid}
                tsId={venTsid}
                openPopup={openVPRPopup}
                setOpenPopup={setOpenVPRPopup}
              ></PopupVPR>
              <text style={{ marginLeft: "20px", marginTop: "40px" }}>
                Payment Details
              </text>

              <table
                className="table table-striped"
                style={{ width: "100%", marginLeft: "20px" }}
              >
                <tr>
                  <th scope="row">Sr No</th>
                  <th scope="row">Requested Amount</th>
                  <th scope="row">Paid Amount</th>
                  <th scope="row">Status</th>
                  <th scope="row">Mode</th>
                  <th scope="row">Description</th>
                  <th scope="row">Created</th>
                  <th scope="row">Actions</th>
                </tr>
                <tbody>
                  {venPaymentDetails.map((data) => (
                    <tr>
                      <th
                        scope="row"
                        key={data.PMNT_ID}
                        style={{ cursor: "pointer" }}
                      >
                        {data.PMNT_ID}
                      </th>
                      <td>{data.PM_AMOUNT}</td>
                      <td>{data.CLEARED_AMOUNT}</td>
                      <td
                        onClick={() => approvePaymentSts(data.PMNT_ID)}
                        style={{ cursor: "pointer", color: Tcolor }}
                      >
                        {data.PM_STATUS}
                      </td>
                      <td>{data.PM_PMNT_MODE}</td>
                      <td>{data.PM_DESCRIPTION}</td>
                      <td>{data.CREATED_DATE}</td>
                      <td>
                        <EditIcon
                          color="primary"
                          onClick={() => openInVPPopup(data.PMNT_ID)}
                          style={{ cursor: "pointer" }}
                        />
                        <DeleteIcon
                          color="secondary"
                          onClick={() => removeVenPm(data.PMNT_ID)}
                          style={{ cursor: "pointer" }}
                          hidden={deleteDisable(data.PM_STATUS)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <PopupVP
                id={id}
                openPopup={openVPPopup}
                setOpenPopup={setOpenVPPopup}
              ></PopupVP>

              <text style={{ marginLeft: "20px", marginTop: "40px" }}>
                Accounts{" "}
                <CachedIcon
                  onClick={() => refreshValues()}
                  style={{ cursor: "pointer" }}
                />
              </text>

              <table
                className="table table-striped"
                style={{ width: "100%", marginLeft: "20px" }}
              >
                <tr>
                  <th scope="row">Total Amount (+Vat)</th>
                  <th scope="row">Paid Amount</th>
                  <th scope="row">Outstanding</th>
                  <th scope="row">Requested</th>
                </tr>
                <tbody>
                  <tr>
                    <td>{venTotalAmt}</td>
                    <td>{venPaidAmt}</td>
                    <td>{venOutStanding}</td>
                    <td>{venRequested}</td>
                  </tr>
                </tbody>
              </table>
              <div className="col-md-6">
                <Pagination
                  total={totalItems}
                  itemsPerPage={ITEMS_PER_PAGE}
                  currentPage={currentPage}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {loader}
    </>
  );
};

export default Statement;