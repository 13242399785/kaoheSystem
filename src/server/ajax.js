import $ from 'n-zepto'
import serverobj from "./server.js"
var server = server_config; 
// if (process.env.NODE_ENV === 'production') {
//   $.ajax({
//     url: './url.txt',
//     dataType: "text",
//     async: false,
//     cache: false,
//     success: function (rs) {
//       server = rs.split(",")[0];
//       sessionStorage.ledger = rs.split(",")[1];
//     }
//   });
// }
function ajax(obj, contentType) {
  if (localStorage.ip) {
    server.ip = localStorage.ip;
    server.port = localStorage.port;
  }
  // console.log(obj)
  var serverUrl = "http://" + server.ip + ":" + server.port + "/";
  return new Promise(function (resolve, reject) {
    $.ajax({
      type: obj.type || "get",
      url: serverUrl + obj.url,
      data: obj.data == null ? "" : obj.data,
      async: true,
      cache: false,
      dataType: "json",
      contentType: obj.contentType || "application/x-www-form-urlencoded",
      success: function (res) {
        resolve(res);
      },
      error: function (error) {
        alert(JSON.parse(error.response).message);
      }
    })
  })
}
export default ajax;
