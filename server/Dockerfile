# Stage 1: Build the application using Maven and OpenJDK 21
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
COPY src src

# Package the application JAR without running tests
RUN ./mvnw clean package -DskipTests

# Stage 2: Minimal Runtime Environment
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy compiled JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose server port
EXPOSE 8080

# Configure environment variables
ENV MONGODB_URI=""
ENV PORT=8080

# Launch Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
