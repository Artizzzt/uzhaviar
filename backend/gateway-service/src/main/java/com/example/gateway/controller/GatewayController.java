package com.example.gateway.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

@RestController
public class GatewayController {

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    @RequestMapping({
        "/api/auth/**",
        "/api/farmers/**",
        "/api/faqs/**",
        "/api/testimonials/**"
    })
    public ResponseEntity<byte[]> routeToFarmerService(HttpServletRequest request) {
        return forwardRequest(request, "http://localhost:8081");
    }

    @RequestMapping({
        "/api/diseases/**",
        "/api/pesticides/**",
        "/uploads/**"
    })
    public ResponseEntity<byte[]> routeToCropDiseaseService(HttpServletRequest request) {
        return forwardRequest(request, "http://localhost:8082");
    }

    @RequestMapping({
        "/api/analytics/**",
        "/api/notifications/**"
    })
    public ResponseEntity<byte[]> routeToAnalyticsService(HttpServletRequest request) {
        return forwardRequest(request, "http://localhost:8083");
    }

    private ResponseEntity<byte[]> forwardRequest(HttpServletRequest request, String targetBaseUrl) {
        try {
            String path = request.getRequestURI();
            String query = request.getQueryString();
            String targetUrl = targetBaseUrl + path + (query != null ? "?" + query : "");

            byte[] bodyBytes = request.getInputStream().readAllBytes();

            HttpRequest.Builder builder = HttpRequest.newBuilder()
                    .uri(URI.create(targetUrl))
                    .method(request.getMethod(), bodyBytes.length > 0 ? HttpRequest.BodyPublishers.ofByteArray(bodyBytes) : HttpRequest.BodyPublishers.noBody());

            // Copy request headers (excluding Host and Content-Length which Java HttpClient sets automatically)
            Enumeration<String> headerNames = request.getHeaderNames();
            while (headerNames.hasMoreElements()) {
                String name = headerNames.nextElement();
                if (!name.equalsIgnoreCase("host") && !name.equalsIgnoreCase("content-length") && !name.equalsIgnoreCase("connection")) {
                    Enumeration<String> values = request.getHeaders(name);
                    while (values.hasMoreElements()) {
                        builder.header(name, values.nextElement());
                    }
                }
            }

            HttpResponse<byte[]> response = httpClient.send(builder.build(), HttpResponse.BodyHandlers.ofByteArray());

            HttpHeaders responseHeaders = new HttpHeaders();
            for (Map.Entry<String, List<String>> entry : response.headers().map().entrySet()) {
                String key = entry.getKey();
                // Avoid duplicating CORS headers since our WebConfig handles it
                if (!key.equalsIgnoreCase("Access-Control-Allow-Origin") &&
                    !key.equalsIgnoreCase("Access-Control-Allow-Credentials") &&
                    !key.equalsIgnoreCase("Access-Control-Allow-Methods") &&
                    !key.equalsIgnoreCase("Access-Control-Allow-Headers")) {
                    for (String value : entry.getValue()) {
                        responseHeaders.add(key, value);
                    }
                }
            }

            return new ResponseEntity<>(response.body(), responseHeaders, HttpStatus.valueOf(response.statusCode()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(("Gateway Error: " + e.getMessage()).getBytes());
        }
    }
}
