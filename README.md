# Cursor Linux Packages

🎯 **Automated DEB and RPM packages for Cursor AI Editor**

This repository automatically converts Cursor's AppImage releases into DEB and RPM packages for easier installation on Linux distributions.

## 🚀 Quick Install

### Debian/Ubuntu (.deb)

```bash
# Download and install latest version
wget $(curl -s https://api.github.com/repos/PaperBoardOfficial/cursor-linux-packages/releases/latest | grep browser_download_url | grep '\.deb' | cut -d '"' -f 4)
sudo dpkg -i cursor_*.deb
sudo apt-get install -f  # Fix any missing dependencies
```

### RHEL/Fedora/CentOS (.rpm)

```bash
# Download and install latest version
wget $(curl -s https://api.github.com/repos/PaperBoardOfficial/cursor-linux-packages/releases/latest | grep browser_download_url | grep '\.rpm' | cut -d '"' -f 4)
sudo rpm -i cursor-*.rpm
# or with dnf
sudo dnf install cursor-*.rpm
```

## 📦 Available Packages

- **DEB Package**: Compatible with Debian, Ubuntu, and derivatives
- **RPM Package**: Compatible with RHEL, Fedora, CentOS, and derivatives
- **Architecture**: x86_64 (amd64) only

## 🔄 Automation

- **Daily Checks**: GitHub Actions runs daily at 2 AM UTC
- **Version Detection**: Automatically detects new Cursor releases
- **Package Generation**: Creates both DEB and RPM packages
- **Release Publishing**: Publishes packages to GitHub Releases

## 🌐 Web Interface

Visit our [web interface](https://cursor-linux-packages.vercel.app) to browse and download packages easily.

## 📋 Package Details

### Dependencies

- **DEB**: libgtk-3-0, libnotify4, libnss3, libxss1, libxtst6, xdg-utils, libatspi2.0-0, libuuid1, libsecret-1-0
- **RPM**: gtk3, libnotify, nss, libXScrnSaver, libXtst, xdg-utils, at-spi2-atk, libuuid, libsecret

### Installation Location

- **Binaries**: `/opt/Cursor/`
- **Desktop Entry**: `/usr/share/applications/cursor.desktop`
- **Command Line**: `/usr/bin/cursor`

## 🛠️ Usage

After installation:

- Launch from Applications menu
- Run from terminal: `cursor`
- Open files: `cursor /path/to/file`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is for packaging purposes only. Cursor itself is proprietary software owned by Anysphere Inc.

## ⚠️ Disclaimer

This is an unofficial packaging project. For official support, please contact [Cursor](https://cursor.so).

## 🐛 Issues

If you encounter issues with these packages, please [open an issue](https://github.com/PaperBoardOfficial/cursor-linux-packages/issues).

## 🔗 Links

- [Cursor Official Website](https://cursor.so)
- [Original AppImage Downloads](https://cursor.so/downloads)
- [Package Web Interface](https://cursor-linux-packages.vercel.app)
