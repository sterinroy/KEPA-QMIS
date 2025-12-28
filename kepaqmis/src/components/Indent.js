import React, { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { useSearchParams } from "react-router-dom";
import "./Indent.css";


const Indent = () => {
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [indentData, setIndentData] = useState(null);
  const id = params.get("id");


  useEffect(() => {
  if (!id) {
    console.error("No bill ID provided");
    setLoading(false);
    return;
  }

  const fetchIndent = async () => {
    try {
      const res = await fetch(`/api/indent-bills/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch indent bill");
      setIndentData(data);
    } catch (err) {
      console.error("Error loading indent bill:", err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchIndent();
}, [id]);

  const handleDownloadPDF = () => {
    const element = document.getElementById("indent-bill");
    html2pdf()
      .set({
        margin: 5,
        filename: "Indent_Bill.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
      })
      .from(element)
      .save();
  };

  if (loading) return <p>Loading Indent Bill...</p>;
  if (!indentData) return <div style={{ color: "black" }}>No Indent Bill Found</div>;

  const { stationNo, officeNo, storeNo, indentFor, subCategory, qty, date, nameAndDesignation } = indentData;

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <button
        onClick={handleDownloadPDF}
        style={{
          marginBottom: "10px",
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Download Indent Bill as PDF
      </button>

      <div id="indent-bill" style={{ padding: "20px", fontFamily: "Arial", fontSize: "14px" }}>
        <h3 style={{ textAlign: "center", margin: 0, paddingBottom: "3px" }}>INDENT</h3>

        <div className="grid-structure">
          <div className="box">
            K. P. F. No. 62
            <br />
            Station No.
            <br />
            Office No. 
            <br />
            Store No. 
            <br />
            Indent for:
            <br />
            {Array.isArray(indentFor) &&
            indentFor.map((item, index) => (
              <div key={index}>{`${index + 1}. ${item}`}</div>
            ))}
          </div>
          <div className="box">
            K. P. F. No. 62
            <br />
            Station No. 
            <br />
            Office No. 
            <br />
            Store No. 
            <br />
            Indent for:
            <br />
            {Array.isArray(indentFor) &&
            indentFor.map((item, index) => (
              <div key={index}>{`${index + 1}. ${item}`}</div>
            ))}
            <br />
            From {nameAndDesignation} Stn. or Office
            <br />
            On {date}
          </div>
          <div className="box">
            K. P. F. No. 62
            <br />
            Station No. 
            <br />
            Office No. 
            <br />
            Store No. 
            <br />
            Articles of {subCategory}
            <br />
            Sanctioned and sent to {nameAndDesignation}
          </div>
          <div className="box">
            K. P. F. No. 62
            <br />
            Station No. 
            <br />
            Office No. 
            <br />
            Store No. 
            <br />
            Articles of {subCategory}
            <br />
            Received from {nameAndDesignation}
          </div>
        </div>

        <div className="grid-structure" style={{ marginTop: "5px" }}>
          {/* Column 1 */}
          <div className="column">
            <table>
              <colgroup>
                <col style={{ width: "70%" }} />
                <col style={{ width: "30%" }} />
              </colgroup>
              <thead>
                <tr className="equal-header-row">
                  <th>Name of articles</th>
                  <th>
                    Qty
                    <br />
                    intended
                    <br />
                    for
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="blank-row">
                  <td style={{ textAlign: "left", whiteSpace: "pre-line" }}>
                    {Array.isArray(indentData.item) &&
                    indentData.item.map((item, index) => (
                      <div key={index}>{`${index + 1}. ${item}`}</div>
                    ))}
                  </td>
                  <td style={{ textAlign: "left", whiteSpace: "pre-line" }}>
                    {Array.isArray(indentData.qty) &&
                    indentData.qty.map((qty, index) => (
                      <div key={index}>{qty}</div>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ textAlign: "left", padding: "9px", lineHeight: 1 }}>
                    Date: {date}
                    <br />
                    Sign
                    <br />
                    Name, Desig. of Officer: {nameAndDesignation}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Columns 2, 3, 4 - unchanged */}
          <div className="column">
            <table>
              <colgroup>
                <col style={{ width: "150px" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "22%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <thead>
                <tr className="equal-header-row">
                  <th>Name of articles</th>
                  <th>
                    Qty
                    <br />
                    in
                    <br />
                    hand
                  </th>
                  <th>
                    Qty
                    <br />
                    requ-
                    <br />
                    ired
                  </th>
                  <th>
                    Qty
                    <br />
                    sanctioned
                    <br />
                    in letter
                  </th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr className="blank-row">
                  <td>
                    <input name="col2_name_of_articles" />
                  </td>
                  <td>
                    <input name="col2_qty_in_hand" />
                  </td>
                  <td>
                    <input name="col2_qty_required" />
                  </td>
                  <td>
                    <input name="col2_qty_sanctioned" />
                  </td>
                  <td>
                    <input name="col2_remarks" />
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} style={{ textAlign: "left", padding: "9px", lineHeight: 1 }}>
                    Date
                    <br />
                    Sign
                    <br />
                    Name,Desig. of Officer
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="column">
            <table>
              <colgroup>
                <col style={{ width: "150px" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "38%" }} />
              </colgroup>
              <thead>
                <tr className="equal-header-row reduced-height">
                  <th rowSpan={2}>Name of articles</th>
                  <th colSpan={2}>Quantity in</th>
                </tr>
                <tr>
                  <th className="figures-header">
                    Fig-
                    <br />
                    ures
                  </th>
                  <th>Letters</th>
                </tr>
              </thead>
              <tbody>
                <tr className="blank-row">
                  <td>
                    <input name="col3_name_of_articles" />
                  </td>
                  <td>
                    <input name="col3_quantity_figures" />
                  </td>
                  <td>
                    <input name="col3_quantity_letters" />
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} style={{ textAlign: "left", padding: "9px", lineHeight: 1.1 }}>
                    Date
                    <br />
                    Sign
                    <br />
                    Store keeper or other Desig.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="column">
            <table>
              <colgroup>
                <col style={{ width: "45%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "38%" }} />
              </colgroup>
              <thead>
                <tr className="equal-header-row reduced-height">
                  <th rowSpan={2}>Name of articles</th>
                  <th colSpan={2}>Quantity in</th>
                </tr>
                <tr>
                  <th className="figures-header">
                    Fig-
                    <br />
                    ures
                  </th>
                  <th>Letters</th>
                </tr>
              </thead>
              <tbody>
                <tr className="blank-row">
                  <td>
                    <input name="col4_name_of_articles" />
                  </td>
                  <td>
                    <input name="col4_quantity_figures" />
                  </td>
                  <td>
                    <input name="col4_quantity_letters" />
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} style={{ textAlign: "left", padding: "9px", lineHeight: 1.1 }}>
                    Date
                    <br />
                    Sign
                    <br />
                    Name,Desig. of Officer
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Indent;
