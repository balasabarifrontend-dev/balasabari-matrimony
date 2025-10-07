package com.matrimony.repository;

import com.matrimony.model.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {
    List<Plan> findByActiveTrueOrderByDisplayOrderAsc();
    List<Plan> findAllByOrderByDisplayOrderAsc();
}