---
sidebar_position: 3
---

# PiSugarS Series

PiSugar S serial is designed for Raspberry Pi like PiSugar 2, but with fewer functions and convenient UPS settings.

# Hardware SPECS
* MicroUSB / TypeC: charging port
* Power Switch
* Start up button
* Auto Star up function switch

## Electrical Specifications

| Electrical Specifications |  PiSugar S Plus   |     PiSugar S     |
| :------------------------ | :---------------: | :---------------: |
| Input                     |     5V-3A max      |     5V-3A max      |
| Output                    |     5V-3A max      |    5V-2.5A max     |
| Battery capacity          |      5000mah      |      1200mah      |
| Size of PCB               |     65mmX56mm     |     65mmX30mm     |

# Hardware Installation
1. Turn the power switch to off
1. Attach pi-zero's back to the pin side of PiSugarS
1. Tighten the four screws (M2.5) from the pi-side
1. Turn on the power switch and enjoy!

# Auto start up function and custom button


:::warning

Since PiSugar S and PiSugar S Plus use the I2C SCL pin to start up the Raspberry Pi system, the automatic startup function cannot be used together with I2C communication.

If you need to use Raspberry Pi's i2c-1 bus, please turn the auto switch to OFF.

:::

### Turn on the function switch
* If the external power is restored during the Raspberry Pi system shutdown, the system will be waked up.
* If external power supply is available, the SCL pin is low level.Otherwise, it will remain high. 
* Since SCL is low during the existence of external power supply, I2C communication cannot be used.
* Because they use the same wake-up pin as the custom button, they interact with each other.

### Turn off the function switch

* Whether the external power supply is connected or not does not affect the SCL pin, and will not wake up the system.
* Pressing the button will trigger SCL to low level, and if the Raspberry Pi is off, it will wake up the system. If the Raspberry Pi is turned on, it can be used as a custom button. 
* Because SCL is not continuously pulled down, I2C functions normally.

###  Example script

https://github.com/PiSugar/pisugar-power-manager-rs/blob/master/scripts/PiSugarSButtonActive.sh
#  Battery protection
When the battery voltage is lower than 3V, PiSugar S will shut down immediately. It will not turn on again until the battery voltage up to 3.6V.

Both threshold voltages can be adjusted by rewinding the resistor on the circuit board, but we highly recommend do not modify them, If you really have such demand, please contact us.

# PCB instructions

<!-- <p>
  <img width="500" title="PiSugarS Plus" src="https://cdn.pisugar.com/img/PiSugarS240705.jpg">
</p>

   **PiSugarS Plus**

<p>
  <img width="500" title="PiSugarS Plus" src="https://cdn.pisugar.com/img/PiSugarSPlus240705.jpg">
</p> -->
PiSugarS PCB
![PiSugarS PCB](https://cdn.pisugar.com/img/PiSugarS240705.jpg)

PiSugarS Plus PCB
![PiSugarS Plus PCB](https://cdn.pisugar.com/img/PiSugarSPlus240705.jpg)

| Position |  Name   |     Description    |
| :------------------------ | :---------------: | :---------------: |
| 1                     |     GND    |     PiSugar's GND, 0V, all GNDs are connected, if connected to the Raspberry Pi, also directly to the Raspberry Pi's GND      |
| 2                     |     BAT    |     Battery Positive, 3V-4,2V      |
| 3                     |     USB Input    |     Input voltage 4.5V-5.2V      |
| 4                     |     Custom function button    |    See the function description above       |
| 5                     |     Power switch    |           |
| 6                     |     Auto startup switch    |    See the function description above       |
| 7                     |     5V Input Pad    |    Connect to USB interface 5V input       |
| 8                     |     Custom Button Pad    |    Trigger custom button function when connected to GND(PAD:1)       |
| 9                     |     Power switch Pad    |    Power om when connected to ON pad(PAD:10)       |
| 10                     |     Power On Pad    |           |
| 11                     |     5V Output Pad    |    Connected to system 5V output, connected to Raspberry Pi 5V       |
| 12                     |     SCL    |    Used for functions such as automatic startup, button startup, acquiring external charging status, connected to Raspberry Pi GPIO3       |

# 3D Printed Case

PiSugarS (Plus) and PiSugar2 (Plus) share the same dimension therefore you can use PiSugar2's cases.

Basic components (for zero): https://github.com/PiSugar/PiSugar/tree/master/model2

Other basic components (for zero): https://github.com/PiSugar/PiSugar/tree/master/model

Basic components (for plus): https://github.com/PiSugar/PiSugar/tree/master/model_pro

Lids for piHats (for zero): https://github.com/PiSugar/pisugar-case-pihat-cap

# Charging
5V 3A max

# Notice
PiSugar S and PiSugar S Plus use I2C SCL gpio to startup the RaspberryPi system, so the automatic startup function and the custom button cannot be used together with I2C communication

# Documents
Please refer to: https://github.com/PiSugar/pisugar-documents
