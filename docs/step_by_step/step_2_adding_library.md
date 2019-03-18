## Step 2: Adding the LUIS Library

1. Add **luis.tbh**, **luis.tbs**, and **luis.html** to your project
2. Add **include "luis\trunk\luis.tbh"** to the includes section of the global.tbh file
3. Add **luis_start()** to your **on_sys_init()**

*if you want to use the **wln** library, **luis_start()** should not be called before **wln_start()**, instead it should be called after **wln_start()***

4. Add LUIS event procedures to respective event handlers

```basic
sub on_bt_event(bt_event as enum pl_bt_events)
	luis_on_bt_event(bt_event)
end sub

sub on_bt_data_sent()
	luis_on_bt_data_sent()
end sub

sub on_bt_data_arrival()
	luis_on_bt_data_arrival()
end sub
```



5. Implement LUIS library callbacks

```basic
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
```

