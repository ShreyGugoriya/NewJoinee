package com.example.Backendnjospring.Services;

import com.example.Backendnjospring.Entities.Department;
import com.example.Backendnjospring.Entities.Employee;
import com.example.Backendnjospring.Repositories.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    @Autowired
    DepartmentRepository departmentRepository;

    public List<Department> getDepartment() {
        return departmentRepository.findAll();
    }

    public Department getDepartmentById(int id) {
        return departmentRepository.findById(id).get();
    }


    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public Department updateDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public void deleteDepartment(int id) {
        departmentRepository.deleteById(id);
    }

    public List<Department> listAllDepartment(String keyword) {
        if (keyword != null) {
            return departmentRepository.search(keyword);
        }
        return null;
    }
}
