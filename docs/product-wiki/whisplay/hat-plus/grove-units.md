---
sidebar_position: 2
title: Grove Port.X and Compatible Sensors
description: Configure Grove Port.X and use supported M5Stack I2C and UART Units with Whisplay HAT+.
---

# Grove Port.X and Compatible Sensors

Whisplay HAT+ includes a Grove Port.X connector that can be switched between **I2C** and **3.3 V TTL UART**. The open-source [`whisplay-grove-sensors`](https://github.com/PiSugar/whisplay-grove-sensors) project provides Linux/Python drivers, device discovery, command-line demos, and a touch-friendly sensor dashboard for compatible M5Stack Units.

:::warning
Turn off the Raspberry Pi before connecting or disconnecting a Grove Unit. Port.X supports I2C and TTL UART Units only; do not connect analog, GPIO-only, CAN, DMX, or direct RS-485 devices. Raspberry Pi GPIO is not 5 V tolerant, so check the voltage and pull-up levels of third-party Grove devices before use.
:::

## 1. Connect a Grove Unit

1. Shut down the Raspberry Pi and disconnect its power supply.
2. Connect the Unit to Grove Port.X with a 4-pin Grove cable.
3. Choose the matching I2C or UART configuration below.
4. Reconnect power and start the Raspberry Pi.

Port.X is selected by GPIO27: low selects I2C and high selects UART. The Whisplay HAT+ device-tree overlay sets this automatically during boot.

## 2. Select I2C or UART Mode

Edit `/boot/firmware/config.txt`. Use only one Port.X mode, then reboot.

### I2C mode (default)

```ini
dtoverlay=whisplay-plus
```

The default I2C device is `/dev/i2c-1` on the tested Raspberry Pi configuration.

### UART mode

```ini
enable_uart=1
dtoverlay=whisplay-plus,port_x_uart
```

The default UART device is `/dev/serial0` on the tested Raspberry Pi configuration.

If the HAT EEPROM loads the overlay automatically, place this setting before the overlay is loaded instead:

```ini
enable_uart=1
dtparam=port_x_uart=on
```

## 3. Install the Drivers and Demos

Make sure the [Whisplay HAT+ driver](https://github.com/PiSugar/whisplay-plus) is installed first. Then run:

```bash
git clone https://github.com/PiSugar/whisplay-grove-sensors.git
cd whisplay-grove-sensors
sudo ./install.sh
```

The installer deploys the project to `/opt/whisplay-grove-sensors`, creates a Python environment, grants the desktop user access to the required hardware groups, and adds **Grove Sensor Hub** to the desktop and application menu.

## 4. Discover and Test Units

List the device catalog and scan the I2C bus:

```bash
whisplay-grove list
whisplay-grove list --transport i2c
whisplay-grove scan --bus 1
```

Run a decoded sensor demo by passing its name from the table below:

```bash
whisplay-grove demo env-iii
whisplay-grove demo ultrasonic-i2c
whisplay-grove demo nfc --interval 0.1
whisplay-grove demo gps-v11 --port /dev/serial0
```

Each demo runs until you press <kbd>Ctrl</kbd>+<kbd>C</kbd>.

## Fully Supported Units

The following Units have `decoded` support: the software detects the device and returns structured sensor or input values. Select a Unit name to open its official M5Stack Store product page. This list reflects the current [`whisplay-grove-sensors` catalog](https://github.com/PiSugar/whisplay-grove-sensors/blob/main/src/whisplay_grove/catalog.py).

### I2C Units

| Unit | Demo name | Default address | Available data |
| :--- | :--- | :--- | :--- |
| [ENV III](https://shop.m5stack.com/products/env-iii-unit-with-temperature-humidity-air-pressure-sensor-sht30-qmp6988) | `env-iii` | `0x44` | SHT30 temperature and humidity |
| [ENV IV (EOL)](https://shop.m5stack.com/products/env-iv-unit-with-temperature-humidity-air-pressure-sensor-sht40-bmp280) | `env-iv` | `0x44` | SHT40 temperature and humidity |
| [CO2](https://shop.m5stack.com/products/co2-unit-with-temperature-and-humidity-sensor-scd40) | `co2` | `0x62` | SCD4x CO2, temperature, and humidity |
| [TVOC/eCO2](https://shop.m5stack.com/products/tvoc-eco2-gas-unit-sgp30) | `tvoc` | `0x58` | SGP30 TVOC and eCO2 |
| [NCIR](https://shop.m5stack.com/products/ncir-sensor-unit) | `ncir` | `0x5a` | MLX90614 non-contact object and ambient temperature |
| [Ultrasonic I2C](https://shop.m5stack.com/products/ultrasonic-distance-unit-i2c-rcwl-9620) | `ultrasonic-i2c` | `0x57` | Distance |
| [DLight](https://shop.m5stack.com/products/dlight-unit-ambient-light-sensor-bh1750fvi-tr) | `dlight` | `0x23` | BH1750 ambient light |
| [Joystick2](https://shop.m5stack.com/products/i2c-joystick-2-unit-stm32g030) | `joystick2` | `0x63` | X/Y axes and button state |
| [NFC](https://shop.m5stack.com/products/nfc-universal-unit-st25r3916) | `nfc` | `0x50` | ISO14443A card UID |
| [Scroll](https://shop.m5stack.com/products/scroll-unit-with-hollow-shaft-encoder-ec10e1220501) | `scroll` | `0x40` | Rotary encoder, key, and RGB LED state |

### UART Units

| Unit | Demo name | Default baud rate | Available data |
| :--- | :--- | :--- | :--- |
| [GPS (EOL)](https://shop.m5stack.com/products/mini-gps-bds-unit) | `gps` | 9600 | Decoded NMEA position data |
| [GPS v1.1](https://shop.m5stack.com/products/gps-bds-unit-v1-1-at6668) | `gps-v11` | 115200 | Decoded NMEA position data |
| [CatM GNSS](https://shop.m5stack.com/products/sim7080g-cat-m-nb-iot-gnss-unit-with-telec-antenna) | `catm-gnss` | Device default | Decoded NMEA position data |

:::note
Store availability varies by region. `EOL` means M5Stack marks the product as end-of-life; its official page is retained for model identification and specifications.
:::

## Other Cataloged Units

The project also catalogs many additional M5Stack I2C and UART Units. Their support is intentionally limited according to the safety of the available protocol:

| Support level | What works |
| :--- | :--- |
| `decoded` | Device detection and structured sensor or input values |
| `probe` | Safe I2C address detection; a register-level driver is not yet implemented |
| `monitor` | Read-only UART line or byte monitoring; device commands are not sent |

Cataloged I2C devices include environmental sensors, distance and motion sensors, input devices, measurement modules, displays, actuators, and expanders. Cataloged UART devices include cameras, positioning modules, readers, cellular and radio modules, and bus adapters. See the [complete M5Stack Unit inventory](https://github.com/PiSugar/whisplay-grove-sensors/blob/main/docs/M5STACK_UNITS.md) for the current list and support level.

:::note
A Unit appearing in the catalog does not necessarily have a decoded driver. Use `whisplay-grove list` to check its current `decoded`, `probe`, or `monitor` status.
:::

## Use the Touch Dashboard

Launch the aggregate sensor dashboard from the **Grove Sensor Hub** application-menu entry, or run:

```bash
whisplay-grove dashboard
```

The dashboard can switch Port.X between I2C and UART through GPIO27. Decoded Units show live values; other I2C Units show address and presence information; other UART Units use a safe read-only monitor.

For development in a desktop window, run:

```bash
whisplay-grove dashboard --windowed
```

## I2C Address Conflicts

Multiple I2C devices may share Port.X only when their addresses do not conflict. Check the connected devices before combining Units:

```bash
whisplay-grove conflicts --rtc-address 0x58
```

The tested PiSugar RTC uses address `0x58`, which conflicts with the SGP30 used by the TVOC Unit. Do not use both on the same I2C bus unless one device is placed behind an I2C multiplexer.

Product revisions may use different addresses. Always scan the bus and verify the exact SKU before connecting multiple Units.

## Troubleshooting

- **No I2C Unit is found:** confirm that the standard `dtoverlay=whisplay-plus` configuration is active, reboot, and run `whisplay-grove scan --bus 1`.
- **No UART data appears:** confirm that both `enable_uart=1` and `port_x_uart` are set, reboot, and verify that the demo uses `/dev/serial0` and the Unit's correct baud rate.
- **Permission denied:** sign out and back in after installation so the new `i2c` and `dialout` group memberships take effect.
- **A device is detected but shows no values:** run `whisplay-grove list` and check whether its support level is `probe` or `monitor` rather than `decoded`.

## Resources

- [`whisplay-grove-sensors` source, installation, and examples](https://github.com/PiSugar/whisplay-grove-sensors)
- [Complete M5Stack I2C/UART Unit inventory](https://github.com/PiSugar/whisplay-grove-sensors/blob/main/docs/M5STACK_UNITS.md)
- [Whisplay HAT+ driver](https://github.com/PiSugar/whisplay-plus)
