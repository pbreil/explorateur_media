package com.example.mediaback.football.controller;

import com.example.mediaback.football.dto.TeamDto;
import com.example.mediaback.football.service.FootballService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/football")
@CrossOrigin(origins = "*")
public class FootballController {

    private static final Logger logger = LoggerFactory.getLogger(FootballController.class);

    private final FootballService footballService;

    public FootballController(FootballService footballService) {
        this.footballService = footballService;
    }

    @GetMapping("/classement")
    public ResponseEntity<List<TeamDto>> getClassement() {
        logger.info("GET /api/football/classement - Getting standings");
        List<TeamDto> standings = footballService.getStandings();
        return ResponseEntity.ok(standings);
    }

    @PostMapping("/classement/refresh")
    public ResponseEntity<List<TeamDto>> refreshClassement() {
        logger.info("POST /api/football/classement/refresh - Refreshing standings from API");
        List<TeamDto> standings = footballService.refreshStandings();
        return ResponseEntity.ok(standings);
    }
}
