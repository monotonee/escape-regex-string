#!/bin/bash

# Arch Linux Development Environment
# This provisioning is designed for a virtualized development machine. The
# machine not only provides the development environment and services, but also
# the dev tools such as SQL editors and IDEs. Use the following variables to
# specify extra packages to install alongside those of this Vagrantfile's
# minimal configuration. AUR packages specified below will be downloaded into
# the default user's ~/src/abs directory, built, and installed. If AUR
# dependencies require user interaction beyond a simple confirmation of yes or
# no (such as the "java-runtime" virtual package), one may explcitly include
# them here.
extra_pkgs=( geany libxtst nodejs npm ttf-dejavu xorg-xauth )
aur_pkgs=()

# This script is executed on the guest machine via Vagrant's shell provisioner.
# Remember that the Vagrant shell provisioner transfers this file to the guest
# and executes it there as the root user, NOT vagrant. The initial PWD
# is the vagrant user's home directory, however. All commands in this file
# should be idempotent.
default_user='vagrant'
home_dir=/home/${default_user}
src_dir=/vagrant

echo 'TASK: Set timezone'
timedatectl set-timezone UTC

echo 'TASK: Synchronize package databases'
pacman -Syy --noconfirm --quiet

echo 'TASK: Update Arch keyring'
pacman -S archlinux-keyring --noconfirm --quiet

# Upgrade the system.
# Sometimes kernel upgrades require initial ramdisk rebuild to detect devices.
# See: https://www.archlinux.org/news/ca-certificates-utils-20170307-1-upgrade-requires-manual-intervention/
echo 'TASK: Full system upgrade'
pacman -Syuw --noconfirm --quiet
rm /etc/ssl/certs/ca-certificates.crt
pacman -Su --noconfirm --quiet
mkinitcpio -p linux

# Install necessary packages.
# WARNING: This command, in its current form, will reinstall ALL packages if one
# or more of them is not already installed. pacman will return exit status > 0
# if one or more package in query was not found.
# As of 216-03-11, Linux headers are necessary for virtualbox-guest-dkms package
# in order to build kernel modules for VirtualBox guest additions.
# See: https://www.archlinux.org/packages/community/x86_64/virtualbox-guest-dkms/
# This box is designed for X11 forwarding. libxtst is used for squirrel-sql.
echo 'TASK: Installing explicit packages'
packages=( git linux-headers tree ${extra_pkgs[@]} )
pacman -Qiq ${packages[@]} 1> /dev/null || pacman -S ${packages[@]} --noconfirm --quiet --needed

# Configure git
su vagrant -c 'git config --global core.editor nano'

# Enable SSH X11 forwarding.
sed -i 's/#X11Forwarding no/X11Forwarding yes/' /etc/ssh/sshd_config

# Source .profile from .bash_profile.
echo 'TASK: Source .profile from .bash_profile'
source_profile='[[ -f ~/.profile ]] && . ~/.profile'
grep -Fxq "${source_profile}" .bash_profile || echo ${source_profile} >> .bash_profile

# Add alias to .bashrc. .bashrc is always present in current Vagrant base image
# so no need to check its existence.
echo 'TASK: Add bash aliases'
alias_line_la="alias la='LC_COLLATE=C ls -Alh --color --group-directories-first'"
grep -q "${alias_line_la}" .bashrc || \
  sed -i "/alias ls='ls --color=auto'/a ${alias_line_la}" .bashrc

# Change to project directory on any new interactive terminal session.
echo 'TASK: Set PWD to project directory'
cd_cmd="cd ${src_dir}"
grep -Fxq "${cd_cmd}" .bashrc || echo ${cd_cmd} >> .bashrc

# Prepare to download and install AUR packages.
# Example: Import mysql-build@oss.oracle.com PGP key for JDBC driver.
echo 'TASK: Prepare to download AUR packages'

# Download AUR resources. Due to complexity of some manual installs, makepkg
# will not automatically be run. The user will need to install them after login.
# This is naive and brittle. Upgrade this to actual AUR helper tool.
# makepkg output is redirected to /dev/null since download progress cannot
# be silenced and it blasts display with disjointed characters under su.
echo 'TASK: Download AUR packages'
abs_dir=${home_dir}/src/abs
su ${default_user} -c 'mkdir -p '${abs_dir}
cd ${abs_dir}
for pkg in ${aur_pkgs[@]}; do
  if [[ -d ${pkg} ]]; then
    cd ${pkg}
    git pull --quiet origin #| sed 's/^/  /'
  else
    su ${default_user} -c 'git clone https://aur.archlinux.org/'${pkg}'.git'
    cd ${pkg}
  fi
  echo 'Running makepkg silently'
  su ${default_user} -c 'makepkg -crs --noconfirm --noprogressbar --needed > /dev/null 2>&1'
  pacman -U *.pkg.tar.xz --noconfirm --needed
  cd ${abs_dir}
done

# Project-specific tasks
# The daemon.json file was uploaded into machine from host with the Vagrant "file" provisioner.
# See: https://docs.docker.com/engine/reference/commandline/dockerd/#linux-configuration-file
echo 'TASK: Install package dependencies.'
cd ${src_dir}
su ${default_user} -c 'npm install --no-package-lock --no-save'

# Reboot system.
# Actual reboot removed for now since rebooting outside of Vagrant's control
# seems to prevent the working directory from being mounted to the guest's
# /vagrant path.
echo 'MANUAL TASK: Set git user.name and user.email.'
echo 'WARNING: "vagrant reload" may be required to apply software and configuration updates.'
