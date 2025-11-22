package com.example.mediaback.football.config;

import com.example.mediaback.football.service.FootballService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataLoader.class);

    private final FootballService footballService;

    public DataLoader(FootballService footballService) {
        this.footballService = footballService;
    }

    @Override
    public void run(String... args) {
        logger.info("========================================");
        logger.info("Starting Football Data Initialization");
        logger.info("========================================");

        try {
            logger.info("Loading Ligue 1 standings on startup...");
            footballService.refreshStandings();
            logger.info("Ligue 1 standings loaded successfully!");
        } catch (Exception e) {
            logger.error("Error loading football data on startup", e);
        }

        logger.info("========================================");
        logger.info("Football Data Initialization Complete");
        logger.info("========================================");
    }
}
