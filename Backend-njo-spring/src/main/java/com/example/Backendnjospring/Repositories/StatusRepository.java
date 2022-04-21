package com.example.Backendnjospring.Repositories;

import com.example.Backendnjospring.Entities.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StatusRepository extends JpaRepository<Status, Integer> {

    @Query(value = "Select * from status where status.employee_employee_id = ?1",nativeQuery = true)
    public Status getByEmployeeId(int id);

}
