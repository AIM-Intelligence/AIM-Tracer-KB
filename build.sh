#!/bin/bash
set -e
sudo yum update -y
sudo yum install -y yum-utils curl git
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce-26.1.3 docker-ce-cli-26.1.3 containerd.io
sudo systemctl enable --now docker
sudo usermod -aG docker ec2-user
docker-compose -f docker-compose.build.yml up --build -d