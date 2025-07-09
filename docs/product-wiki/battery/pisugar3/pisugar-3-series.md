---
sidebar_position: 1
---

# PiSugar3 Series

PiSugar3 is the third generation of PiSugar, making Raspberry Pi a portable device. With an standalone MCU, PiSugar3 supports more powerful features. 

## Power-On

The PiSugar 3 has the accidental touch prevention feature enabled by default. 

The default power-on method is to short press and then long press (Click & Hold).

The default power-off method is to long press.


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
![PiSugar logo](http://cdn.pisugar.com/pisugar2/images/ui.png?imageView2/0/w/800)

PiSugar Power Manager is develop in Rust and Vue2.0, with high performace (less than 2% pi0 cpu) and exquisite designed webUI. 

User Guide can be found [here](/docs/software/power-management/pisugar-power-manager).

## New Features
### **Full functions UPS**

   PiSugar 3 has full UPS functions and can set up multiple awakening methods to meet various unique project needs.

   PiSugar 3 keeps running/working when external power is connecting or disconnecting to avoid data loss. PiSugar 3 can infer whether the external power supply is powered, whether the external power supply is disconnected, and also the battery voltage status through the data interface. Users can determine if they need to actively shut down for data protection and can set the device to automatically turn on when the external power supply is restored. With the combination of the above functions, the device can keep running as long as possible on the premise of safety.

### **OTA firmware upgrade**

  A new design based on the feedback of PiSugar2, using independent MCU control to achieve communication and functions. The device firmware can be upgraded without any additional equipment. Only with a simple demand, firmware upgrades can be achieved through Raspberry Pi, letting the device get new features at any time.

  You can use following command to update the firmware of PiSugar3 (lastest:1.3.4):
  
```
curl https://cdn.pisugar.com/release/PiSugarUpdate.sh | sudo bash
```

### **Hardware battery protection**

   PiSugar 3 provides hardware battery protection like never before, limiting battery voltage to nearly 80%. When charging protection is turned on, the battery cycles life can be improved.

### **I2C control, mutable address**

   PiSugar 3 communicates with the Raspberry Pi through the I2C interface and is compatible with most I2C devices. In addition, the I2C communication address can be customized to avoid I2C address conflicts.

### **Software watchdog**

   PiSugar 3 has a software watchdog function. When the function is turned on, the dog needs to be kicked regularly, which can effectively prevent the Raspberry Pi from crashing and improve the reliability of the system.

### **Anti-Mistaken Touch Switch**

Click and hold the power button to turn on/off. This feature can be turn off in software.


## Other Features

* **Back contact, easy to install, does not occupy GPIO**

   PiSugar 3 continues to use the pogo pin design to connect with Raspberry Pi from the back. In this way, it does not occupy the GPIO and is compatible with other GPIO devices.

* **TypeC charging interface**

   Both the PiSugar 3 and PiSugar 3 Plus have TypeC charging port. PiSugar3 Plus has an alternative micro-USB charging port.

* **Onboard RTC**

   With the ultra-low power consumption design, the onboard RTC can keep the clock running for more than one year when PiSugar is off.

* **Soft shutdown**

   Hardware events trigger software shutdown.

* **Custom button**
* **WebUI**

## Electrical Specifications

| Electrical Specifications |  PiSugar 3 Plus   |     PiSugar 3     |
| :------------------------ | :---------------: | :---------------: |
| Input                     |     5V-3Amax      |     5V-3Amax      |
| Output                    |     5V-3Amax      |    5V-2.5Amax     |
| Battery capacity          |      5000mah      |      1200mah      |
| Communication interface   | 0x57/0x68 address | 0x57/0x68 address |
| Size of PCB               |     65mmX56mm     |     65mmX30mm     |

## PCB instructions

   **PiSugar3**

<!-- <p>
  <img width="500" title="PiSugar3" src="https://cdn.pisugar.com/img/PiSugar3-1200mah.jpg?imageView2/0/w/800">
</p>

   **PiSugar3 Plus**

<p>
  <img width="500" title="PiSugar3" src="https://cdn.pisugar.com/img/PiSugar3-5000mah.jpg?imageView2/0/w/800">
</p> -->

PiSugar3 PCB
![PiSugar3 PCB](https://cdn.pisugar.com/img/PiSugar3-1200mah.jpg?imageView2/0/w/800)

PiSugar3 Plus PCB
![PiSugar3 Plus PCB](https://cdn.pisugar.com/img/PiSugar3-5000mah.jpg?imageView2/0/w/800)


| Position |          Name          |                                                                Description                                                                |
| :------- | :--------------------: | :---------------------------------------------------------------------------------------------------------------------------------------: |
| 1        |          GND           |           PiSugar's GND, 0V, all GNDs are connected, if connected to the Raspberry Pi, also directly to the Raspberry Pi's GND            |
| 2        |          BAT           |                                                         Battery Positive, 3V-4,2V                                                         |
| 3        |       USB Input        |                                                          Input voltage 4.5V-5.2V                                                          |
| 4        | Custom function button |                                                                                                                                           |
| 5        |      Power button      |                                                                                                                                           |
| 6        |  System reset button   |                                Use when the hardware is in abnormal state, short press will reset PiSugar                                 |
| 7        |  Extension Interface   | 5V Output, GND, MDAT/MSCL: I2C main interface, no function at this time. SDAT/SSCL: I2C slave interface, connected to Pi's I2C interface. PiSugar3 1.27mm Header (use JST 1.25mm connector). PiSugar3 Plus 2.54mm Header  |
| 8        |      5V Input Pad      |                                                     Connect to USB interface 5V input                                                     |
| 9        |   Custom Button Pad    |                                        Trigger custom button function when connected to BAT(PAD:2)                                        |
| 10       |    Power Button Pad    |                                        Trigger power button function when connected to BAT(PAD:2)                                         |
| 11       |     5V Output Pad      |                                        Connected to system 5V output, connected to Raspberry Pi 5V                                        |

* Note: the small round button on the board is for reseting the hardware. It's not an activation button as that on PiSugar 2.

## I2C Datasheet

For more details, please refer to [PiSugar 3 I2C Datasheet](pisugar-3-i2c).

## 3D Printed Case

Basic components (for zero): https://github.com/PiSugar/PiSugar/tree/master/model3

Basic components (for plus): https://github.com/PiSugar/PiSugar/tree/master/model_pro

Lids for piHats (for zero): https://github.com/PiSugar/pisugar-case-pihat-cap


## RTC on board

PiSugar 3 have an RTC on board, which can easily use by hwclock. 

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

<!-- Add **Markdown or React** files to `src/pages` to create a **standalone page**:

- `src/pages/index.js` → `localhost:3000/`
- `src/pages/foo.md` → `localhost:3000/foo`
- `src/pages/foo/bar.js` → `localhost:3000/foo/bar`

## Create your first React Page

Create a file at `src/pages/my-react-page.js`:

```jsx title="src/pages/my-react-page.js"
import React from 'react';
import Layout from '@theme/Layout';

export default function MyReactPage() {
  return (
    <Layout>
      <h1>My React page</h1>
      <p>This is a React page</p>
    </Layout>
  );
}
```

A new page is now available at [http://localhost:3000/my-react-page](http://localhost:3000/my-react-page).

## Create your first Markdown Page

Create a file at `src/pages/my-markdown-page.md`:

```mdx title="src/pages/my-markdown-page.md"
# My Markdown page

This is a Markdown page
```

A new page is now available at [http://localhost:3000/my-markdown-page](http://localhost:3000/my-markdown-page). -->
