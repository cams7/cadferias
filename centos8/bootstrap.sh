#!/bin/bash

# Update hosts file
echo "[TASK 1] Update /etc/hosts file"
cat >>/etc/hosts<<EOF
172.42.42.200 cams7.com.br cams7
EOF

# Install docker from Docker-ce repository
echo "[TASK 2] Install docker container engine"
#dnf upgrade -y --nobest
dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo
#dnf repolist -v
#dnf list docker-ce --showduplicates | sort -r
dnf -y  install docker-ce --nobest

# Enable docker service
echo "[TASK 3] Enable and start docker service"
systemctl enable --now docker
#systemctl status  docker
usermod -aG docker vagrant
#id $USER
newgrp docker
#docker version

#Install Docker Compose
echo "[TASK 4] Install Docker Compose"
curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Disable SELinux
echo "[TASK 5] Disable SELinux"
setenforce 0
sed -i --follow-symlinks 's/^SELINUX=enforcing/SELINUX=disabled/' /etc/sysconfig/selinux

# Stop and disable firewalld
echo "[TASK 6] Stop and Disable firewalld"
systemctl disable firewalld >/dev/null 2>&1
systemctl stop firewalld

# Disable swap
echo "[TASK 7] Disable and turn off SWAP"
sed -i '/swap/d' /etc/fstab
swapoff -a

# Enable ssh password authentication
echo "[TASK 8] Enable ssh password authentication"
sed -i 's/^PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config
systemctl reload sshd

# Set Root password
echo "[TASK 9] Set root password"
echo "vagrant" | passwd --stdin root >/dev/null 2>&1

# Update vagrant user's bashrc file
echo "export TERM=xterm" >> /etc/bashrc
