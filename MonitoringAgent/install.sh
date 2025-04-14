#!/bin/sh

# run as root
if [[ $EUID -eq 0 ]]; then
  echo " + Script is running as root."
else
  echo " - Error: This script must be run as root!"
  exit -1
fi

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# install dependencies
echo " + Installing Build Dependencies..."
dnf install gcc libcurl-devel bpftool libbpf-devel -y 

# build 
echo " + Building..."
(cd $SCRIPT_DIR/src && make)

# install
echo " + Installing..."
cp $SCRIPT_DIR/src/monitoringAgent /usr/bin/monitoringAgent
chmod 700 /usr/bin/monitoringAgent

# add service
cp $SCRIPT_DIR/monitoringAgent.service /etc/systemd/system/

# enable service
echo " + Starting Service..."
systemctl enable monitoringAgent
systemctl start monitoringAgent

echo " + Done!"
