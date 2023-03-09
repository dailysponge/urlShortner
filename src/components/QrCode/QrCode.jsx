import React from "react";
import QRCode from "qrcode.react";

function QrCode(props) {
  return (
    <div>
      <QRCode value={props.originalUrl} />
    </div>
  );
}
export default QrCode;
