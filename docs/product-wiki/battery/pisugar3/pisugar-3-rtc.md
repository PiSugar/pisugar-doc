---
sidebar_position: 4
---

# PiSugar3 RTC

All PiSugar 3 models have an MCU-emulated DS3231-compatible RTC, which can be used with `hwclock`.

**Function description**

address: 0x68 as same as ds3231

Data description: The clock part is consistent with ds3231

## Using PiSugar RTC as the system clock

The following steps use Raspberry Pi OS with kernel 5.15 as an example. For other systems, consult their DS3231 configuration instructions.

1. Enable the I2C interface.
2. Upgrade the PiSugar firmware to the latest version.
3. Open the Raspberry Pi boot configuration file:

   - Raspberry Pi OS Bookworm and later: `/boot/firmware/config.txt`
   - Older Raspberry Pi OS releases: `/boot/config.txt`

   Add the following line under the global `[all]` section (or outside any model-specific section):

   ```ini
   [all]
   dtoverlay=i2c-rtc,ds3231
   ```

   If the file already contains an `[all]` section, add only the `dtoverlay` line to that section. Do not add the overlay more than once.

4. Save the file and restart the system:

   ```bash
   sudo reboot
   ```

After the restart, the RTC should be registered by the system. You can use the following commands to verify it.

Use the following command to inspect the I2C bus:

`i2cdetect -y 1`

The `UU` mark at address `0x68` indicates that the RTC address is in use by a kernel driver.

```
pi@PI4B:~ $ i2cdetect -y 1
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:          -- -- -- -- -- -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- 57 -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- UU -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- --
```

## Install and use `hwclock`

Some minimal Raspberry Pi OS images do not include `hwclock`. If the command is missing, install it with:

```bash
sudo apt update
sudo apt install util-linux-extra
```

You can then read the RTC, write the current system time to it, and read it again:

```
pi@PI4B:~ $ sudo hwclock -r
2020-01-22 08:00:27.671798+08:00
pi@PI4B:~ $ sudo hwclock -w
pi@PI4B:~ $ sudo hwclock -r
2022-08-31 13:14:31.619253+08:00
pi@PI4B:~ $
```
