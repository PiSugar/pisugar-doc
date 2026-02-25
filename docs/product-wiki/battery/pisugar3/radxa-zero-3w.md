---
sidebar_position: 6
---

# Use on Radxa Zero 3W

PiSugar3 uses `I2C-3` bus on Radxa Zero 3W. After installing the battery and pisugar-server, you need to manually modify the configuration to read battery information.

1. Edit the `/etc/pisugar-server/config.json` file to specify the I2C bus:

```json
{
  "i2c_bus": 3,
}
```

2. Restaert the `pisugar-server` service to apply the changes:

```bash
sudo systemctl restart pisugar-server
```

That's it! You should now be able to read battery information through the `pisugar-server` webUI.