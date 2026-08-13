package com.example.farmer.repository;

import com.example.farmer.model.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestimonialRepository extends JpaRepository<Testimonial, String> {
}
