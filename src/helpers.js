export function validateGmail(email) {
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return gmailRegex.test(email);
}

export function validateIndianMobileNumber(mobileNumber) {
  const indianMobileRegex = /^[6-9]\d{9}$/;
  return indianMobileRegex.test(mobileNumber);
}


export const backendUrl="http://93.127.172.16:5000"