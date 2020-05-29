/* ---------------- */
/* ---- CONFIG ---- */
/* ---------------- */
// var WebSocketInterface = 'wss://192.168.101.136:7443/wss'; //Websocket of your SIP Server
var WebSocketInterface = 'wss://192.168.101.136:7443/'; //Websocket of your SIP Server
var sipConfig = { //Account config for the SIP Server
  uri      : 'sip:1007@192.168.101.136',
  password : '123456',
  realm : '192.168.101.136',
  'session_timers': false,
  contact_uri : "sip:1007@192.168.101.136;transport=ws",
};
licodeServerUrl = 'https://192.168.101.73:3004/'; //The Licode Server URL
socketPath = '/socket.io'; //default= '/socket.io' (Licode socket path)

var loop = false; //For debugging set to true to hear yourself (echo)
/* ---------------- */
/* ---------------- */
/* ---------------- */
