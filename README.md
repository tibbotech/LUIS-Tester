# CA-Wifi-Settings-Example

## Features
This example showcases:
- setup and usage of WA2000 wifi module
- WA2000 bluetooth setup and bt object basic usage
- using the Tibbo BLE mobile app to change device wifi settings via bluetooth

## Requirements
- platforms library version >= 2.1.2
- WA2000 module
- tibbo device with TiOS version >= 3.77.xx
- mobile device with bluetooth 3.0 and above

## Running the sample
1. Build and run the project on the device in Debug mode, the device will have bluetooth enabled and wifi disabled

2. Open the Tibbo BLE mobile app and tap on the device named "BLE Settings Test" to connect to the device

3. A page with the device settings will be shown once bluetooth connection has been established.

4. Configure the wifi settings of the device to connect to your wifi access point.

5. Press save at the bottom of the page.

6. Press reboot. The device will reboot, load wifi settings, and try to connect to the access point.

7. If running in debug mode, press the "Run" button on TIDE after reboot to resume the application. If wifi settings are correct, the device will connect to the access point and start a web server. Visit http://<device_ip>/index.html to see the device serve an html page via wifi.