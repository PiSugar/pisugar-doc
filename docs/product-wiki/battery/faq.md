---
sidebar_position: 10
---

# FAQ

### 1. Why PiSugar is not able to power Raspberry Pi? Why PiSugar 2/3 cannot be detected on I2C bus?

The common cause of this issue is residual solder mask on the bottom of the Raspberry Pi's GPIO pins. The contact issue with the pogo pins may also cause data communication errors between PiSugar and the Raspberry Pi.

You can gently scrape the solder points with a plastic tool to ensure a clean connection for the pogo pins. Or using alcohol wipe to clean the bottom of the pins. After that, try reinstalling the PiSugar on the bottom of the Raspberry Pi.

:::info
If you are capable of soldering, you can also add solder to the GPIO pins on the bottom of the pins to ensure a better connection.
:::

<!-- <img src="https://github.com/user-attachments/assets/d23c22bb-ca92-4b91-8f3b-75fd98985892" width="500"> -->

![PiSugar Installation](https://github.com/user-attachments/assets/d23c22bb-ca92-4b91-8f3b-75fd98985892)

<video width="600" controls>
  <source src="https://doc-resourses.pisugar.uk/clean_pins.mp4" type="video/mp4"></source>
</video>

:::warning
Be careful not to damage the pcb or other components when scraping the solder points.
Make sure the Raspberry Pi is powered off before performing the above operations to avoid short circuits.
:::

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

- Use the command `i2cdetect -y 1` to check if the hardware is communicating properly with the Raspberry Pi. If the corresponding device address is not displayed, refer to issue 1 for troubleshooting.
- Install `pisugar-power-manager`, select the model PiSugar 3, and ensure it runs properly (displays battery information).
- Try the shutdown command again and observe whether PiSugar 3 shuts down correctly.

### 5. Why is my Whisplay screen not working?

First, check I2C communication:

```bash
sudo i2cdetect -y 1
```

If you see addresses `57` and `68`, the hardware is working. Try reinstalling the driver:

```bash
sudo apt update
sudo apt install pisugar-whisplay-driver
```

If no devices are detected, refer to issue 1 for GPIO cleaning instructions.

### 6. Why is there audio noise from Whisplay?

Audio noise is usually caused by I2C communication issues or power supply problems. Try:

1. Ensure stable power supply (5V/2A or higher)
2. Check I2C connection with `sudo i2cdetect -y 1`
3. Reinstall the Whisplay driver
4. Test on a different Raspberry Pi

### 7. How to fix RTC time not being saved?

RTC requires I2C communication. Follow these steps:

1. Enable I2C: `sudo raspi-config` → Interfacing Options → I2C → Enable
2. Check I2C address (should show 68): `sudo i2cdetect -y 1`
3. Enable RTC driver: `sudo raspi-config` → Advanced Options → RTC → Yes
4. Sync time:
   - System to RTC: `sudo hwclock -w`
   - RTC to system: `sudo hwclock -s`

### 8. Can PiSugar charge while powered off?

- **PiSugar 1**: No, charging only works when powered on
- **PiSugar S/2/3**: Yes, supports charging while powered off

For PiSugar 3, use the Power Manager app to enable shutdown charging if needed.

### 9. How to check battery status?

Install the Power Manager app and select your PiSugar model:

```bash
sudo apt install pisugar-power-manager
```

The app will display battery percentage, voltage, and charging status.

### 10. What power supply should I use?

Use a quality power supply with at least **5V/2A**. For best results:

- PiSugar 1: 5V/1.5A minimum
- PiSugar S/2/3: 5V/2A recommended
- PiSugar 3 Plus: 5V/2.5A for fast charging

:::warning
Low-quality power supplies may cause instability, charging issues, or data corruption.
:::

### 11. Is PiSugar compatible with my Raspberry Pi?

**PiSugar 1**: Raspberry Pi Zero / Zero2 (WH)

**PiSugar S / 2 / 3**: Raspberry Pi Zero / Zero2 / 3A / 3B / 3B+ / 4B / 5

| Model | Pi 1/Zero | Pi 3/4 | Pi 5 |
|-------|-----------|--------|------|
| PiSugar 1 | ✅ | ❌ | ❌ |
| PiSugar S | ✅ | ✅ | ❌ |
| PiSugar 2 | ✅ | ✅ | ❌ |
| PiSugar 3 | ✅ | ✅ | ✅ |

### 12. Is Whisplay compatible with my PiSugar?

**Whisplay compatibility:**

| PiSugar Model | Compatible | Notes |
|---------------|------------|-------|
| PiSugar 2 / 2 Plus | ✅ Yes | Full compatibility |
| PiSugar 3 / 3 Plus | ✅ Yes | Full compatibility |
| PiSugar S / S Plus | ⚠️ Partial | Must turn OFF auto startup switch |

Whisplay HAT works with PiSugar 2 and 3 series (including Plus models). For PiSugar S series (including Plus), you must turn OFF the auto startup switch on the board to use Whisplay.

### 13. Does PiSugar get hot during use?

PiSugar may feel warm during charging or high-load operation. This is normal behavior. However, if the device becomes excessively hot to the touch:

1. Disconnect external power and remove PiSugar
2. Allow it to cool down for 15-30 minutes
3. Check for physical damage or swelling
4. Try a different power supply (5V/2A or higher)
5. If problem persists, contact support

:::warning
Do not use PiSugar if the battery appears swollen or damaged.
:::

### 13. What should I do if my PiSugar is defective or not working?

If your PiSugar product is defective or not working:

1. **Check our troubleshooting guide** above - most issues can be resolved
2. **Contact support** with:
   - Order number
   - Description of the problem
   - Photos/videos if applicable
3. **Warranty coverage**: 6-month warranty for manufacturing defects
4. **Refund/Return**: Contact us for return authorization

Contact: support@pisugar.com

### 14. What is the return and refund policy?

- **Return period**: Contact us for return authorization
- **Condition**: Product must be unused and in original packaging
- **Warranty**: 6 months for manufacturing defects
- **Refund process**: 5-7 business days after we receive the returned item
- **Contact**: support@pisugar.com for return authorization

:::info
For international orders, return shipping costs are the customer's responsibility.
:::
