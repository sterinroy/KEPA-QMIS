// BailTicket.js
import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import './BailTicket.css';

let indentSerial = 1; // Simple in-memory serial tracking

const BailTicket = () => {
  const { state } = useLocation();
  const entries = state?.entries || [];
  const pdfRef = useRef();

  const today = new Date().toLocaleDateString('en-IN');
  const reqNo = entries[0]?.reqNo || 'REQ';
  const qmNo = entries[0]?.qmNo || 'QM';
  const indentNo = `${indentSerial}/${reqNo}/KEPA`;

  const handleDownload = () => {
    html2pdf()
      .from(pdfRef.current)
      .set({
        margin: 0,
        filename: 'Bail_Ticket.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      })
      .save();

    indentSerial++; // Increment for next download
  };

  const renderCopy = () => (
    <div className="ticket-copy">
      <div className="top-box">
        <span><strong>QM ENTRY NO:</strong> {qmNo}</span>
        <span><strong>Date:</strong> {today}</span>
      </div>

      <div className="from-to-section">
        <div className="from">
          <p><strong>From,</strong></p>
          <div className="box small">Assistant Commandant(QM)</div>
        </div>
        <div className="to">
          <p><strong>To,</strong></p>
          <div className="box small">{reqNo}</div>
        </div>
      </div>

      <p className="indent-line"><strong>Indent No:</strong> {indentNo}</p>

      <table className="ticket-table">
        <thead>
          <tr>
            <th>SlNo</th>
            <th>Items</th>
            <th>Quantity No</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{entry.item}</td>
              <td>{entry.qty} {entry.quantityUnit}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="signature">
        <p>Assistant Commandant(QM)</p>
        <p>Kerala Police Academy, Ramavarmapuram</p>
      </div>
    </div>
  );

  if (!entries.length) return <p>No entries to display.</p>;

  return (
    <div className="bail-container">
        <div className="download-button">
        <button onClick={handleDownload}>Download / Print</button>
      </div>
      <div className="pdf-content" ref={pdfRef}>
        {renderCopy()}
        {renderCopy()}
      </div>
      <div className="download-button">
        <button onClick={handleDownload}>Download Bail Ticket</button>
      </div>
    </div>
  );
};

export default BailTicket;
