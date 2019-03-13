# LUIS-Tester

## Features
This example showcases:

- WA2000 bluetooth setup and bt object basic usage 
- using the LUIS mobile app to change device wifi settings via bluetooth 

## Requirements
- Gen 2 Tibbo device with TiOS version >= 3.77.xx
- platforms library version >= 2.1.2
- WA2000 module
- iOS or Android device with Bluetooth Low Energy

## Running the sample
1. Build and run the project on the device in Debug mode, the device will have bluetooth enabled and wifi disabled

2. Open the LUIS mobile app and tap on the device named "BLE_Device_1 xx:xx" (xx:xx is last two bytes of device's mac address) to connect to the device

3. A page with the device settings will be shown once bluetooth connection has been established.

4. Configure the wifi settings of the device to connect to your wifi access point.

5. Press save at the bottom of the page.

6. Press reboot. The device will reboot, load wifi settings

7. If running in debug mode, press the "Run" button on TIDE after reboot to resume the application.

## Using the LUIS Library
1. add `luis.tbh`, `luis.tbs`, `luis.html` to your project

2. call `luis_start()` in `on_sys_init()`

This will boot up the WA2000 module with BLE enabled

```
sub on_sys_init()
	luis_start()
end sub
```


3. Add required event handlers
```
sub on_bt_event(bt_event as enum pl_bt_events)
	luis_on_bt_event(bt_event)
end sub

sub on_bt_data_arrival()
	luis_recv_data()
end sub

```

4. Add optional event handlers
```
sub on_bt_data_sent()
	luis_on_bt_data_sent()
end sub

sub on_bt_overrun()
	luis_on_bt_overrun()
end sub
```


## Explanation
This sample demonstrates usage of the LUIS mobile app to modify settings defined in the `luis.xtxt` file of the Tibbo Basic project. The device starts off with wifi disabled as specified in the `settings.xtxt` configuration file. When a mobile device connects to the device via the LUIS app, the device serves an html page to the mobile app via bluetooth. This html page is a web app that contains features similar to the Tibbo DS manager to change device settings. The user would then update the settings on the mobile app according to their local wifi access point, save the settings, and reboot.

The files required serving a settings configurator html page are:
- luis.tbs
- luis.tbh
- luis.html

Including this call in the `on_bt_data_arrival()` will allow for processing of bluetooth commands sent from the mobile app in `ble_cmd.tbs`
```
sub on_bt_data_arrival()
    ble_cmd_recv_data()
end sub
```
The luis.html page being served will dynamically contain the settings defined in your `luis.xtxt` file.
