FROM openjdk:8-jdk-alpine
EXPOSE 5005
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} /opt/cadferias.jar
ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar /opt/cadferias.jar"]