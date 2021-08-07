import React, { useEffect, useState, useMemo } from "react";
import useFullPageLoader from "../../../hooks/useFullPageLoader";
import { TableHeader, Pagination, Search } from "../../DataTable";
import axios from "axios";
import { IconButton, Button } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Popup from "./ManpowerModal";

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
    { name: "Iqama Id", field: "Iqama Id", sortable: false },
    { name: "Name", field: "Name", sortable: false },
    { name: "Category", field: "Category", sortable: false },
    // { name: "Benificary Name", field: "Benificary Name", sortable: false },
    // { name: "Bank Name", field: "Bank Name", sortable: false },
    // { name: "A/c No", field: "A/c No", sortable: false },
    { name: "Iban No", field: "Iban No", sortable: false },
    { name: "Location", field: "Location", sortable: false },
    { name: "Created Date", field: "Created Date", sortable: false },
    { name: "Created By", field: "Created By", sortable: false },
    { name: "Delete", field: "Delete", sortable: false },
  ];

  const getData = () => {
    showLoader();

    fetch("http://mssoftware.xyz/getManpowerData")
      .then((response) => response.json())
      .then((json) => {
        hideLoader(); 
        setComments(json);
        // console.log(json);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      getData();
    },1300);
  }, [id]);
  const removeManPower = (mpId) => {
    axios
      .post("http://mssoftware.xyz/removeMPDataonId", {
        MPID: mpId,
      })
      .then((res) => {
        // console.log("recsuccessfully deleted user ", mpId);
        getData();
      });

    // console.log("Manpower ID : ", mpId);
  };

  const test = (data) => {
    alert("hurrray :" + data);
  };
  const commentsData = useMemo(() => {
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.MP_NAME.toLowerCase().includes(search.toLowerCase()) ||
          comment.MP_IQAMA_ID.toLowerCase().includes(search.toLowerCase())
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
      <div class="container" style={{ paddingTop: "3px", paddingLeft: "5px" }}>
        <div className="heading-layout1">
          <div className="item-title">
            <h3 style={{ padding: "50px" }}>List of Manpower</h3>
          </div>
        </div>

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
                      key={comment.MP_ID}
                      onClick={() => openInPopup(comment.MP_ID)}
                      style={{cursor:'pointer'}}
                    >
                      {comment.MP_ID}
                    </th>
                    <td o>
                      {comment.MP_IQAMA_ID}
                    </td>
                    <td>
                      {comment.MP_NAME}
                    </td>
                    <td>{comment.MP_CATEGORY}</td>
                    {/* <td>{comment.MP_BENF_NAME}</td>
                                    <td>{comment.MP_BANK_NAME}</td> */}
                    {/* <td>{comment.MP_ACCOUNT}</td> */}
                    <td>{comment.MP_IBAN}</td>
                    <td>{comment.MP_LOC}</td>
                    <td>{comment.CREATED_DATE}</td>
                    <td>{comment.CREATED_BY}</td>

                    <td>
                      <IconButton color="secondary">
                        <DeleteOutlineIcon
                          onClick={() => removeManPower(comment.MP_ID)}
                        />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Popup
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
