package com.example.Backendnjospring.Repositories;

import com.example.Backendnjospring.Entities.Department;
import com.example.Backendnjospring.Entities.DepartmentCount;
import com.example.Backendnjospring.Entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DepartmentCountRepository extends JpaRepository<DepartmentCount, Integer> {

        @Query(value = "Select e.department_id, count(*) as count ,d.department_name from employee e inner join department d on d.department_id = e.department_id group by e.department_id ",nativeQuery = true)
        List<DepartmentCount> getAll();

}
