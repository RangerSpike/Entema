// eslint-disable-next-line
import { useEffect, useState, useMemo } from "react";
import useFullPageLoader from "../../../hooks/useFullPageLoader";
import { Pagination } from "../../DataTable";
import axios from "axios";
import { useHistory } from "react-router-dom";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CachedIcon from "@material-ui/icons/Cached";
import Popup from "../Quotation/QuotationModal";

const ClientStatement = (props) => {
  const cid = props.match.params.cid;

  const [comments, setComments] = useState([]);
  const [id, setId] = useState("");
  const [openPopup, setOpenPopup] = useState(false);

  const [clientcpname, setClientcpname] = useState();
  const [clientcompname, setClientcompname] = useState();
  const [clientphone, setClientphone] = useState();
  const [clientemail, setClientemail] = useState();
  const [clientCreatedDate, setClientCreatedDate] = useState();
  const [clientModifiedDate, setClientModifiedDate] = useState();

  const openInPopup = (item) => {
    setOpenPopup(true);
    setId(item);
  };

  const removeQuotation = (QOId) => {
    axios
      .post("http://entemadb.entema-software.com/removeQODataonId", {
        QOID: QOId,
      })
      .then((res) => {
        axios
          .post("http://entemadb.entema-software.com/removeQOMulDataonId", {
            QOID: QOId,
          })
          .then((res) => {});
      });
    getQuotationData();
  };

  const getQuotationData = (clientId) => {
    axios
      .post("http://entemadb.entema-software.com/getQuotDataBasedOnClientId", {
        clientId: clientId,
      })
      .then((res) => {
        // console.log("recsuccessfully deleted user ", res.data);
        setComments(res.data);
      });

    // console.log("vendorID : ", clientId);
  };

  useEffect(() => {
    axios
      .post("http://entemadb.entema-software.com/getClientBasedOnId", {
        clientID: cid,
      })
      .then((res) => {
        // console.log("records received ", res.data[0]);

        if (cid > 0) {
          setClientcpname(res.data[0].CLIENT_CPNAME);
          setClientcompname(res.data[0].CLIENT_COMP_NAME);
          setClientphone(res.data[0].CLIENT_PHONE);
          setClientemail(res.data[0].CLIENT_EMAIL);
          //   setClientadd(res.data[0].CLIENT_ADD);
          setClientCreatedDate(res.data[0].CREATED_DATE);
        }
      });

    setTimeout(() => {
      getQuotationData(cid);
    }, 1300);
  }, [cid, id]);

  // useEffect(() => {
  //     getQuotationData(cid);
  // },[id])

  return (  
      <div class="scrollbar square scrollbar-lady-lips thin">
        <div
          class="container"
          style={{ paddingTop: "30px", paddingLeft: "35px" }}
        >
          <div
            class="container"
            style={{ paddingTop: "5px", paddingLeft: "1px" }}
          >
            <h1>Client : {clientcpname} </h1>
            <div className="heading-layout1">
              <div className="row">
                <div className="col-sm-6">
                  <h3 style={{ padding: "10px" }}></h3>

                  <label>Phone : {clientphone}</label>
                  <br></br>
                  <label>Company : {clientcompname}</label>
                  <br></br>
                  <label>Email : {clientemail}</label>
                  <br></br>
                  <label>Created: {clientCreatedDate}</label>
                  <br></br>
                  <label>Modified: {clientCreatedDate}</label>
                  <br></br>
                </div>
              </div>
            </div>

            <div className="row w-100">
              <text style={{ marginLeft: "20px", marginTop: "40px" }}>
                Related Quotations
              </text>
              <div className="col mb-3 col-12 text-center">
                <table
                  className="table table-striped"
                  style={{ width: "100%" }}
                >
                  <tr>
                    <th scope="row">Ref</th>
                    <th scope="row">Date</th>
                    <th scope="row">Valid</th>
                    <th scope="row">Type</th>
                    <th scope="row">Actions</th>
                  </tr>
                  <tbody>
                    {comments.map((comment) => (
                      <tr key={comment.QO_ID}>
                        <th>{comment.QO_ID}</th>
                        <td>{comment.CREATED_DATE}</td>
                        <td>{comment.WO_STARTDATE}</td>

                        <td>{comment.QO_TYPE}</td>
                        <td>
                          <EditIcon
                            color="primary"
                            onClick={() => {
                              openInPopup(comment.QO_ID);
                            }}
                            style={{ cursor: "pointer" }}
                          />
                          <DeleteIcon
                            color="secondary"
                            onClick={() => removeQuotation(comment.QO_ID)}
                            style={{ cursor: "pointer" }}
                          />
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
            </div>
          </div>
        </div>
      </div>
  );
};

export default ClientStatement;
