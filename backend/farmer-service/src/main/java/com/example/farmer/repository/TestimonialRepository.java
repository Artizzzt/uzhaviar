package com.example.farmer.repository;

import com.example.farmer.model.Testimonial;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestimonialRepository extends MongoRepository<Testimonial, String> {
}
