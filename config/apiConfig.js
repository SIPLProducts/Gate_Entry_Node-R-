module.exports = (() => {
  const server = process.env.SERVER || "dev"; //dev  //Set the server environment variable (default to 'dev')
  const baseUrls = {
    prod: "http://10.150.150.154:8103",
    dev: "http://10.150.150.154:8103",
  };
  const login = "https://10.150.150.154:8103";
  const baseUrl = baseUrls[server];

  return {
    // Credentials
    THIRD_PARTY_USERNAME: process.env.THIRD_PARTY_USERNAME || "SARVIINFO", //"ims113"
    THIRD_PARTY_PASSWORD: process.env.THIRD_PARTY_PASSWORD || "S!pl@2026", //"Sh@rv1511",


    // API Calls
    THIRD_PARTY_API_URL_POST_LOGIN: `${login}/login/create?sap-client=234`,
    // THIRD_PARTY_API_URL_POST_LOGIN: `${baseUrl}/login/create?sap-client=234
    ThirdParty_Fetch_Gate_Entry_Pdf: `${baseUrl}/gate_entry/print/pdf?sap-client=300`,
    ThirdParty_Fetch_Gate_Entry_Creation: `${baseUrl}/gate_entry/process/gates?sap-client=300`,
    ThirdParty_Fetch_Gate_Entry_Change: `${baseUrl}/gate_entry/process/gates?sap-client=300`,
    ThirdParty_Fetch_Gate_Entry_fetchChange: `${baseUrl}/gate_entry/process/gates?sap-client=300`,
    THIRD_PARTY_API_URL_POST_Report: `${baseUrl}/gate_entry/report/list?sap-client=300`,
    THIRD_PARTY_API_URL_POST_Adduser: `${baseUrl}/gate_entry/login/login?sap-client=300`,
    THIRD_PARTY_API_URL_GET_DisplayTable: `${baseUrl}/gate_entry/login/login?sap-client=300`,
  };
})();
