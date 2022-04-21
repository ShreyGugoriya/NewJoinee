package com.example.Backendnjospring.Repositories;

import com.example.Backendnjospring.Entities.Department;
import com.example.Backendnjospring.Entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {

    @Query(value = "SELECT * FROM department dep where dep.department_name LIKE %?1%"
            +"  OR dep.department_id  LIKE %?1% "
            +"  OR dep.department_desc LIKE %?1%"



            ,nativeQuery = true
    )
    public List<Department> search(String keyword);
}
