package com.example.Backendnjospring.Repositories;

import com.example.Backendnjospring.Entities.Employee;
import com.example.Backendnjospring.ProjectionSchema.ISessionAndDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

//    @Query(value = "SELECT * FROM employee INNER JOIN department WHERE employee.department_id == department.department_id AND employee.emp_name LIKE %?1%"
//            +"OR employee.emp_designation  LIKE %?1% " ,nativeQuery = true
//    )

    @Query(value = "SELECT * FROM employee Left JOIN department ON  employee.department_id = department.department_id where department.department_name LIKE ?1"

            +"  OR employee.designation  LIKE ?1 "
            +"  OR employee.emp_name LIKE ?1"
            +"  OR employee.joining_date LIKE ?1"


            ,nativeQuery = true
         )
    public List<Employee> search(String keyword);

    @Query(value = "SELECT * FROM employee Left JOIN department ON  employee.department_id = department.department_id where department.department_name LIKE %?1%"

            +"  OR employee.designation  LIKE %?1%"
            +"  OR employee.emp_name LIKE %?1%"
            +"  OR employee.joining_date LIKE %?1%"


            ,nativeQuery = true
    )
    public List<Employee> Fuzzysearch(String keyword);

    @Query(value = "SELECT * FROM employee Left JOIN department ON  employee.department_id = department.department_id  order By employee.joining_date ",nativeQuery = true )
    List<Employee> getOrderByJoiningDate();

    @Query(value = "SELECT * FROM employee Left JOIN department ON  employee.department_id = department.department_id  order By employee.emp_name ",nativeQuery = true )
    List<Employee> getOrderByName();
    @Query(value = "SELECT * FROM employee Left JOIN department ON  employee.department_id = department.department_id order By department.department_name ",nativeQuery = true )
    List<Employee> getOrderByDepartment();
    @Query(value = "SELECT * FROM employee Left JOIN department ON  employee.department_id = department.department_id  order By employee.designation ",nativeQuery = true )
    List<Employee> getOrderByDesignation();


    @Query(value = "SELECT * FROM employee Left JOIN department ON  employee.department_id = department.department_id where department.department_name LIKE %?1%"

            ,nativeQuery = true
    )
    public List<Employee> getByDept(String keyword);



    Optional<Employee> findByDesignation(String designation);



}
