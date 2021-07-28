import React, { useEffect, useState, useMemo } from "react";
import Popup from "./VendorsModal";
import useFullPageLoader from "../../../hooks/useFullPageLoader";
import CachedIcon from "@material-ui/icons/Cached";

import { TableHeader, Pagination, Search } from "../../DataTable";
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

  const ITEMS_PER_PAGE = 10;

  const [openPopup, setOpenPopup] = useState(false);
  const [id, setId] = useState(null);

  const openInPopup = (item) => {
    setId(item);
    setOpenPopup(true);
  };

  const headers = [
    { name: "Id", field: "Id", sortable: false },
    { name: "Vendor Name", field: "Vendor Name", sortable: false },
    { name: "Code", field: "Code", sortable: false },
    { name: "Phone", field: "Phone", sortable: false },
    { name: "Contact Person", field: "Contact Person", sortable: false },
    { name: "Mobile", field: "Mobile", sortable: false },
    { name: "Email", field: "Email", sortable: false },
    { name: "Delete", field: "Delete", sortable: false },
  ];

  const getData = () => {
    showLoader();

    fetch("https://mssoftware.xyz/getVendorData")
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

  const removeVendor = (vendorId) => {
    axios
      .post("https://mssoftware.xyz/removeVendorDataonId", {
        vendorID: vendorId,
      })
      .then((res) => {
        axios
          .post("https://mssoftware.xyz/removeVendorVatDataonId", {
            vendorID: vendorId,
          })
          .then((res) => {
            getData();
          });
        getData();
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

  return (
    <>
      <div class="scrollbar square scrollbar-lady-lips thin">
        <div
          class="container"
          style={{ paddingTop: "3px", paddingLeft: "5px" }}
        >
          <div className="heading-layout1">
            <div className="item-title">
              <h3 style={{ padding: "50px" }}>List of Vendors</h3>
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
                      <th scope="row" key={comment.VENDOR_id}>
                        {comment.VENDOR_ID}
                      </th>
                      <td
                        onClick={() => openInPopup(comment.VENDOR_ID)}
                        style={{ cursor: "pointer" }}
                      >
                        {comment.VENDOR_NAME}
                      </td>
                      <td>{comment.VENDOR_CODE}</td>
                      <td>{comment.VENDOR_FL_PHONE}</td>
                      <td>{comment.VENDOR_CPERSON}</td>
                      <td>{comment.VENDOR_PHONE}</td>
                      <td>{comment.VENDOR_EMAIL}</td>
                      <td>
                        <IconButton color="secondary">
                          <DeleteOutlineIcon
                            onClick={() => removeVendor(comment.VENDOR_ID)}
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
