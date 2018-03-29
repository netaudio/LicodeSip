# Licode <==> Sip Bridge
The aim of this project is to enable Licode conferences like always, but you can join with phones through a SIP provider aswell.

![asd](/doc/arch.png)

## Some Facts:
1. Bridge is not limitted to an amount of SIP Calls
2. Called Number desides to witch Licode Room your Phone connects
2. The bridge is working like a single SIP client and can be connected to any SIP Server supported by: http://jssip.net
3. Bridge using the chromium WebRTC stack and is running in a Headless browser

## Flow of the Application
1. Create a Licode Room with the attribute: sipNumber = {yourSipRoomnumber}
2. Phone calls a number like "1234567656" (Must be equal to a sipNumber from a room on the Licode Server)
2. SIP Server redirects call to the first SIP client started by this bridge
3. Bridge search for a LicodeRoom with the attribute: sipNumber = 1234567656
4. Only go on if room with sipNumber exist
5. Connect all streams from the Licode Room to the SipClient
6. Connect the Sip Stream to the Licode Room

## Installation
1. Change your licode Server to set sipNumber as attribute to your rooms
    2. example https://github.com/cracker0dks/ezLicode/blob/master/basicServer.js
3. Clone this repo
4. Install node for your system
4. run: `npm i` to install all deps
5. open: /public/js/main.js and change the SIP and Licode Server config...
6. run: `node server.js`
    7. You should get: 


```
Server running on port: 8083
0: JSHandle:connected!
0: JSHandle:registered!
```
This means your SIP Client connected correctly.

Now just call the "sipNumber" and be sure your bridge Sip client gets the number you set to the LicodeRoom from your SIP provider.

## Troubleshooting
* Be sure a Licode Room with the correct sipNumber exist
    * Surf to https://yourLicodeServerIp:3004/getRooms for basic example to get all rooms with attributes
* To debug the bridge you can also set "withHeadlessBrowser" (at server.js) to false, restart the server and surf with your chrome to https://yourBridgeServerIp:8083 also be sure to allow all selfSigned Certificates. Check the console for errors 