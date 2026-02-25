---
sidebar_position: 4
---

# PiSugar3 RTC

All PiSugar 3 models have an RTC (stimulated by MCU), which can easily be used by hwclock. 

**Function description**

address: 0x68 as same as ds3231

Data description: The clock part is consistent with ds3231

**Using PiSugar RTC as System Clock**

Take Raspberry Pi OS kernel version: 5.15 as an example, for other system versions, please refer to the operating instructions of ds3231

1. Open I2C port
2. Upgrade pisugar firmware to the latest version
3. Write the following to the /boot/config file:

   `dtoverlay=i2c-rtc,ds3231`

   The modified file should look like this:

     <!-- <img width="600" src="https://cdn.pisugar.com/img/config.png"> -->

4. Restart the system

After the above steps, RTC should have been mounted with the system,you can use the following instructions to verify:

Use the following command to view the I2C mounting:

`i2cdetect -y 1`

As a result, the UU mark can be seen at 0x68, indicating that it has been occupied by the system

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

Then you can use the hwclock command

```
pi@PI4B:~ $ sudo hwclock -r
2020-01-22 08:00:27.671798+08:00
pi@PI4B:~ $ sudo hwclock -w
pi@PI4B:~ $ sudo hwclock -r
2022-08-31 13:14:31.619253+08:00
pi@PI4B:~ $
```