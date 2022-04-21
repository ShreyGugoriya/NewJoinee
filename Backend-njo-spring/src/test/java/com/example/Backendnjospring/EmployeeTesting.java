package com.example.Backendnjospring;

import com.example.Backendnjospring.Entities.Department;
import com.example.Backendnjospring.Entities.Employee;
import com.example.Backendnjospring.Entities.Session;
import com.example.Backendnjospring.Repositories.DepartmentRepository;
import com.example.Backendnjospring.Repositories.EmployeeRepository;
import com.example.Backendnjospring.Repositories.SessionRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import java.time.LocalDate;
import java.util.*;


@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class EmployeeTesting {
    @Test
    void contextLoads() {
    }

    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    SessionRepository sessionRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void SaveEmployeeTest(){

        LocalDate date = LocalDate.now();
        List<Session> allsession = new ArrayList<>();
        Session session = new Session();

        session.setSes_id(4);
        session.setSesName("Kunakidzaa Session");
        session.setSesDate(date);
        allsession.add(session);

        Department department = new Department();
        department.setDept_id(4);
        department.setDept_name("IT");
        department.setDept_desc("Technology Department");
        department.setSession(allsession);

        Employee employee = new Employee();
        employee.setEmp_id(4);
        employee.setEmp_name("Shrey");
        employee.setEmp_email("admin@deloittee.com");
        employee.setEmp_phone("987654321");
        employee.setDesignation("Intern");
        employee.setDepartment(department);
        employee.setJoiningDate(date);


        employeeRepository.save(employee);
        departmentRepository.save(department);
        Optional<Employee> byId = employeeRepository.findById(4);
        Optional<Department> departmentbyId = departmentRepository.findById(4);
        Assertions.assertTrue(byId.get().getDepartment().getDept_id()==4, "Department Entity is present");
        Assertions.assertTrue(byId.isPresent(), "Entity on present");
    }

    @Test
    @Order(2)
    public void getEmployeeTest(){
        List<Employee> employee = employeeRepository.findAll();
        Assertions.assertTrue(employee.size()>=1, "Employee entity exists");
    }

    @Test
    @Order(3)
    @Rollback(value = false)
    public void updateEmployeeTest(){
        Employee employee = employeeRepository.findById(4).get();
        employee.setDesignation("SDE");
        Employee employeeUpdate = employeeRepository.save(employee);
        Assertions.assertTrue(employeeUpdate.getDesignation()=="SDE", "Update Working in Employee");
    }

//    @Test
//    @Order(4)
//    @Rollback(value = false)
//    public void deleteEmployeeTest(){
//        Employee employee = employeeRepository.findById(2).get();
//        employeeRepository.delete(employee);
//        Employee employee1 = null;
//        Optional<Employee> optionalEmployee = employeeRepository.findByDesignation("SDE");
//
//        if(optionalEmployee.isPresent()){
//            employee1=optionalEmployee.get();
//        }
//        Assertions.assertTrue(employee1==null, "Delete Working in Employee");
//    }

}
