module.exports = (() => {
  const server = process.env.SERVER || "dev"; //dev  //Set the server environment variable (default to 'dev')
  const baseUrls = {
    prod: "https://49.207.9.62:44325",
    dev: "https://49.207.9.62:44325",
  };
  const login = "https://49.207.9.62:44325";
  const baseUrl = baseUrls[server];

  return {
    // Credentials
    THIRD_PARTY_USERNAME: process.env.THIRD_PARTY_USERNAME || "s23hana1", //"ims113"
    THIRD_PARTY_PASSWORD: process.env.THIRD_PARTY_PASSWORD || "Sh@rv!12345", //"Sh@rv1511",

    // THIRD_PARTY_USERNAME: process.env.THIRD_PARTY_USERNAME || "110203",
    // THIRD_PARTY_PASSWORD: process.env.THIRD_PARTY_PASSWORD || "Venp0rt@Hps234",

    THIRD_PARTY_USERNAME2: process.env.THIRD_PARTY_USERNAME2 || "s23hana1", //"Dev00",
    THIRD_PARTY_PASSWORD2: process.env.THIRD_PARTY_PASSWORD2 || "Sh@rv!12345", //"HBL@2025",//"$bx#@113",

    //THIRD_PARTY_USERNAME2: process.env.THIRD_PARTY_USERNAME2 || "110203",
    //THIRD_PARTY_PASSWORD2: process.env.THIRD_PARTY_PASSWORD2 || "Venp0rt@Hps234",

    // API Calls
    THIRD_PARTY_API_URL_POST_LOGIN: `${login}/login/create?sap-client=234`,
    // THIRD_PARTY_API_URL_POST_LOGIN: `${baseUrl}/login/create?sap-client=234`,

    THIRD_PARTY_API_URL_PUT_GET_LOT_REPORTS: `${baseUrl}/qm/result_rec/record?sap-client=400`,
    THIRD_PARTY_API_URL_POST_UPDATE_RESULT_RECORDING: `${baseUrl}/qm/result_rec/record?sap-client=400`,
    THIRD_PARTY_API_URL_POST_UDSUBMIT_RESULT: `${baseUrl}/qm/usage_ud/decision?sap-client=400`,
    THIRD_PARTY_API_URL_POST_REPORT_ZQAR: `${baseUrl}/qm/quality/report?sap-client=400`,
    THIRD_PARTY_API_URL_POST_REPORT_ZQA32: `${baseUrl}/qm/pending/lots?sap-client=400 `,
    THIRD_PARTY_API_URL_POST_QR_CODE: `${baseUrl}/qm/qr_generation/transfer?sap-client=400`,
    THIRD_PARTY_API_URL_POST_ZPRDID: `${baseUrl}/qm/prdid/product?sap-client=400`,
    THIRD_PARTY_API_URL_POST_TYPE_TEST: `${baseUrl}/qm/type_test/typetest?sap-client=400`,


    THIRD_PARTY_API_URL_POST_COOIS_Order_Confirmation: `${baseUrl}/sipl_pp/coois/porder?sap-client=100`,
    THIRD_PARTY_API_URL_POST_CO11_Order_Confirmation_ZCO11N: `${baseUrl}/sipl_pp/prod_order/zco11n?sap-client=100`,
  };
})();
