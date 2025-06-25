// Proceedings.js
import React, { useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { useLocation } from 'react-router-dom';
import './proceedings.css';

const Proceedings = () => {
  const pdfRef = useRef();
  const location = useLocation();
  const entries = location.state?.entries || [];

  const handleDownload = () => {
    const element = pdfRef.current;
    html2pdf()
      .from(element)
      .set({
        margin: 0.5,
        filename: 'Verification_Board.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      })
      .save();
  };

  if (entries.length === 0) {
    return <p>No data available.</p>;
  }

  const common = entries[0]; // use first item for shared info like date, qmNo etc.

  return (
    <div className="container">
      <button onClick={handleDownload} className="download-btn">Download / Print</button>
      <div className="pdf" ref={pdfRef}>
        
        <p className="center">
  <strong><u>PROCEEDINGS OF THE VERIFICATION BOARD FORMED</u></strong> <br />
  TO VERIFY THE:{' '}
  <span className="item">
    {entries.slice(0, 5).map((entry, index) => (
      <span key={index}>
        {entry.item}
        {index < entries.length - 1 && index < 4 ? ', ' : index === 4 && entries.length > 5 ? ' etc.' : ''}
      </span>
    ))}
  </span>
</p>

        <p className="center">
          PURCHASED FOR KERALA POLICE ACADEMY ON:{' '}
          <span className="date">{common.dateOfPurchased}</span>
        </p>

        <p className="center bold">12/5544/8855</p>

        <p><strong>Chairman:</strong> Asst. Director (MT) KEPA</p>
        <p><strong>Members:</strong></p>
        <ul>
          <li>DySP (PS-2)</li>
          <li>SI (Indoor Wing)</li>
          <li>SI (QM STORE)</li>
          <li>JS General Branch</li>
        </ul>

        <p>
          The verification Board have assembled at the QM Store of KEPA on{' '}
          <span className="date">{common.verificationDate}</span>{' '}
          and verified the following articles purchased.
        </p>

        <p>Order No: <span className="orderNo">{common.purchaseOrderNo}</span></p>

        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Commodity</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.item || '-'}</td>
                <td>{entry.qty ? `${entry.qty} ${entry.quantityUnit || ''}` : '-'}</td>
                <td>{entry.amount || '-'}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total</td>
              <td style={{ fontWeight: 'bold' }}>
                ₹{entries.reduce((sum, entry) => sum + parseFloat(entry.amount || 0), 0)}
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          On Verification the board found that the item purchased Bill No:{' '}
          <span className="billNo">{common.invoiceNumber}</span>
        </p>
        <p>
          Dated: <span className="date">{common.dateOfPurchased}</span>, From:{' '}
          <span className="purchasedParty">{common.purchasingParty}</span>{' '}
          is correct and in good manner. Hence the board unanimously recommended:
        </p>

        <p><strong>Chairman:</strong> Asst. Director (MT) KEPA</p>
        <p><strong>Members:</strong></p>
        <ol>
          <li>DySP (PS-2)____________________________________________________</li>
          <li>SI (Indoor Wing)_________________________________________________</li>
          <li>SI (QM STORE)_________________________________________________</li>
          <li>JS General Branch_______________________________________________</li>
        </ol>

        <p className="center bold">Quality and Qty Verified</p>
      </div>

      <button onClick={handleDownload} className="download-btn">Download as PDF</button>
    </div>
  );
};

export default Proceedings;
