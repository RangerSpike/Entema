import React, { useEffect, useState, useMemo } from "react";
import PopupPO from "./PurchaseOrderModal";
import CachedIcon from "@material-ui/icons/Cached";
import PopupPdf from "./purchaseOrderPdf";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { useHistory } from "react-router-dom";

import useFullPageLoader from "../../../hooks/useFullPageLoader";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { TableHeader, Pagination, Search } from "../../DataTable";
import axios from "axios";
import { IconButton } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const DataTable = () => {
  const history = useHistory();

  const [comments, setComments] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [openPopup, setOpenPopup] = useState(false);
  const [openpdfPopup, setOpenpdfPopup] = useState(false);
  const [myID, setMyID] = useState("");

  const [id, setId] = useState();

  const openInPopup = (item) => {
    setOpenPopup(true);
    setId(item);
  };

  const openPdfPopup = (item) => {
    setOpenpdfPopup(true);
    setId(item);
  };
  const ITEMS_PER_PAGE = 10;

  const headers = [
    { name: "Po Id", field: "Po Id", sortable: false },
    { name: "Doc No", field: "Doc No", sortable: false },
    { name: "Vendor", field: "Vendor", sortable: false },
    { name: "Work Started", field: "Work Started", sortable: false },
    { name: "Work Ended", field: "Work Ended", sortable: false },
    { name: "Created By", field: "Created By", sortable: false },
    { name: "Work Location", field: "Work Location", sortable: false },
    {
      name: "Quotation Reference",
      field: "Quotation Reference",
      sortable: false,
    },
    { name: "Work Order No", field: "Work Order No", sortable: false },
    { name: "Status", field: "Status", sortable: false },
    { name: "Delete", field: "Delete", sortable: false },
    { name: "Operations", field: "Operations", sortable: false },
    { name: "PDF", field: "PDF", sortable: false },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [vatData, setVatData] = useState();

  const getData = () => {
    showLoader();

    fetch("https://mssoftware.xyz/getPOData")
      .then((response) => response.json())
      .then((json) => {
        hideLoader();
        setComments(json);
      });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    //console.log("MY ID : ",id);
  };

  const buttonClick = (id) => {
    setMyID(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const approvedClose = () => {
    // console.log(myID);
    setAnchorEl(null);
    axios
      .post("https://mssoftware.xyz/updatePoStatus", {
        POID: myID,
        posts: "Approved",
      })
      .then((res) => {
        getData();
      });
    setMyID("");
  };

  const openInStatement = (vendorId) => {
    console.log("IDIDI: ", vendorId);

    history.push(`/Statement/${vendorId}`);
  };
  const notApproveClose = () => {
    // console.log(myID);
    setAnchorEl(null);
    axios
      .post("https://mssoftware.xyz/updatePoStatus", {
        POID: myID,
        posts: "Not Approved",
      })
      .then((res) => {
        getData();
      });
    setMyID("");
  };

  useEffect(() => {
    getData();
  }, []);

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
            getData();
          });
      });
  };

  const test = (data) => {
    alert("hurrray :" + data);
  };
  const commentsData = useMemo(() => {
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.VI_VENDOR.toLowerCase().includes(search.toLowerCase()) ||
          comment.WS_LOC.toLowerCase().includes(search.toLowerCase())
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

  return (
    <>
      <div class="scrollbar square scrollbar-lady-lips thin">
        <div
          class="container"
          style={{ paddingTop: "3px", paddingLeft: "5px" }}
        >
          <div className="heading-layout1">
            <div className="item-title">
              <h3 style={{ padding: "50px" }}>List of Purchase Order</h3>
            </div>
          </div>
          <CachedIcon
            onClick={() => getData()}
            style={{ marginRight: "10px", marginTop: "10px" }}
          />

          <div className="row w-100">
            <div className="col mb-3 col-12 text-center">
              <div className="row">
                <div
                  className="col-md-6 d-flex flex-row-reverse"
                  style={{ marginBottom: "30px", marginLeft: "340px" }}
                >
                  <Search
                    onSearch={(value) => {
                      setSearch(value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              <table className="table table-striped">
                <TableHeader
                  headers={headers}
                  onSorting={(field, order) => setSorting({ field, order })}
                />
                <tbody>
                  {commentsData.map((comment) => (
                    <tr>
                      <th
                        scope="row"
                        key={comment.PO_ID}
                        onClick={() => openInPopup(comment.PO_ID)}
                        style={{ cursor: "pointer" }}
                      >
                        {comment.PO_ID}
                      </th>
                      <td>{comment.DOC_NO}</td>
                      <td
                        onClick={() => openInStatement(comment.VI_VENDOR)}
                        style={{ cursor: "pointer" }}
                      >
                        {comment.VENDOR_DISP_NAME}
                      </td>
                      <td>{comment.WS_START_DATE}</td>
                      <td>{comment.WS_END_DATE}</td>
                      <td>{comment.CREATED_BY}</td>
                      <td>{comment.WS_LOC}</td>
                      <td>{comment.WO_QUO_REF}</td>
                      <td>{comment.WO_NUMBER}</td>
                      <td>{comment.PO_APPROVE_STATUS}</td>
                      <td>
                        <IconButton color="secondary">
                          <DeleteOutlineIcon
                            onClick={() => removePO(comment.PO_ID)}
                          />
                        </IconButton>
                      </td>
                      <td onClick={() => buttonClick(comment.PO_ID)}>
                        <div>
                          <Button
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                          >
                            <MenuOpenIcon />
                          </Button>
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            <MenuItem
                              onClick={() => {
                                approvedClose();
                              }}
                            >
                              Approved
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                notApproveClose();
                              }}
                            >
                              Not Approved
                            </MenuItem>
                          </Menu>
                        </div>
                      </td>
                      <td onClick={() => openPdfPopup(comment.PO_ID)}>
                        <PictureAsPdfIcon style={{ color: "green" }} />
                        PDF FILE
                      </td>
                    </tr>
                  ))}
                </tbody>
                <PopupPO
                  setId={setId}
                  id={id}
                  openPopup={openPopup}
                  setOpenPopup={setOpenPopup}
                ></PopupPO>
                <PopupPdf
                  setId={setId}
                  id={id}
                  openPopup={openpdfPopup}
                  setOpenPopup={setOpenpdfPopup}
                ></PopupPdf>
              </table>
            </div>
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
      {loader}
    </>
  );
};

export default DataTable;
