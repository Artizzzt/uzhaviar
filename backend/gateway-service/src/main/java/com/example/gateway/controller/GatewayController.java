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
        "/api/upload/**",
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

            // Copy request headers (excluding restricted headers that Java HttpClient handles or restricts)
            Enumeration<String> headerNames = request.getHeaderNames();
            while (headerNames.hasMoreElements()) {
                String name = headerNames.nextElement();
                String lowerName = name.toLowerCase();
                if (!lowerName.equals("host") && 
                    !lowerName.equals("content-length") && 
                    !lowerName.equals("connection") && 
                    !lowerName.equals("expect") && 
                    !lowerName.equals("upgrade") && 
                    !lowerName.equals("keep-alive") && 
                    !lowerName.equals("proxy-authenticate") && 
                    !lowerName.equals("proxy-authorization") && 
                    !lowerName.equals("te") && 
                    !lowerName.equals("trailer") && 
                    !lowerName.equals("transfer-encoding") &&
                    !lowerName.equals("origin")) {
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
                String lowerKey = key.toLowerCase();
                // Avoid duplicating CORS headers, hop-by-hop headers, and transfer/content length headers
                if (!lowerKey.equals("access-control-allow-origin") &&
                    !lowerKey.equals("access-control-allow-credentials") &&
                    !lowerKey.equals("access-control-allow-methods") &&
                    !lowerKey.equals("access-control-allow-headers") &&
                    !lowerKey.equals("transfer-encoding") &&
                    !lowerKey.equals("content-length") &&
                    !lowerKey.equals("connection") &&
                    !lowerKey.equals("keep-alive") &&
                    !lowerKey.equals("upgrade")) {
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
