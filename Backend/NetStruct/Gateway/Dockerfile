FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE
COPY ${JAR_FILE} app.jar

EXPOSE 8011

ENTRYPOINT ["java","-jar","/app.jar"]