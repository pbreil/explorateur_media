package com.example.mediaback.football.service;

import com.example.mediaback.football.dto.TeamDto;
import com.example.mediaback.football.model.Team;
import com.example.mediaback.football.repository.TeamRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FootballService {

    private static final Logger logger = LoggerFactory.getLogger(FootballService.class);

    private final TeamRepository teamRepository;
    private final FootballApiService footballApiService;

    public FootballService(TeamRepository teamRepository, FootballApiService footballApiService) {
        this.teamRepository = teamRepository;
        this.footballApiService = footballApiService;
    }

    public List<TeamDto> getStandings() {
        logger.info("Getting standings from database");
        List<Team> teams = teamRepository.findAllByOrderByPositionAsc();
        return teams.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<TeamDto> refreshStandings() {
        logger.info("Refreshing standings from API");

        List<Team> newStandings = footballApiService.fetchLigue1Standings();

        logger.info("Clearing old standings");
        teamRepository.deleteAll();

        logger.info("Saving {} teams to database", newStandings.size());
        newStandings.forEach(team -> team.setLastUpdate(LocalDateTime.now()));
        List<Team> savedTeams = teamRepository.saveAll(newStandings);

        logger.info("Standings refreshed successfully");
        return savedTeams.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private TeamDto convertToDto(Team team) {
        TeamDto dto = new TeamDto();
        dto.setId(team.getId());
        dto.setPosition(team.getPosition());
        dto.setName(team.getName());
        dto.setTeamId(team.getTeamId());
        dto.setLogo(team.getLogo());
        dto.setPlayed(team.getPlayed());
        dto.setWon(team.getWon());
        dto.setDraw(team.getDraw());
        dto.setLost(team.getLost());
        dto.setGoalsFor(team.getGoalsFor());
        dto.setGoalsAgainst(team.getGoalsAgainst());
        dto.setGoalDifference(team.getGoalDifference());
        dto.setPoints(team.getPoints());
        dto.setForm(team.getForm());
        return dto;
    }
}
