---
sidebar_position: 3
---

# PiSugar2 Plus

Building on the success of powering Raspberry Pi Zero, we've applied the same technology to power larger Raspberry Pi models.

So here comes PiSugar2 Plus(Pro), a special PiSugar version for Raspberry Pi 2/3A/3B/3B+/4B. It's designed with the same architecture as PiSugar2, with a bigger size and some additional features.

![PiSugar2 Pro](https://cdn.pisugar.com/img/pro-3.JPG?imageView2/0/w/800)

## Hardware SPECS

* PowerIC: Injoince IP5312
* RTC: SD3078
* Type-c: charging port, with E-mark support
* MicroUSB: charging port
* PH2.0 Battery Plug
* Power Switch & Turbo Switch
* Programmable Tap Button

## Electrical Specifications

| Electrical Specifications |  PiSugar 2 Plus   |
| :------------------------ | :---------------: | 
| Input                     |     5V-3A max      | 
| Output                    |     5V-3A max      | 
| Battery capacity          |      5000mah      | 
| Communication interface   | 0x75/0x32 address |
| Size of PCB               |     65mmX56mm     |

<!-- <p align="left">
  <img width="400" src="http://cdn.pisugar.com/img/pro-1.JPG?imageView2/0/w/800">
</p> -->
![PiSugar2 Pro](https://cdn.pisugar.com/img/pro-1.JPG?imageView2/0/w/800)

## Features

* Simple Installation: PiSugar style, power from the back!
* Battery Plug: You can switch lithium battery by your own 
* I2C Data Abilities: get battery data by api or webUI
* Programmable Button: customize a button function base on your project need
* 3A Battery Output (Max 6A in Turbo Mode): meet the requirement of rpi 4B and more power consuming scenarios.


## Hardware Installation

1. Turn the power switch to off
2. Attach pi-zero's back to the pin side of PiSugar2 Pro
3. Tighten the four screws (M2.5) from the pi-side
4. Plug in the lithium battery and click the tap button to see the battery level
5. If the battery level is low or not indicated, please charge it first
6. click the [activation button](https://github.com/PiSugar/PiSugar/wiki/PiSugar2-Pro/_edit#activation)
7. Turn on the power switch and enjoy!

## Software Installation (Same as PiSugar2)

Run the following script on your pi:

```
wget https://cdn.pisugar.com/release/pisugar-power-manager.sh
bash pisugar-power-manager.sh -c release
```
After finished, you can manage the battery by visiting http://\<your raspberry ip\>:8421 in your browser.

<!-- <p>
  <img width="600" src="http://cdn.pisugar.com/pisugar2/images/ui.png?imageView2/0/w/800">
</p> -->
![PiSugar2 Pro WebUI](https://cdn.pisugar.com/pisugar2/images/ui.png?imageView2/0/w/800)

PiSugar Power Manager is develop in Rust and Vue2.0, with high performace (less than 2% pi0 cpu) and exquisite designed webUI. 

User Guide can be found [here](../pisugar-power-manager).

## API (Same as PiSugar2)

With the software installed, you can also get battery data via udp/uds/websocket in your own way, for example:

```
echo "get battery" | nc -q 0 /tmp/pisugar-server.sock
echo "get battery" | nc -U -q 0 127.0.0.1 8423
```

For more details, please refer to: https://github.com/PiSugar/pisugar-power-manager-rs#unix-domain-socket--webscoket--tcp

## 3D Printed Case

Basic components (for plus): https://github.com/PiSugar/PiSugar/tree/master/model_pro

## Charging (Same as PiSugar2)

Please use PiSugar's type-c or micro USB port for charging. If you use pi0's USB port it won't charge PiSugar, and PiSugar will turn off automatically since the external power is enough for pi0 to run.

You can get the charging status from webUI or api.

## Schedule Wake Up (Same as PiSugar2)

If you use schedule wake up function, please keep the power switch ON. The battery will turn off as the pi shutdown. The RTC will wake up the battery and the pi at the time you set.

## Activation

Activation process is required by IP5312. once the battery level drop to very low or the battery is unplugged, you need to activate it in the next time when you plugin the battery or start charging. Plugin the USB Charging Port and click the circle button (near the tap button) to activate.

## 3D Printed Case

We now have a case designed for PiSugar2 pro. Please note that it's a beta version.

Please visit https://github.com/PiSugar/PiSugar/tree/master/model_pro

## Documents

Please refer to: https://github.com/PiSugar/pisugar-documents



