import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import "./LARSPrint.css";

const LARSPrint = () => {
  const location = useLocation();
  const today = new Date().toISOString().split("T")[0];

const data = {
  ...location.state,                    // ✅ Keep passed items, penNo, etc.
  orderNo: "",                          // 🔒 Force blank
  officeNo: "",                         // 🔒 Force blank
  date: today,                          // 🔒 Force today’s date
  district: "Thrissur",                 // 🔒 Fixed
  circle: "KEPA ",              // 🔒 Fixed
};

  const pdfRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDownload = () => {
    const element = pdfRef.current;
    html2pdf()
      .from(element)
      .set({
        margin: 0.0001,
        filename: `LARS_KPF81_${data.penNo || "return"}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
      })
      .save();
  };

  return (
    <div className="lars-print-wrapper">
      <div className="download-section">
        <button onClick={handleDownload} className="download-button">
          Download as PDF
        </button>
      </div>

      <div className="kpf81-layout" ref={pdfRef}>
        <div className="three-columns">

          {/* Column 1 */}
          <div className="column col1">
  
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
    <div>
      <p>K.P.F. 81</p>
      <p>Order No: {data.orderNo || "-"}</p>
      <p>Office No: {data.officeNo || "-"}</p>
      
    </div>
    <div style={{ textAlign: "right", whiteSpace: "nowrap", marginLeft: "10px" }}>
      <p>District: {data.district || "-"}</p>
      <p>Circle: {data.circle || "-"}</p>
      <p>Date: {data.date || "-"}</p>
    </div>
  </div>

            <table className="inner-table">
              <thead>
                <tr>
                  <th style={{ width: "40%" }}>Article</th>
                  <th style={{ width: "20%" }}>Number</th>
                  <th style={{ width: "40%" }}>Why Sent</th>
                </tr>
              </thead>
              <tbody>
  <tr style={{ verticalAlign: "top" }}>
    <td>
      {Array.isArray(data.items) && data.items.length > 0 ? (
        data.items.map((item, idx) => (
          <div key={idx}>{`${idx + 1}. ${item.name || "-"}`}</div>
        ))
      ) : (
        <div>{data.item || "-"}</div>
      )}
    </td>
    <td>
      {Array.isArray(data.items) && data.items.length > 0 ? (
        data.items.map((item, idx) => (
          <div key={idx}>{item.quantity || "-"}</div>
        ))
      ) : (
        <div>{data.quantity || "-"}</div>
      )}
    </td>
    <td>
      {Array.isArray(data.items) && data.items.length > 0 ? (
        data.items.map((item, idx) => (
          <div key={idx}>{item.reason || "-"}</div>
        ))
      ) : (
        <div>{data.reason || "-"}</div>
      )}
    </td>
  </tr>
</tbody>


            </table>
          </div>

          {/* Column 2 */}
          <div className="column col2">
            <div className="top-box">
              <div>
                <p>Order No: {data.orderNo || "-"}</p>
                <p>Office No: {data.officeNo || "-"}</p>
              </div>
              <div>
                <p>District: {data.district || "-"}</p>
                <p>Circle: {data.circle || "-"}</p>
              </div>
            </div>
            <h4 className="section-title">List of Articles returned to the store</h4>
            <table className="inner-table">
              <thead>
                <tr>
                  <th style={{ width: "29%" }}>Name of article</th>
                  <th style={{ width: "13%" }}>Number</th>
                  <th style={{ width: "29%" }}>Why returned</th>
                  <th style={{ width: "29%" }}>
                    Disposal—Whether<br/> brought on stock <br/>or entered in the register<br/> of condemned articles
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div className="instruction-note">
              The entries in this column will be made by Officer in charge of stores
            </div>
            <div className="footer-row">
              <span>Date:</span>
              <span>Inspector of Police</span>
            </div>
          </div>

          {/* Column 3 */}
          <div className="column col3">
            <div className="top-box">
              <div>
                <p>Order No: {data.orderNo || "-"}</p>
                <p>Office No: {data.officeNo || "-"}</p>
              </div>
              <div>
                <p>District: {data.district || "-"}</p>
                <p>Circle: {data.circle || "-"}</p>
              </div>
            </div>
            <h4 className="section-title">List of Articles received</h4>
            <div className="col3-blank-space"></div>
            <div className="footer-right">Officer in charge of stores</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LARSPrint;
