const baseUrl =
  process.env.NODE_ENV === "production" ? process.env.Purl : process.env.Durl;
export default baseUrl;
