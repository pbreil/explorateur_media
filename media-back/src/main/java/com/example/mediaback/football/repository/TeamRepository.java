package com.example.mediaback.football.repository;

import com.example.mediaback.football.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    List<Team> findAllByOrderByPositionAsc();
    Optional<Team> findByTeamId(Integer teamId);
    void deleteAllByTeamIdNotNull();
}
