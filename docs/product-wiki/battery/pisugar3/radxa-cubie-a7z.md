---
sidebar_position: 3
---

# Use on Radxa Cubie A7Z

The default I2C frequency for `i2c-7` on the Radxa Cubie A7Z is set to `400kHz`. However, in some cases, this may lead to instability in detecting the PiSugar3 battery device. This document provides a step-by-step guide to downclock `i2c-7` to `100kHz`, which can improve the detection success rate of the battery device.

This document summarizes the practical steps for lowering `i2c-7` from `400kHz` to `100kHz` on the Radxa Cubie A7Z, and improving the detection success rate of the PiSugar3 battery device.

## Applicable Scenarios

- PiSugar3 power supply and physical wiring have been confirmed to be normal.
- The initial scan of `i2c-7` does not show the battery device address (or only shows other devices).

## Environment Information (Tested in This Case)

- Board: Radxa Cubie A7Z
- System Kernel: `5.15.147-14-a733`
- I2C Controller: `/sys/firmware/devicetree/base/soc@3000000/twi@2517000`
- I2C Device Node: `/dev/i2c-7`
- TWI7 overlay: `/boot/dtbo/sun60iw2p1-twi7.dtbo`

## 1 Baseline Check (Before Downclocking)

```bash
ssh radxa@<radxa-ip>
printf 'radxa\n' | sudo -S /usr/sbin/i2cdetect -y 7
```

Observed phenomenon (before downclocking):

- No device detected, the battery device address does not appear.

## 2 Confirm Current Frequency

```bash
printf 'radxa\n' | sudo -S xxd -g 1 /sys/firmware/devicetree/base/soc@3000000/twi@2517000/clock-frequency
```

Output `00 06 1a 80`, i.e. `0x00061A80 = 400000` (400kHz).

## 3 Modify TWI7 Overlay Frequency to 100kHz

> Core idea: Decompile dtbo -> modify `clock-frequency` -> recompile and overwrite -> reboot.

```bash
printf 'radxa\n' | sudo -S sh -c '
cp -a /boot/dtbo/sun60iw2p1-twi7.dtbo /boot/dtbo/sun60iw2p1-twi7.dtbo.bak-400k
dtc -I dtb -O dts -o /tmp/sun60iw2p1-twi7.dts /boot/dtbo/sun60iw2p1-twi7.dtbo
sed -i "s/clock-frequency = <0x61a80>/clock-frequency = <0x186a0>/" /tmp/sun60iw2p1-twi7.dts
dtc -@ -I dts -O dtb -o /boot/dtbo/sun60iw2p1-twi7.dtbo /tmp/sun60iw2p1-twi7.dts
reboot
'
```

Notes:

- `0x61a80` = 400000 (400kHz)
- `0x186a0` = 100000 (100kHz)

## 4 Verification After Reboot

### 4.1 Frequency Confirmation

```bash
printf 'radxa\n' | sudo -S xxd -g 1 /sys/firmware/devicetree/base/soc@3000000/twi@2517000/clock-frequency
```

You should see `00 01 86 a0` (100kHz).

### 4.2 Bus Scan

```bash
printf 'radxa\n' | sudo -S /usr/sbin/i2cdetect -y 7
printf 'radxa\n' | sudo -S /usr/sbin/i2cdetect -r -y 7
```

Observed phenomenon (after downclocking):

- `0x57` newly appears (not present before downclocking).
- In `-r` mode, `0x57` is visible (and `0x68` can be observed).

### 4.3 Register Read Connectivity Test

```bash
printf 'radxa\n' | sudo -S sh -c '
/usr/sbin/i2cget -y 7 0x57 0x00
/usr/sbin/i2cget -y 7 0x57 0x01
/usr/sbin/i2cget -y 7 0x57 0x02
'
```

Returned values in this test:

- `0x03`
- `0x0f`
- `0xec`

Indicates that the `0x57` device is communicable.

## 5 Rollback to 400kHz

If you want to restore the original frequency, simply restore the backup file and reboot:

```bash
printf 'radxa\n' | sudo -S sh -c '
cp -a /boot/dtbo/sun60iw2p1-twi7.dtbo.bak-400k /boot/dtbo/sun60iw2p1-twi7.dtbo
reboot
'
```

## 6 Common Issues

- `i2cdetect: command not found`
  - Use the absolute path: `/usr/sbin/i2cdetect`
- `sudo` cannot be executed non-interactively
  - Use `printf 'password\n' | sudo -S ...`, or log in first and enter manually.
- Still unstable
  - You can try `50kHz` (`0x0000c350`) for further comparison.

## Configuration for pisugar-server

After successfully detecting the battery device, you can proceed to configure the `pisugar-server` to read battery information. 
Edit the configuration file `/etc/pisugar-server/config.json` to specify the I2C bus:

```json
{
  "i2c_bus": 7,
}
```

Then restart the `pisugar-server` service:

```bash
sudo systemctl restart pisugar-server
```

All set! You should now be able to read battery information through the `pisugar-server` webUI.

