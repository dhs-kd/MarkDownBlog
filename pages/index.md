
# installation and setup 

the usual stuff from downlaoding fedora iso and flashing it to the disk .
first important thing is to boot into **basic graphic mode**  from **troubleshoot** options .
Go through the installation process nothing there except if you want to to dualboot with windows.  check the checkbox **Keep other partions(or something samilir)** .
**after reboot** : 
Ensure that third party repositories are enabled, so that the proprietary NVIDIA drivers can be installed (covered later in this guide).

# [Fedora Setup guide Asus](https://asus-linux.org/wiki/fedora-guide/#setup)
---
### Backup Propietary eSupport Drivers Folder

Stock installations of Windows on ASUS laptops include propietary drivers that cannot be sourced directly from the ASUS website or the MyASUS utility. Before removing the Windows partition or recovery partition these drivers should be backed up. If you ever decide to dual boot or run Windows in a VM, you will need a copy of the drivers for your specific model.

The folders can be found in `C:\eSupport`

Make sure to backup this folder before performing any destructive operations on your Windows partition!

### [🔗](https://asus-linux.org/wiki/fedora-guide/#disable-secure-boot)Disable Secure Boot

**IMPOARTANT FOR DUAL BOOT USER!!! DISABLE WINDOWS BITLOCKER BEFORE DOING THIS! OR YOUR DATA WILL BE GONE FOREVER!**

To make sure Nvidia drivers and the necessary support modules work without issues, Secure Boot must be disabled in the UEFI.

1. Press DEL repeatedly during boot to enter UEFI setup screen
2. Press F7 for advanced mode
3. Security → Secure Boot Control → Disable
4. Save and exit

This move won't brick your laptop, the only risk here is your data in Windows if you didn't disable Bitlocker before doing this.

### [🔗](https://asus-linux.org/wiki/fedora-guide/#use-the-laptop-screen)Use the Laptop Screen

Due to display signal routing on Asus ROG laptops, and the setup process dealing with multiple graphics devices, having external screens connected during setup may result in unpredictable behavior. Please follow this guide with all external displays disconnected.



## Install nivida

```bash
sudo dnf update -y
```

If you didn't enable third-party repositories during the initial install wizard, you can use the following command to enable the RPM Fusion repositories required to install the Nvidia drivers:
```bash
sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```


```bash
sudo dnf update -y
sudo dnf install kernel-devel
sudo dnf install akmod-nvidia xorg-x11-drv-nvidia-cuda
```

_**IMPORTANT:**_ Please remember to wait after the RPM transaction ends, until the kmod get built. This can take up to 5 minutes on some systems.

```bash
sudo systemctl enable nvidia-hibernate.service nvidia-suspend.service nvidia-resume.service nvidia-powerd.service
```


### Install asusctl and supergfxctl

```bash
sudo dnf copr enable lukenukem/asus-linux
sudo dnf update
```

```bash
sudo dnf install asusctl supergfxctl
sudo dnf update --refresh
sudo systemctl enable supergfxd.service

sudo dnf install asusctl-rog-gui #optional gui 
```
you may need to systemctl enable asusd service.

## [Better Sound](https://asus-linux.org/blog/updates-2022-08-27/)

You can try the new profiles here: https://github.com/sammilucia/asus-jamesdsp

```bash 
dnf copr enable arrobbins/JDSP4Linux
dnf update
dnf install jamesdsp
```
Copy the files to your `~./config/jamesdsp` folder. This should already exist after you've run JamesDSP for Linux the first time.
**ReBoot**.

### OR

```bash
mv ~/.config/jamesdsp ~/.config/jamesdsp.bak # make a backup optional
mkdir ~/.config/jamesdsp
git clone https://github.com/sammilucia/asus-jamesdsp
cp -r ./asus-jamesdsp/jamesdsp/* ~/.config/jamesdsp
rm -rf asus-jamesdsp
```

## Better Video PlayBack In firefox

In the `about:config` tab 
```
media.ffmpeg.vaapi.enabled = true # use the ffmpeg library from the system 
media.ffvpx.enabled  = false      # disable the built in one 
apz.gtk.kinetic_scroll.enabled = false # for slower scrolling
```

## Setup Fonts
add a better font for arabic langunge 
Create a file named font.conf in ~/.config/fontconfig/ 

Increase the font size in gnome **tweaks** and choose the **greyscale antialsing**

### flatpak apps 
Expose the file to flatpak applicatins in the terminal or install **FlatSeal**. 
`xdg-config/fontconfig:ro`


# Increase the Quality of life 

Install `btop , bat , mpv , geary and kalker`.
flatpak install `black box` .
install blur my shell exentsion and add the blackbox applcation. 
install vscodium from the repo (add the repo to dnf `/etc/yum.repos.d/vscoduim.repo`) 

```text
[gitlab.com_paulcarroty_vscodium_repo]
name=gitlab.com_paulcarroty_vscodium_repo
baseurl=https://paulcarroty.gitlab.io/vscodium-deb-rpm-repo/rpm/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://gitlab.com/paulcarroty/vscodium-deb-rpm-repo/raw/master/pub.gpg
metadata_expire=1h
```


install `obs studio` and `droidcams`
- do `dnf copr enable zetorian/v4l2loopback`
- Install the v4l2loopback package. It will pull the v4l2loopback-dkms package, which contains the necessary files to build the kernel module, which should happen automatically during installation. Then run `modprobe v4l2loopback` if you want to start using it straight away. You can run `v4l2-ctl --all` to check that the loopback devices have been properly created, and `v4l2loopback-ctl` to manage their settings.

This will enable the virtual camera in obs and enable [DroidCam](https://www.dev47apps.com/droidcam/linux/) to work.

Install tweaks and exentions to install gfxctl extension .
https://extensions.gnome.org/extension/5344/supergfxctl-gex/
install the `awesome tiles` and `vitals` extension

### Minecraft and NVidia 
use `switcherooctl` to use the Nvidia gpu to run minecraft while other applations can simply use it in the launcher right click menu
```
switcherooctl launch -g 1 ~/Applications/TLauncher-2.885/TLauncher-2.885.jar 
```
or whatever path you have specified.

## BUGs 

Sometimes Libraries wont be installed the right way 
just remove it and install it again for example. `libappindiactor and libdbbusmenu` as these libraries are not included by default in Fedora .


