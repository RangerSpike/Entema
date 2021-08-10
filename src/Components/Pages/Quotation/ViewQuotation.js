// eslint-disable-next-line
import React, { useEffect, useState, useMemo } from "react";
import Popup from "./QuotationModal";
import useFullPageLoader from "../../../hooks/useFullPageLoader";
import { TableHeader, Pagination, Search } from "../../DataTable";
import axios from "axios";
import { IconButton } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import PopupPdf from "./quotationPdf";
import CachedIcon from "@material-ui/icons/Cached";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

const DataTable = () => {
  const [comments, setComments] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [openPopup, setOpenPopup] = useState(false);
  const [id, setId] = useState("");
  const [openpdfPopup, setOpenpdfPopup] = useState(false);
  const [pdfId, setPdfId] = useState("");

  const openInPopup = (item) => {
    setOpenPopup(true);
    setId(item);
  };

  const openPdfPopup = (item) => {
    setOpenpdfPopup(true);
    setPdfId(item);
  };

  const ITEMS_PER_PAGE = 10;

  const headers = [
    { name: "Quot Id", field: "Quot Id", sortable: false },
    { name: "Valid Date", field: "Valid Date", sortable: false },
    { name: "Created By", field: "Created By", sortable: false },
    { name: "Contact Person", field: "Contact Person", sortable: false },
    { name: "Company", field: "Company", sortable: false },
    { name: "Delete", field: "Delete", sortable: false },
    { name: "Print", field: "Print", sortable: false },
  ];

  const getData = () => {
    showLoader();

    fetch("http://mssoftware.xyz/getQuotData")
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
    }, 1300);
  }, [id]);

  const removeQuotation = (QOId) => {
    axios
      .post("http://mssoftware.xyz/removeQODataonId", {
        QOID: QOId,
      })
      .then((res) => {
        axios
          .post("http://mssoftware.xyz/removeQOMulDataonId", {
            QOID: QOId,
          })
          .then((res) => {});
      });
    setTimeout(() => {
      getData();
    }, 1300);
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
              <h3 style={{ padding: "50px" }}>View Quotation Order</h3>
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
                        key={comment.QO_ID}
                        onClick={() => openInPopup(comment.QO_ID)}
                        style={{ cursor: "pointer" }}
                      >
                        {comment.QO_ID}
                      </th>
                      <td>{comment.WO_STARTDATE}</td>
                      <td>{comment.CREATED_BY}</td>
                      <td>{comment.QO_COMP_NAME}</td>
                      <td>{comment.CLIENT_DISP_NAME}</td>
                      <td onClick={() => removeQuotation(comment.QO_ID)}>
                        <IconButton color="secondary">
                          <DeleteOutlineIcon />
                        </IconButton>
                      </td>
                      <td onClick={() => openPdfPopup(comment.QO_ID)}>
                        <PictureAsPdfIcon style={{ color: "green" }} />
                        PDF
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
              <PopupPdf
                setId={setId}
                id={pdfId}
                openPopup={openpdfPopup}
                setOpenPopup={setOpenpdfPopup}
              ></PopupPdf>
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
