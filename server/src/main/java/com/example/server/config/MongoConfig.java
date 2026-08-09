package com.example.server.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "com.example.server.repository")
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Value("${spring.data.mongodb.uri:mongodb+srv://mahasanjit08_db_user:cKxmGy4BTj7ipzki@cluster0.im8ma4u.mongodb.net/project_h?retryWrites=true&w=majority&appName=Cluster0}")
    private String mongoUri;

    @Override
    protected String getDatabaseName() {
        return "project_h";
    }

    @Override
    @Bean
    public MongoClient mongoClient() {
        return MongoClients.create(mongoUri);
    }

    @Bean
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoClient(), getDatabaseName());
    }
}
