package com.example.server.repository;

import com.example.server.model.Faq;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FaqRepository extends MongoRepository<Faq, String> {
}
