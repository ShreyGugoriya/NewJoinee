package com.example.Backendnjospring.Controllers;

import com.example.Backendnjospring.Entities.*;
import com.example.Backendnjospring.Entities.Feedback;
import com.example.Backendnjospring.Services.*;
import com.example.Backendnjospring.exception.EmployeeException;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.repository.query.Param;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.util.List;
import java.util.Locale;

//@CrossOrigin(origins = "http://localhost:3000/dashboard")
@RestController
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @Autowired
    StatusService statusService;

    @Autowired
    LoginServices loginServices;

    @Autowired
    DepartmentService departmentService;
    @RequestMapping(value = "/employee/",method = RequestMethod.GET)
    public ResponseEntity<?> getEmployee(){
        try {

        return ResponseEntity.ok(employeeService.getEmployee());
        }
        catch (Exception exception){
            System.out.println(exception);
            return ResponseEntity.ok(exception.getMessage());
        }
    }

    // Get all the employee
    @RequestMapping(value = "/employee/{id}",method = RequestMethod.GET)
    public Employee getEmployeeById(@PathVariable("id") int id){
        try {

            return employeeService.getEmployeeById(id);
        }
        catch (Exception exception){
            System.out.println(exception);
            return null;
        }
    }

    // Create a new employee
    @RequestMapping(value = "/employee/",method = RequestMethod.POST)
    public Employee createEmployee(@RequestBody Employee employee){
        try {
        if(employeeService.checkExisiting(employee))
        {
            throw  new EmployeeException("User Already exists");
        }
        employeeService.createEmployee(employee);

        return  employee;  }
        catch (Exception exception){
            System.out.println(exception);
            return null;
        }

    }

    // Update a new employee by employee ID
    @RequestMapping(value = "/employee/{id}",method = RequestMethod.PUT)
    public ResponseEntity<?> updateEmployeeById(@PathVariable int id, @RequestBody Employee employee){
        try {
                Employee empcheck = employeeService.getEmployeeById(id);
            if(empcheck!=null)
                return ResponseEntity.ok(employeeService.updateEmployeeBYId(employee, id));
            else{
                throw  new EmployeeException("User does not exists!");
            }
        }
        catch (Exception exception){
                System.out.println(exception);
                return ResponseEntity.badRequest().body(exception.getMessage());
            }
    }

    // Delete an employee by employee ID
    @RequestMapping(value = "/employee/{id}",method = RequestMethod.DELETE)
    public void deleteEmployee(@PathVariable("id") int id){
        try {
        employeeService.deleteEmployee(id);}
        catch (Exception exception){
            System.out.println(exception);

        }
    }


    // Add search filter on employee table
    @RequestMapping("/employee/filter/{keyword}")
    public List<Employee> viewFilter(Model model, @PathVariable("keyword") String keyword) {
        try {
        List<Employee> listEmployee = employeeService.listAll(keyword);
             return listEmployee;}
        catch (Exception exception){
            System.out.println(exception);
            return null;
        }
    }


    @RequestMapping("/employee/fuzzyfilter/{keyword}")
    public List<Employee> viewFuzzyFilter(Model model, @PathVariable("keyword") String keyword) {
        try {
        List<Employee> listEmployee = employeeService.listAllFuzzy(keyword);
        return listEmployee;}
        catch (Exception exception){
            System.out.println(exception);
            return null;
        }
    }

    // Add pagination on employee

    @GetMapping("/employee/pagination")
    public ResponseEntity<List<Employee>> getAllEmployee(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize)

    { try {
        List<Employee> list = employeeService.getAllEmployee(pageNo, pageSize);

        return new ResponseEntity<List<Employee>>(list, new HttpHeaders(), HttpStatus.OK);}
    catch (Exception exception){
        System.out.println(exception);
        return null;
    }
    }

    // Add employee with department name...... Also alloting employee their Roll IDs
    @PostMapping("/employee/department/{departmentName}/")
    public  ResponseEntity<?> createEmployeeWithDepartment(@PathVariable("departmentName") String depName,@Valid  @RequestBody Employee employee){
        try {
            if(employeeService.checkExisiting(employee))
            {
                throw  new EmployeeException("User Already exists");
            }
        List<Department> departments = departmentService.getDepartment();

        for(Department department: departments){
            if(department.getDept_name().equals(depName)){
                employee.setDepartment(department);
            }
        }
        employeeService.createEmployee(employee);
        Employee setrollid = employeeService.getEmployeeById(employee.getEmp_id());
        String dep_name = setrollid.getDepartment().getDept_name();
        String roll_prefix= dep_name.substring(0,2);
        String combine = roll_prefix.toUpperCase(Locale.ROOT) + "_" + setrollid.getEmp_id();
        setrollid.setRoll_id(combine);


        statusService.createStatus(setrollid);
        loginServices.generatePasswordAndEmployee(setrollid);
        Employee sendEmployee = employeeService.updateEmployee(employee);
//        statusService.createStatus(setrollid);

        return ResponseEntity.ok(employeeService.updateEmployee(employee));
        }

        catch (Exception exception){
            System.out.println(exception);
            return  ResponseEntity.ok(exception.getMessage());
        }
    }

    // Uploadation of profile picture by employee ID {employee ID}
    @PostMapping("/employee/upload/image/{id}")
    public  Employee uploadProfilePhoto(@RequestParam("file") MultipartFile file,@PathVariable("id") int id){
        try {
            return  employeeService.storeProfile(file, id);
        } catch (Exception exception){
            System.out.println(exception);
            return null;
        }

    }

    // Sorting of employee by department, designation and date
    @GetMapping("/employee/orderby/{field}")
    public  List<Employee> getOrderBy(@PathVariable("field") String field){
        try {
        return employeeService.getEmployeeOrderByField(field); } catch (Exception exception){
            System.out.println(exception);
            return null;
        }
    }

    @GetMapping("/employee/department/{departmentName}/")
    public  List<Employee> getByDepartmentName(@PathVariable("departmentName") String name){
        try {
            return employeeService.getByDepartmentName(name);
        }
        catch(Exception ex){
            System.out.println(ex.getMessage());
            return null;
        }
    }

}
