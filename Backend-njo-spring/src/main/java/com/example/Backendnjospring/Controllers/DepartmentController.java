package com.example.Backendnjospring.Controllers;

import com.example.Backendnjospring.Entities.Department;
import com.example.Backendnjospring.Entities.Employee;
import com.example.Backendnjospring.Services.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DepartmentController {

    @Autowired
    DepartmentService departmentService;

    // Get all department
    @RequestMapping(value = "/department/",method = RequestMethod.GET)
    public List<Department> getDepartment(){

        try{return departmentService.getDepartment();
        }
        catch(Exception exp){
          System.out.println("error"+":  "+exp);
            return null;}
    }

    // get all department by ID here
    @RequestMapping(value = "/department/{id}",method = RequestMethod.GET)
    public Department getDepartmentById(@PathVariable("id") int id){
        try{
        return departmentService.getDepartmentById(id);}
        catch(Exception ex){
            System.out.println("error"+":  "+ex);
            return null;
        }
    }

    // add department
    @RequestMapping(value = "/department/",method = RequestMethod.POST)
    public Department createDepartment(@RequestBody Department department){
        try{
        return departmentService.createDepartment(department);}
        catch(Exception ex){
            System.out.println("error"+":  "+ex);
            return null;
        }
    }

    //Update department by ID
    @RequestMapping(value = "/department/{id}",method = RequestMethod.PUT)
    public Department updateDepartment(@RequestBody Department department){
        try{
        return departmentService.updateDepartment(department);}
        catch(Exception ex){
            System.out.println("error"+":  "+ex);
            return null;
        }
    }

    // delete department by ID
    @RequestMapping(value = "/department/{id}",method = RequestMethod.DELETE)
    public void deleteDepartment(@PathVariable("id") int id){
        try{
        departmentService.deleteDepartment(id);}
        catch(Exception ex){
                System.out.println("error"+":  "+ex);

            }
    }


    //Search Department by department name
    @RequestMapping(value = "/department/filter/{keyword}",method = RequestMethod.GET)
    public List<Department> viewFilter(Model model, @PathVariable("keyword") String keyword) {
        try{List<Department> listDepartment = departmentService.listAllDepartment(keyword);
        return listDepartment;}
        catch(Exception ex){
            System.out.println("error"+":  "+ex);
            return null;
        }
    }
}
