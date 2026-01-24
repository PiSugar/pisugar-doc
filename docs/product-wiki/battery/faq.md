---
sidebar_position: 10
---

# FAQ

### 1. Why PiSugar is not able to power Raspberry Pi? Why PiSugar 2/3 cannot be detected on I2C bus?

The common cause of this issue is residual solder mask on the bottom of the Raspberry Pi's GPIO pins. The contact issue with the pogo pins may also cause data communication errors between PiSugar and the Raspberry Pi. 

You can gently scrape the solder points with a plastic tool to ensure a clean connection for the pogo pins. Or using alcohol wipe to clean the bottom of the pins. After that, try reinstalling the PiSugar on the bottom of the Raspberry Pi.

<!-- <img src="https://github.com/user-attachments/assets/d23c22bb-ca92-4b91-8f3b-75fd98985892" width="500"> -->
![PiSugar Installation](https://github.com/user-attachments/assets/d23c22bb-ca92-4b91-8f3b-75fd98985892)

### 2. Can the PiSugar be used together with the official Raspberry Pi 5 Active Cooler?

Yes, it can. However, the mounting clips of the Active Cooler pass through the Raspberry Pi PCB and occupy some space at the bottom, which can interfere with the installation of the PiSugar. You simply need to modify the mounting clips as shown in the diagram, gently spread the legs of the plastic fasteners outwards, which allows for proper assembly of PiSugar.

<!-- <img src="https://github.com/user-attachments/assets/495dbbef-a613-423d-bfc9-f7300727df36" width="500">
<img src="https://github.com/user-attachments/assets/def7246e-be5e-4d24-ab24-2ed34efa75aa" width="500"> -->
![PiSugar and Active Cooler](https://github.com/user-attachments/assets/495dbbef-a613-423d-bfc9-f7300727df36)
![PiSugar and Active Cooler](https://github.com/user-attachments/assets/def7246e-be5e-4d24-ab24-2ed34efa75aa)

### 3. Why can't the PiSugar 3 fully charge and the green LED keeps flashing in a loop？

This is due to the firmware design of PiSugar 3. The green LED is currently unable to indicate a fully charged state, so it will keep flashing in a loop as long as an external power source is connected. We will optimize this issue in future firmware updates.

### 4. Why does the PiSugar 3's blue LED remain on (unable to shut down) after I use the shutdown command to turn off the Raspberry Pi?

For soft shutdown scenarios, the software needs to notify PiSugar 3 (Plus) to shut down. Therefore, you should check the following:

* Use the command `i2cdetect -y 1` to check if the hardware is communicating properly with the Raspberry Pi. If the corresponding device address is not displayed, refer to issue 1 for troubleshooting.
* Install `pisugar-power-manager`, select the model PiSugar 3, and ensure it runs properly (displays battery information).
* Try the shutdown command again and observe whether PiSugar 3 shuts down correctly.





