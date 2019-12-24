#### Stage 1: Build the application
FROM 172.42.42.200:18082/maven:3.6.3-jdk-8-slim as build

LABEL César Magalhães <ceanma@gmail.com>

RUN rm /usr/share/maven/conf/settings.xml
COPY settings.xml /usr/share/maven/conf/

# Set the current working directory inside the image
WORKDIR /app

# Copy the pom.xml file
COPY pom.xml .

# Build all the dependencies in preparation to go offline. 
# This is a separate step so the dependencies will be cached unless the pom.xml file has changed.
RUN mvn dependency:go-offline -B

# Copy the project source
COPY src src

# Arguments
ARG ORIGIN_URL
ENV ORIGIN_URL=${ORIGIN_URL}

ARG SPRING_PROFILES_ACTIVE
ENV SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE}

# Package the application
RUN mvn package -P${SPRING_PROFILES_ACTIVE} -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

#### Stage 2: A minimal docker image with command to run the app 
FROM 172.42.42.200:18082/openjdk:8-jre-alpine

LABEL César Magalhães <ceanma@gmail.com>

EXPOSE 5005
ARG DEPENDENCY=/app/target/dependency

# Copy project dependencies from the build stage
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

ENTRYPOINT ["java","-agentlib:jdwp=transport=dt_socket,address=5005,server=y,suspend=n","-cp","app:app/lib/*","br.com.cams7.cadferias.App"]