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

---

## Customer Issue Analysis (Based on 300 Support Emails)

*Last updated: 2026-02-01*  
*Data source: Gmail analyzed emails (past 6 months)*

### 📊 Common Issue Ranking

| Rank | Issue Type | Count | Percentage |
|------|-----------|-------|------------|
| 1 | Order Issues | 39 | 13.0% |
| 2 | Whisplay Related | 19 | 6.3% |
| 3 | Shipping & Delivery | 18 | 6.0% |
| 4 | Battery/Power | 9 | 3.0% |
| 5 | RTC Time | 3 | 1.0% |

### 💬 Common Solutions

#### Whisplay Screen/Audio Issues

**Symptoms**: No display, audio noise, not working

**Solutions**:
```bash
# Check I2C communication
sudo i2cdetect -y 1

# Reinstall driver
sudo apt update
sudo apt install pisugar-whisplay-driver
```

#### I2C Communication Issues

**Symptoms**: `sudo i2cdetect -y 1` shows no devices

**Diagnosis**:
- All `--`: Hardware connection issue
- Shows `57` and `68`: Hardware OK, software issue

**Solutions**:
1. Clean GPIO pins with eraser
2. Clean pogo pins with alcohol swabs
3. Ensure screws are evenly tightened
4. Check pogo pins are not bent

#### RTC Time Issues

**Symptoms**: Time not saved, resets on every boot

**Solutions**:
```bash
# Enable I2C
sudo raspi-config  # Interfacing Options → I2C → Enable

# Check I2C address (should show 68)
sudo i2cdetect -y 1

# Enable RTC driver
sudo raspi-config  # Advanced Options → RTC → Yes

# Sync time
sudo hwclock -w    # System → RTC
sudo hwclock -s    # RTC → System
```

#### Battery/Power Issues

**Symptoms**: Cannot charge, short battery life

**Solutions**:
1. Use charger with 5V/2A or higher
2. **Shutdown charging**:
   - PiSugar 1: Not supported
   - PiSugar S/2/3: Supported

### 🔧 Quick Command Reference

| Command | Purpose |
|---------|---------|
| `sudo i2cdetect -y 1` | Check I2C devices |
| `sudo raspi-config` | Configure Raspberry Pi |
| `sudo hwclock -r` | Read RTC time |
| `sudo systemctl status pisugar` | Check service status |
| `sudo systemctl restart pisugar` | Restart service |

### 📞 Official Resources

- 📖 Docs: https://docs.pisugar.com
- 💻 GitHub: https://github.com/PiSugar
- 🛒 Shop: https://www.pisugar.com
- 📧 Support: support@pisugar.com

---

*This analysis is based on actual customer email data*
