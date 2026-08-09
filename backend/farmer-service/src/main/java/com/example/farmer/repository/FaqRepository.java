package com.example.farmer.repository;

import com.example.farmer.model.Faq;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FaqRepository extends MongoRepository<Faq, String> {
}
