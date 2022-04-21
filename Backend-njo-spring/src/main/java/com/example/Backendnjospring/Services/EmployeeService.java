package com.example.Backendnjospring.Services;

import com.example.Backendnjospring.Entities.Employee;
import com.example.Backendnjospring.Entities.Feedback;
import com.example.Backendnjospring.Repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    public List<Employee> getEmployee() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(int id) {
        return employeeRepository.findById(id).get();
    }

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public  Employee updateEmployee(Employee employee){return  employeeRepository.save(employee);}
    public Employee updateEmployeeBYId(Employee employee, int id ) {
        Employee employee1 = employeeRepository.getById(id);
        employee1.setEmp_address(employee.getEmp_address());
        employee1.setEmp_phone(employee.getEmp_phone());
        employee1.setEmp_email(employee.getEmp_email());
        employee1.setEmp_name(employee.getEmp_name());
        return employeeRepository.save(employee1);
    }

    public void deleteEmployee(int id) {
        employeeRepository.deleteById(id);
    }


    public List<Employee> listAll(String keyword) {
        if (keyword != null) {
            return employeeRepository.search(keyword);
        }
        return null;}

    public List<Employee> listAllFuzzy(String keyword) {
        if (keyword != null) {
            return employeeRepository.Fuzzysearch(keyword);
        }
        return null;}

    public List<Employee> getAllEmployee(Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);

        Page<Employee> pagedResult = employeeRepository.findAll(paging);

        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<Employee>();
        }

    }

    public Employee storeProfile(MultipartFile file, int empId){

        Employee employee =getEmployeeById(empId);
        try{
            employee.setProfilePhoto(file.getBytes());
            updateEmployee(employee);
        }catch (IOException ex){
            System.out.println(ex);
        }

        return employeeRepository.getById(empId);
    }


    public boolean checkExisiting(Employee employee) {

        List<Employee> allEmployees= employeeRepository.findAll();
        for(Employee curr: allEmployees){
            if (curr.getEmp_email().equals(employee.getEmp_email()) || curr.getEmp_phone().equals(employee.getEmp_phone()))
                return true;
        }
        return false;
    }

    public  List<Employee> getEmployeeOrderByField(String field){
        if(field.contains("date"))
            return employeeRepository.getOrderByJoiningDate();
        else if(field.contains("department"))
            return employeeRepository.getOrderByDepartment();
            else if(field.contains("designation"))
                return employeeRepository.getOrderByDesignation();
            else
                return employeeRepository.getOrderByName();

    }


    public List<Employee> getByDepartmentName(String name) {
        return  employeeRepository.getByDept(name);
    }
}
