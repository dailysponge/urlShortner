import React from "react";
import QRCode from "qrcode.react";

function QrCode(props) {
  return (
    <div>
      <QRCode value={props.shortUrl} />
    </div>
  );
}
export default QrCode;
