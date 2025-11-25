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
    THIRD_PARTY_PASSWORD: process.env.THIRD_PARTY_PASSWORD || "Sh@rv!0001", //"Sh@rv1511",

    

    // API Calls
    THIRD_PARTY_API_URL_POST_LOGIN: `${login}/login/create?sap-client=234`,
    // THIRD_PARTY_API_URL_POST_LOGIN: `${baseUrl}/login/create?sap-client=234
    ThirdParty_COOISOperations: `${baseUrl}/sipl_pp/coois/porder?sap-client=100`,
  };
})();
