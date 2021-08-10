// eslint-disable-next-line
import React, { useEffect, useState, useMemo } from "react";
import Popup from "./ManPowerPaymentModal";

import useFullPageLoader from "../../../hooks/useFullPageLoader";
import { TableHeader, Pagination, Search } from "../../DataTable";
import CachedIcon from "@material-ui/icons/Cached";

import axios from "axios";
import { IconButton } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const DataTable = () => {
  const [comments, setComments] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [openPopup, setOpenPopup] = useState(false);

  const [id, setId] = useState();

  const ITEMS_PER_PAGE = 10;

  const openInPopup = (item) => {
    setId(item);
    setOpenPopup(true);
  };

  const headers = [
    { name: "Id", field: "Id", sortable: false },
    { name: "ManPower Name", field: "ManPower Name", sortable: false },
    { name: "TimeSheet", field: "TimeSheet", sortable: false },
    { name: "Amount", field: "Amount", sortable: false },
    { name: "Mode of Payment", field: "Mode of Payment", sortable: false },
    { name: "Status", field: "Status", sortable: false },
    { name: "Delete", field: "Delete", sortable: false },
  ];

  const getData = () => {
    showLoader();

    fetch("http://mssoftware.xyz/getManpowerPayment")
      .then((response) => response.json())
      .then((json) => {
        hideLoader();
        // console.log("fetch :", json);
        setComments(json);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1300);
  }, [id]);

  const removeData = (mppmid) => {
    axios
      .post("http://mssoftware.xyz/removeMpPmntDataonId", {
        mppmid: mppmid,
      })
      .then((res) => {
        getData();
      });
  };
  const commentsData = useMemo(() => {
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter((comment) =>
        comment.PM_DISP_NAME.toLowerCase().includes(search.toLowerCase())
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

  const testingME = (value) => {
    if (value != "Paid") return false;
    else return true;
  };

  return (
    <>
      <div class="scrollbar square scrollbar-lady-lips thin">
        <div
          class="container"
          style={{ paddingTop: "3px", paddingLeft: "5px", width: "100%" }}
        >
          <div className="heading-layout1">
            <div className="item-title">
              <h3 style={{ padding: "50px" }}>ManPower Claims</h3>
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
                      <th scope="row" key={comment.PMNT_ID}>
                        {comment.PMNT_ID}
                      </th>
                      <td
                        onClick={() => openInPopup(comment.PMNT_ID)}
                        style={{ cursor: "pointer" }}
                      >
                        {comment.PM_DISP_NAME}
                      </td>
                      <td>{comment.TS_DISP_NAME}</td>
                      <td>{comment.PM_AMOUNT}</td>
                      <td>{comment.PM_PMNT_MODE}</td>
                      <td
                        onClick={() => openInPopup(comment.PMNT_ID)}
                        style={{ cursor: "pointer" }}
                      >
                        {comment.PM_STATUS}
                      </td>

                      <td hidden={testingME(comment.PM_STATUS)}>
                        <IconButton color="secondary">
                          <DeleteOutlineIcon
                            onClick={() => removeData(comment.PMNT_ID)}
                            style={{ cursor: "pointer" }}
                          />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Popup
                setId={setId}
                id={id}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
              ></Popup>
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
