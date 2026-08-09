package com.example.server.controller;

import com.example.server.model.Testimonial;
import com.example.server.service.TestimonialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {

    private final TestimonialService testimonialService;

    public TestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @GetMapping
    public ResponseEntity<List<Testimonial>> getAllTestimonials() {
        return ResponseEntity.ok(testimonialService.getAllTestimonials());
    }

    @PostMapping
    public ResponseEntity<Testimonial> createTestimonial(@RequestBody Testimonial testimonial) {
        return ResponseEntity.ok(testimonialService.saveTestimonial(testimonial));
    }
}
