package com.example.mediaback.football.service;

import com.example.mediaback.football.model.Team;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class FootballApiService {

    private static final Logger logger = LoggerFactory.getLogger(FootballApiService.class);
    private final WebClient webClient;

    public FootballApiService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public List<Team> fetchLigue1Standings() {
        logger.info("Fetching Ligue 1 standings from API");

        // Pour l'instant, on utilise des données mockées
        // Dans une vraie implémentation, on appellerait une API comme api-football.com
        // avec une clé API stockée dans les variables d'environnement

        return getMockedStandings();
    }

    private List<Team> getMockedStandings() {
        List<Team> teams = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

        teams.add(createTeam(1, "Paris Saint-Germain", 101, 10, 8, 1, 1, 33, 10, 25, "https://media.api-sports.io/football/teams/85.png", "WWWDW"));
        teams.add(createTeam(2, "AS Monaco", 102, 10, 7, 2, 1, 21, 10, 23, "https://media.api-sports.io/football/teams/91.png", "WWLWW"));
        teams.add(createTeam(3, "Olympique Marseille", 103, 10, 6, 3, 1, 24, 12, 21, "https://media.api-sports.io/football/teams/81.png", "DWWWL"));
        teams.add(createTeam(4, "LOSC Lille", 104, 10, 5, 4, 1, 18, 11, 19, "https://media.api-sports.io/football/teams/79.png", "WDWDW"));
        teams.add(createTeam(5, "OGC Nice", 105, 10, 5, 3, 2, 20, 13, 18, "https://media.api-sports.io/football/teams/82.png", "LWWDW"));
        teams.add(createTeam(6, "RC Lens", 106, 10, 4, 5, 1, 14, 11, 17, "https://media.api-sports.io/football/teams/116.png", "DDWDW"));
        teams.add(createTeam(7, "Olympique Lyonnais", 107, 10, 5, 2, 3, 19, 15, 17, "https://media.api-sports.io/football/teams/80.png", "WLDWW"));
        teams.add(createTeam(8, "Stade de Reims", 108, 10, 4, 3, 3, 16, 14, 15, "https://media.api-sports.io/football/teams/547.png", "LWDWD"));
        teams.add(createTeam(9, "RC Strasbourg", 109, 10, 3, 5, 2, 17, 16, 14, "https://media.api-sports.io/football/teams/511.png", "DDDLW"));
        teams.add(createTeam(10, "Stade Brestois", 110, 10, 4, 2, 4, 13, 16, 14, "https://media.api-sports.io/football/teams/512.png", "WLDLW"));
        teams.add(createTeam(11, "Stade Rennais", 111, 10, 3, 4, 3, 14, 13, 13, "https://media.api-sports.io/football/teams/94.png", "DDLWD"));
        teams.add(createTeam(12, "FC Nantes", 112, 10, 3, 3, 4, 12, 14, 12, "https://media.api-sports.io/football/teams/83.png", "LWDDL"));
        teams.add(createTeam(13, "Toulouse FC", 113, 10, 3, 3, 4, 11, 14, 12, "https://media.api-sports.io/football/teams/96.png", "WLDLL"));
        teams.add(createTeam(14, "Montpellier HSC", 114, 10, 3, 2, 5, 13, 18, 11, "https://media.api-sports.io/football/teams/78.png", "LLWLW"));
        teams.add(createTeam(15, "AJ Auxerre", 115, 10, 2, 3, 5, 10, 17, 9, "https://media.api-sports.io/football/teams/93.png", "LDDLL"));
        teams.add(createTeam(16, "Angers SCO", 116, 10, 2, 2, 6, 9, 19, 8, "https://media.api-sports.io/football/teams/71.png", "LLLWD"));
        teams.add(createTeam(17, "Le Havre AC", 117, 10, 2, 1, 7, 8, 20, 7, "https://media.api-sports.io/football/teams/84.png", "WLLLL"));
        teams.add(createTeam(18, "AS Saint-Étienne", 118, 10, 1, 2, 7, 7, 24, 5, "https://media.api-sports.io/football/teams/1063.png", "LLLDL"));

        teams.forEach(team -> team.setLastUpdate(now));

        return teams;
    }

    private Team createTeam(int position, String name, int teamId, int played, int won, int draw, int lost,
                           int goalsFor, int goalsAgainst, int points, String logo, String form) {
        Team team = new Team();
        team.setPosition(position);
        team.setName(name);
        team.setTeamId(teamId);
        team.setPlayed(played);
        team.setWon(won);
        team.setDraw(draw);
        team.setLost(lost);
        team.setGoalsFor(goalsFor);
        team.setGoalsAgainst(goalsAgainst);
        team.setGoalDifference(goalsFor - goalsAgainst);
        team.setPoints(points);
        team.setLogo(logo);
        team.setForm(form);
        return team;
    }
}
