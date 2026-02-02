---
title: 客户问题 FAQ
description: PiSugar 常见客户问题及解决方案
---

# 客户问题 FAQ

*最后更新: 2026-02-01*  
*数据来源: Gmail 近 6 个月已回复邮件分析（300 封）+ 官方 FAQ*

## 📊 常见问题排名

| 排名 | 问题类型 | 数量 | 占比 |
|------|---------|------|------|
| 1 | 订单问题 | 39 | 13.0% |
| 2 | Whisplay 相关 | 19 | 6.3% |
| 3 | 物流配送 | 18 | 6.0% |
| 4 | 电池电源 | 9 | 3.0% |
| 5 | RTC 时间 | 3 | 1.0% |

## 💬 客户常见问题

### 1️⃣ PiSugar 无法给树莓派供电 / I2C 检测不到

**原因**：树莓派 GPIO 针脚底部的焊锡残留物会导致接触不良。

**解决方案**：
1. 用塑料工具轻轻刮掉焊点，确保 pogo 针接触良好
2. 用酒精棉签清洁针脚底部
3. 重新安装 PiSugar

:::warning
操作前请确保树莓派已断电，避免短路。
:::

**视频教程**：https://doc-resourses.pisugar.uk/clean_pins.mp4

---

### 2️⃣ PiSugar 3 充满电后绿灯一直闪烁

**原因**：PiSugar 3 的固件设计问题，绿灯目前无法指示充满状态。

**说明**：只要外部电源连接，绿灯就会一直闪烁。未来的固件更新会优化这个问题。

---

### 3️⃣ PiSugar 3 蓝灯常亮无法关机

**软关机问题**：软件需要通知 PiSugar 3 关机。

**检查步骤**：
```bash
# 1. 检查 I2C 通讯
sudo i2cdetect -y 1

# 2. 安装电源管理器
sudo apt install pisugar-power-manager

# 3. 选择 PiSugar 3 型号，确保正常运行
```

---

### 4️⃣ I2C 通讯问题

**症状**：`sudo i2cdetect -y 1` 看不到设备

**诊断**：
- 全部显示 `--`：硬件连接问题
- 显示 `57` 和 `68`：硬件正常，软件问题

**解决方案**：
1. 用橡皮擦清理 GPIO 针脚
2. 用酒精棉签清理 pogo 针
3. 确认螺丝均匀拧紧
4. 检查 pogo 针没有弯曲

---

### 5️⃣ Whisplay 屏幕/音频问题

**症状**：屏幕不显示、音频有噪音、无法正常工作

**解决方案**：

```bash
# 1. 确认 I2C 通讯正常
sudo i2cdetect -y 1

# 2. 重新安装驱动
sudo apt update
sudo apt install pisugar-whisplay-driver
```

---

### 6️⃣ RTC 时间问题

**症状**：时间不保存，每次开机重置

**解决方案**：

```bash
# 1. 启用 I2C
sudo raspi-config  # Interfacing Options → I2C → Enable

# 2. 检查 I2C 地址（应该显示 68）
sudo i2cdetect -y 1

# 3. 启用 RTC 驱动
sudo raspi-config  # Advanced Options → RTC → Yes

# 4. 同步时间
sudo hwclock -w    # 系统时间 → RTC
sudo hwclock -s    # RTC → 系统时间
```

---

### 7️⃣ 电池/电源问题

**症状**：无法充电、电池续航短

**解决方案**：
1. 使用 5V/2A 以上充电器
2. **关机充电**：
   - PiSugar 1：不支持关机充电
   - PiSugar S/2/3：支持关机充电

---

### 8️⃣ 与树莓派 5 官方散热器的兼容性

**说明**：官方散热器的安装扣会穿过树莓派 PCB，占用底部空间，可能影响 PiSugar 安装。

**解决方法**：轻轻向外扳开塑料扣的腿，如下图所示：

![PiSugar and Active Cooler](https://github.com/user-attachments/assets/495dbbef-a613-423d-bfc9-f7300727df36)

---

## 🔧 诊断命令速查表

| 命令 | 作用 |
|------|------|
| `sudo i2cdetect -y 1` | 检查 I2C 设备 |
| `sudo raspi-config` | 配置树莓派 |
| `sudo hwclock -r` | 读取 RTC 时间 |
| `sudo systemctl status pisugar` | 检查服务状态 |
| `sudo systemctl restart pisugar` | 重启服务 |
| `sudo apt install pisugar-power-manager` | 安装电源管理器 |

---

## 📞 官方资源

- 📖 文档：https://docs.pisugar.com
- 💻 GitHub：https://github.com/PiSugar
- 🛒 店铺：https://www.pisugar.com
- 📧 邮箱：support@pisugar.com

---

*此 FAQ 基于 300 封客户邮件实际数据分析整理 + 官方 FAQ*
*数据更新时间: 2026-02-02*
