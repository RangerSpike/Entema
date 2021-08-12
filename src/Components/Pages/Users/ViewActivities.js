// eslint-disable-next-line
import React, { useEffect, useState, useMemo } from "react";
import Popup from "./activityModal";
import CachedIcon from "@material-ui/icons/Cached";
import { IconButton } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import useFullPageLoader from "../../../hooks/useFullPageLoader";
import { TableHeader, Pagination, Search } from "../../DataTable";
import axios from "axios";

const DataTable = () => {
  const [comments, setComments] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [openPopup, setOpenPopup] = useState(false);
  const [id, setId] = useState(null);

  const ITEMS_PER_PAGE = 10;

  const openInPopup = (item) => {
    setId(item);
    setOpenPopup(true);
  };

  const headers = [
    { name: "Id", field: "Id", sortable: false },
    { name: "Activity Name", field: "Activity Name", sortable: false },
    { name: "Created Date", field: "Created Date", sortable: false },
    { name: "End Date", field: "End Date", sortable: false },
    { name: "Description", field: "Description", sortable: false },
    { name: "Created by", field: "Created by", sortable: false },
    { name: "Status", field: "Status", sortable: false },
  ];

  const removeActivity = (actid) => {
    axios
      .post("http://entemadb.entema-software.com/removeActivityDataonId", {
        actid: actid,
      })
      .then((res) => {    
        getData();
      });
  };

  const getData = () => {
    showLoader();    
    fetch("http://entemadb.entema-software.com/getActivitiesData")
      .then((response) => response.json())
      .then((json) => {
        hideLoader();
        setComments(json);      
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
  const commentsData = useMemo(() => {
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.ACT_NAME.toLowerCase().includes(search.toLowerCase()) ||
          comment.REATED_DATE.toLowerCase().includes(search.toLowerCase())
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
            <h3 style={{ padding: "50px" }}>View Activity</h3>
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
                    <th scope="row" key={comment.ACT_ID}>
                      {comment.ACT_ID}
                    </th>
                    <td onClick={() => openInPopup(comment.ACT_ID)}>
                      {comment.ACT_NAME}
                    </td>
                    <td>{comment.ACT_END_DATE}</td>
                    <td>{comment.ACT_DESCRIPTION}</td>
                    <td>{comment.ACT_STATUS}</td>
                    <td>{comment.CREATED_DATE}</td>
                    <td>{comment.CREATED_BY}</td>
                    <td>
                      <IconButton color="secondary">
                        <DeleteOutlineIcon
                          onClick={() => removeActivity(comment.ACT_ID)}
                        />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
              <Popup
                id={id}      
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
              ></Popup>
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
