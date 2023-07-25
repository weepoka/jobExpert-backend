"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpTemplate = void 0;
const otpTemplate = (otp, companyName = "Job Expert", companyAddress = "#House 2/1, Mirpur-2, Dhaka Bangladesh") => {
    return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">${companyName}</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing World of Plastics. Use the following OTP to complete the procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />World of Plastics</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>${companyName}</p>
      <p>${companyAddress}</p>
    </div>
  </div>
</div>`;
};
exports.otpTemplate = otpTemplate;
