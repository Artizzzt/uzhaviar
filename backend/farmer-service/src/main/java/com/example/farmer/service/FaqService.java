package com.example.farmer.service;

import com.example.farmer.model.Faq;
import com.example.farmer.repository.FaqRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FaqService {

    private final FaqRepository faqRepository;

    public FaqService(FaqRepository faqRepository) {
        this.faqRepository = faqRepository;
    }

    public List<Faq> getAllFaqs() {
        return faqRepository.findAll();
    }

    public Faq saveFaq(Faq faq) {
        return faqRepository.save(faq);
    }
}
