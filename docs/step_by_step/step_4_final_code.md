## Final Code

Your final code should look something like this:

##### main.tbs

```basic
sub on_sys_init()
	stg_start()
    luis_start("your_device_name")
end sub

sub on_bt_event(bt_event as enum pl_bt_events)
	luis_on_bt_event(bt_event)
end sub

sub on_bt_data_sent()
	luis_on_bt_data_sent()
end sub

sub on_bt_data_arrival()
	luis_on_bt_data_arrival()
end sub

'LUIS callbacks-------------------------------------
sub callback_luis_bt_connected()
end sub

sub callback_luis_bt_disconnected()
end sub

sub callback_luis_bt_enabled()
end sub

sub callback_luis_bt_disabled()
end sub

sub callback_luis_buzz_command()
end sub

'settings callbacks-------------------------------------
sub callback_stg_error(byref stg_name_or_num as string,index as byte,status as en_stg_status_codes)
end sub
sub callback_stg_pre_get(byref stg_name_or_num as string,index as byte,byref stg_value as string)
end sub
sub callback_stg_post_set(byref stg_name_or_num as string, index as byte,byref stg_value as string)
end sub
```



##### global.tbh

```basic
'DEFINES-------------------------------------------------------------
#define LUIS_CONFIG_FILE "luis.xtxt"
#define LUIS_DEBUG_PRINT 1

'INCLUDES------------------------------------------------------------
includepp "settings.xtxt"
include "settings\trunk\settings.tbh"
include "luis\trunk\luis.tbh"

```

