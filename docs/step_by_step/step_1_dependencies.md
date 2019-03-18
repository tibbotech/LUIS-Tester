## Step 1: Dependencies

1. Make sure you have the [STG](<http://docs.tibbo.com/taiko/lib_stg.htm>) library in your project
2. Add **include "settings\trunk\settings.tbh"** to the includes section of the global.tbh file
3. Create a settings file e.g. settings.xtxt
4. include the settings file in **global.tbh** e.g. **includepp "settings.xtxt"**
5. add **settings_start()** to your **on_sys_init()**

