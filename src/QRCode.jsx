import React, { useState } from "react";

function QRCode() {
  const [qrCode, setQRCode] = useState(null);
  const [value, setValue] = useState("");
  const [loader, setLoader] = useState("ENTER URL AND CLICK Generate QR...");

  async function fetchQRCode() {
    const response = await fetch(
      `https://qrcodegenerator-24rx.onrender.com/qr?url=${value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "image/svg+xml",
        },
      }
    );
    if (response.status == 200) {
      const data = await response.text();
      data && setQRCode(data);
    } else {
      setValue("");
      setLoader("ENTER URL AND CLICK Generate QR...");
    }
  }

  const handleDownload = () => {
    const file = new Blob([qrCode], { type: "image/svg+xml" });
    const fileURL = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = "qr-code.svg";
    link.click();
  };

  function generateQR() {
    setLoader("fetching QR...");
    setQRCode(null);
    if (value.length < 1) {
      setLoader("ENTER URL AND CLICK Generate QR...");
      window.alert("enter some text");
    } else {
      fetchQRCode();
    }
  }

  const handleChange = (e) => {
    setQRCode("");
    setLoader("ENTER URL AND CLICK Generate QR...");
    setValue(e.target.value);
  };

  return (
    <div className="box">
      <div className="search">
        <label htmlFor="input-field">Input Field:</label>
        <input
          id="input-field"
          type="text"
          value={value}
          onChange={handleChange}
        />
        <button onClick={generateQR}>Generate QR</button>
      </div>
      <div className="qr_code">
        {qrCode ? (
          <>
            <img src={`data:image/svg+xml,${qrCode}`} alt="QR Code" />
          </>
        ) : (
          loader
        )}
        {qrCode && <button onClick={handleDownload}>Download</button>}
      </div>
    </div>
  );
}

export default QRCode;
