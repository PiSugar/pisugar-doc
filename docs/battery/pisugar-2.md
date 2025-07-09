---
sidebar_position: 4
---

# PiSugar2

PiSugar2 is designed for pi-zeros. Compatible with all pi0 series(pi0,pi0w,pi0wh), with/without GPIO headers.

Based on PiSugar1, we added UPS, RTC and I2C features on this version. 

#### Note: make sure you are not running any PHAT or other program occupying i2c address 0x75 and 0x32. Writing  unexpected data into this two address will cause damage.

## Hardware SPECS

* PowerIC: Injoince IP5209
* RTC: SD3078
* MicroUSB: charging port
* Power Switch
* Programable Tap Button

## Electrical Specifications

| Electrical Specifications |      PiSugar 3     |
| :------------------------ |  :---------------: |
| Input                     |     5V-3Amax      |
| Output                    |     5V-2.5Amax     |
| Battery capacity          |       1200mah      |
| Communication interface   |  0x75/0x32 address |
| Size of PCB               |      65mmX30mm     |

## Hardware Installation

<!-- <p>
  <img width="320" src="http://cdn.pisugar.com/img/pisugar2-install.jpeg?imageView2/0/w/500">
</p> -->
![PiSugar2 Install](http://cdn.pisugar.com/img/pisugar2-install.jpeg?imageView2/0/w/500)


1. Turn the power switch to off
2. Attach pi-zero's back to the pin side of PiSugar2
3. Tighten the four screws (M2.5) from the pi-side
4. Turn on the power switch and enjoy!

## Software Installation

Run the following script on your pi:

```
wget https://cdn.pisugar.com/release/pisugar-power-manager.sh
bash pisugar-power-manager.sh -c release
```
After finished, you can manage the battery by visiting http://\<your raspberry ip\>:8421 in your browser.

<!-- <p>
  <img width="600" src="http://cdn.pisugar.com/pisugar2/images/ui.png?imageView2/0/w/800">
</p> -->
![PiSugar2 WebUI](http://cdn.pisugar.com/pisugar2/images/ui.png?imageView2/0/w/800)

PiSugar Power Manager is develop in Rust and Vue2.0, with high performace (less than 2% pi0 cpu) and exquisite designed webUI. 

Distinguish between PiSugar 2 (2-LED) and 4-LED models: https://github.com/PiSugar/PiSugar/wiki/PiSugar-Power-Manager-(Software)#support-model-list

User Guide: https://github.com/PiSugar/PiSugar/wiki/PiSugar-Power-Manager-(Software)

## API

With the software installed, you can also get battery data via udp/uds/websocket in your own way, for example:

```
echo "get battery" | nc -q 0 /tmp/pisugar-server.sock
echo "get battery" | nc -U -q 0 127.0.0.1 8423
```

For more details, please refer to: https://github.com/PiSugar/pisugar-power-manager-rs#unix-domain-socket--webscoket--tcp

## Charging

Please use PiSugar's USB port for charging. If you use pi0's USB port it won't charge PiSugar, and PiSugar will turn off automatically since the external power is enough for pi0 to run.

You can get the charging status from webUI or api. 

On 4-led version, the charging status is calculated by software, based on whether the battery level is increasing. So when it's 100% then you can't tell if it's connecting to external USB power.

## Schedule Wake Up

If you use schedule wake up function, please keep the power switch ON. The battery will turn off as the pi shutdown. The RTC will wake up the battery and the pi at the time you set.

## 3D Printed Case

We are developing 3D models based on the PiSugar1. Except the shell part, the other parts will remain the same will PiSugar1, as well as the phat lids.

Basic components (for zero): https://github.com/PiSugar/PiSugar/tree/master/model2

Other basic components (for zero): https://github.com/PiSugar/PiSugar/tree/master/model

Lids for piHats (for zero): https://github.com/PiSugar/pisugar-case-pihat-cap

## Extensible

PiSugar2 has some solder pads for developers to debug or add other functions. 

* I2C pads: SDA and SCL, bridge to pi0's i2c-1
* 5V Input (Qi): for 5V wireless charging or solar charging
* 5V Output: other usages

![PiSugar2 Detail](http://cdn.pisugar.com/img/pisugar2-detail.jpg?imageView2/0/w/1000)


## Documents

Please refer to: https://github.com/PiSugar/pisugar-documents

