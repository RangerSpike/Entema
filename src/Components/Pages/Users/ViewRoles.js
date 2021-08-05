import React, { useEffect, useState, useMemo } from "react";
import Popup from "./rolesModal";
import useFullPageLoader from "../../../hooks/useFullPageLoader";
import { TableHeader, Pagination, Search } from "../../DataTable";
import CachedIcon from "@material-ui/icons/Cached";
import { IconButton } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import axios from "axios";

const DataTable = () => {
  const [comments, setComments] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [openPopup, setOpenPopup] = useState(false);

  const [id, setId] = useState("");

  const ITEMS_PER_PAGE = 10;

  const openInPopup = (item) => {
    setId(item);
    setOpenPopup(true);
  };

  const headers = [
    { name: "Id", field: "Id", sortable: false },
    { name: "Role Name", field: "Role Name", sortable: false },
    { name: "Created Date", field: "Created Date", sortable: false },
    { name: "End Date", field: "End Date", sortable: false },
    { name: "Description", field: "Description", sortable: false },
    { name: "Delete", field: "Delete", sortable: false },
  
  ];

  const getData = () => {
    showLoader();

    fetch("https://mssoftware.xyz/getRolesData")
      .then((response) => response.json())
      .then((json) => {
        hideLoader();
        setComments(json);
      });
  };

  const removeRole = (rolesid) => {
    axios
      .post("https://mssoftware.xyz/removeRolesBasedOnId", {
        rolesid: rolesid,
      })
      .then((res) => {
        axios
          .post("https://mssoftware.xyz/removeRolesActDataBasedOnId", {
            rolesid: rolesid,
          })
          .then((res) => {
            getData();
          });
      });
  };
  useEffect(() => {
    getData();
  },[]);
  useEffect(() => {
    setTimeout(() => {
      getData();
    },1300);
  }, [id]);
  const commentsData = useMemo(() => {
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.RL_NAME.toLowerCase().includes(search.toLowerCase()) ||
          comment.CREATED_DATE.toLowerCase().includes(search.toLowerCase())
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
        className="container"
        style={{ paddingTop: "3px", paddingLeft: "5px" }}
      >
        <div className="heading-layout1">
          <div className="item-title">
            <h3 style={{ padding: "50px" }}>Roles </h3>
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
                    <th scope="row" onClick={() => openInPopup(comment.RL_ID)}
                    style={{cursor:'pointer'}}>
                      {comment.RL_ID}
                    </th>
                    <td >
                      {comment.RL_NAME}
                    </td>
                    <td>{comment.CREATED_DATE}</td>
                    <td>{comment.RL_END_DATE}</td>
                    <td>{comment.RL_DESCRIPTION}</td>                    
                    <td>
                      <IconButton color="secondary">
                        <DeleteOutlineIcon
                          onClick={() => removeRole(comment.RL_ID)}
                        />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Popup
              id={id}
              setId={setId}
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
