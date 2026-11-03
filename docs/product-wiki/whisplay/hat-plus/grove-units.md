---
sidebar_position: 2
title: Grove Port.X and M5Stack Units
description: Connect supported M5Stack I2C and UART Grove Units to Whisplay HAT+ with Linux and Python tools.
---

# Grove Port.X and M5Stack Units

Whisplay HAT+ Grove Port.X can connect compatible M5Stack Units that communicate over I2C or TTL UART. The [`whisplay-grove-sensors`](https://github.com/PiSugar/whisplay-grove-sensors) project provides a Linux/Python catalog, hardware detection, decoded sensor drivers, safe monitors, demos, and a touch dashboard.

## Support Levels

Support depends on the Unit and its protocol:

| Level | Available functionality |
| :--- | :--- |
| `decoded` | Detects the Unit and returns structured sensor or input values |
| `monitor` | Safely monitors UART lines or bytes without sending device commands |
| `probe` | Safely checks the I2C address; a specialized register-level driver is not yet implemented |

The catalog includes many M5Stack I2C and UART Units, but catalog inclusion does not mean that every proprietary protocol has been decoded.

### Units with Decoded Data

Common Units with decoded Linux/Python support include:

- ENV III and ENV IV temperature/humidity sensors
- CO2 and TVOC/eCO2 air-quality sensors
- NCIR non-contact temperature sensor
- Ultrasonic I2C distance sensor
- DLight ambient-light sensor
- NFC reader for ISO14443A card UIDs
- Joystick2 and Scroll input Units
- GPS, GPS v1.1, and CatM GNSS NMEA data

Other cataloged I2C Units can be detected with safe address probes. Other cataloged UART Units can use the read-only line/hex monitor. See the [complete M5Stack Unit inventory](https://github.com/PiSugar/whisplay-grove-sensors/blob/main/docs/M5STACK_UNITS.md) for current coverage.

## Select I2C or UART

Grove Port.X uses I2C by default. Configure the mode in `/boot/firmware/config.txt`, then reboot.

I2C mode:

```ini
dtoverlay=whisplay-plus
```

UART mode:

```ini
enable_uart=1
dtoverlay=whisplay-plus,port_x_uart
```

On the tested Raspberry Pi configuration, I2C is available at `/dev/i2c-1` and UART at `/dev/serial0`.

## Install the Unit Drivers and Demos

```bash
git clone https://github.com/PiSugar/whisplay-grove-sensors.git
cd whisplay-grove-sensors
sudo ./install.sh
```

The installer deploys the project to `/opt/whisplay-grove-sensors`, creates a Python environment, grants the desktop user the required hardware groups, and installs the Grove Sensor Hub desktop/application-menu entry.

## Discover and Test Units

List the catalog and scan the I2C bus:

```bash
whisplay-grove list
whisplay-grove list --transport i2c
whisplay-grove scan --bus 1
```

Run decoded demos:

```bash
whisplay-grove demo ultrasonic-i2c
whisplay-grove demo env-iii
whisplay-grove demo co2
whisplay-grove demo nfc --interval 0.1
whisplay-grove demo gps-v11 --port /dev/serial0
```

Open the full-screen touch dashboard:

```bash
whisplay-grove dashboard
```

The dashboard detects connected Units, shows live values for decoded devices, provides presence/address information for other I2C Units, and monitors compatible UART devices. Its I2C and UART tabs can also switch Port.X electrically through GPIO27.

## I2C Address and Electrical Notes

The tested PiSugar RTC uses I2C address `0x58`, which conflicts with the SGP30 used by the M5Stack TVOC Unit. Do not place both devices on the same bus at the same address unless one is connected through an I2C multiplexer.

Run the conflict checker before combining several Units:

```bash
whisplay-grove conflicts --rtc-address 0x58
```

I2C addresses and product revisions can change, so scan the bus and check the exact SKU. Raspberry Pi GPIO is not 5 V tolerant; a Grove connector alone does not guarantee that an unknown third-party device uses 3.3 V-safe SDA/SCL pull-ups.
