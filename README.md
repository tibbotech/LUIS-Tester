# LUIS-Tester

## Features
This example showcases:

- setup and usage of WA2000 wifi module 
- WA2000 bluetooth setup and bt object basic usage 
- using the LUIS mobile app to change device wifi settings via bluetooth 

## Requirements
- platforms library version >= 2.1.2
- WA2000 module
- tibbo device with TiOS version >= 3.77.xx
- mobile device with bluetooth 3.0 and above

## Running the sample
1. Build and run the project on the device in Debug mode, the device will have bluetooth enabled and wifi disabled

2. Open the LUIS mobile app and tap on the device named "BLE_Device_1 xx:xx" (xx:xx is last two bytes of device's mac address) to connect to the device

3. A page with the device settings will be shown once bluetooth connection has been established.

4. Configure the wifi settings of the device to connect to your wifi access point.

5. Press save at the bottom of the page.

6. Press reboot. The device will reboot, load wifi settings, and try to connect to the access point.

7. If running in debug mode, press the "Run" button on TIDE after reboot to resume the application. If wifi settings are correct, the device will connect to the access point and start a web server. Visit `http://<device_ip>/index.html` to see the device serve an html page via wifi.

## Using the BLE Settings Configurator Library
1. add `ble_cmd.tbh` and `ble_cmd.tbs` to your project

2. boot up the WA2000 and enable bluetooth
```
sub bluetooth_init()
	dim hex_mac as string = dot_decimal_to_hex(bt.mac)
	dim advertise_name as string = BT_NAME + " " + mid(hex_mac,9, 2) + ":" + mid(hex_mac, 11, 2)
	wln2000_init()
	bt.name=advertise_name
	bt.emulation=PL_WLN_BT_EMULATION_MODE_MICROCHIP
	bt.txbuffrq(5)
	bt.rxbuffrq(5)
	sys.buffalloc()
	bt.enable()
end sub
```

3. add handler for bluetooth events
```
sub on_bt_event(bt_event as enum pl_bt_events)
	select case bt_event 
	
	case PL_BT_EVENT_CONNECTED:
		pat.play("G*",PL_PAT_CANINT)
	case PL_BT_EVENT_DISCONNECTED:
		pat.play("-G*",PL_PAT_CANINT)
	case PL_BT_EVENT_ENABLED:
		pat.play("-G*",PL_PAT_CANINT)
		bt.advertise = YES
	end select
end sub
```

4. pass data to the ble settings library when data is received
```
sub on_bt_data_arrival()
	ble_cmd_recv_data()
end sub
```


## Explanation
This sample demonstrates usage of the LUIS mobile app to modify settings defined in the `sdf.txt` file of the Tibbo Basic project. The device starts off with wifi disabled as specified in the `settings.xtxt` configuration file. When a mobile device connects to the device via the LUIS app, the device serves an html page to the mobile app via bluetooth. This html page is a web app that contains features similar to the Tibbo DS manager to change device settings. The user would then update the settings on the mobile app according to their local wifi access point, save the settings, and reboot. After the reboot, the device will attempt to connect to the access point based on the saved wifi settings. 

The files required serving a settings configurator html page are:
- ble_cmd.tbs
- ble_cmd.tbh
- sdf.html

Including this call in the `on_bt_data_arrival()` will allow for processing of bluetooth commands sent from the mobile app in `ble_cmd.tbs`
```
sub on_bt_data_arrival()
    ble_cmd_recv_data()
end sub
```
The sdf.html page being served will dynamically contain the settings defined in your `sdf.txt` file.
