package com.example.server.repository;

import com.example.server.model.Testimonial;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestimonialRepository extends MongoRepository<Testimonial, String> {
}
