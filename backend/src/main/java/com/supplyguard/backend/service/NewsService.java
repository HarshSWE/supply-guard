package com.supplyguard.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import java.util.Map;

@Service
public class NewsService {
    
    @Value("${news.api.key}")
    private String apiKey;
    
    private final RestTemplate restTemplate = new RestTemplate();
    
    public Map<String, Object> getSupplierNews(String supplierName) {
        String url = String.format(
            "https://newsapi.org/v2/everything?q=%s&sortBy=publishedAt&pageSize=5&apiKey=%s",
            supplierName.replace(" ", "+"),
            apiKey
        );
        
        return restTemplate.getForObject(url, Map.class);
    }
}