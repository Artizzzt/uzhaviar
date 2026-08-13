package com.example.farmer.repository;

import com.example.farmer.model.Faq;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FaqRepository extends JpaRepository<Faq, String> {
}
