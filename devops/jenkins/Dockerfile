FROM jenkins/jenkins:2.210

MAINTAINER ceanma@gmail.com
LABEL César Magalhães <ceanma@gmail.com>

# install docker, docker-compose, docker-machine
# see: https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/
# see: https://docs.docker.com/engine/installation/linux/linux-postinstall/
# see: https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/

USER root

# prerequisites for docker
RUN apt update
RUN apt -y install apt-transport-https ca-certificates curl gnupg2 software-properties-common

# docker repos
RUN curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg > /tmp/dkey; apt-key add /tmp/dkey
RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") $(lsb_release -cs) stable"
RUN apt update

# docker
RUN apt -y install docker-ce

# give jenkins docker rights
RUN usermod -aG docker jenkins

# docker-compose
RUN curl -L https://github.com/docker/compose/releases/download/1.16.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose

RUN rm -f /etc/docker/daemon.json
COPY daemon.json /etc/docker/

USER jenkins