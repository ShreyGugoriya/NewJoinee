package com.example.Backendnjospring.Controllers;

import com.example.Backendnjospring.Entities.Employee;
import com.example.Backendnjospring.Entities.WelcomeKit;
import com.example.Backendnjospring.ProjectionSchema.IEmployeeAndKit;
import com.example.Backendnjospring.Services.EmailSender;
import com.example.Backendnjospring.Services.EmployeeService;
import com.example.Backendnjospring.Services.WelcomeKitService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.ui.Model;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
public class WelcomeKItController {
    @Autowired
    WelcomeKitService welcomeKitService;

    @Autowired
    EmployeeService employeeService;

    @Autowired
    EmailSender emailSender;

    // Get all the welcome kits details
    @RequestMapping(value = "/welcomekit/", method = RequestMethod.GET)
    public List<WelcomeKit> getWelcomekit() {
        try{return welcomeKitService.getWelcomekit();
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }

    // Get the welcome kit details by welcome kit ID
    @RequestMapping(value = "/welcomekit/{id}", method = RequestMethod.GET)
    public WelcomeKit getWelcomekitById(@PathVariable("id") int id) {
        try{
            return welcomeKitService.getWelcomekitById(id);
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }


    // addition of welcome kit with employee...
    @RequestMapping(value = "/welcomekit/{empId}", method = RequestMethod.POST)
    public WelcomeKit createWelcomekit(@RequestBody WelcomeKit welcomeKit,@PathVariable("empId") int id) {
        try {
            Employee employee = employeeService.getEmployeeById(id);
            welcomeKit.setEmployee(employee);
            long min = 100000;
            long max = 1000000;

//Generate random int value from 50 to 100
            System.out.println("Random value in int from "+min+" to "+max+ ":");
            long random_long = (long)Math.floor(Math.random()*(max-min+1)+min);
            System.out.println(random_long);
            LocalDate expdelivery = employee.getJoiningDate().plusDays(15);
            emailSender.sendEmail(employee.getEmp_email(), "Welcome Kit Status", "Hello "+ employee.getEmp_name() +",\n\nYour Welcome Kit has been already shipped and below are the tracking details:\n\n"+"Tracking ID : "+random_long+"\n\nAddress : "+ employee.getEmp_address()+"\n\nExpected Delivery date :"+expdelivery+"\n\nVendor : Bluedart\n\n\nRegards,\nImbarco Recruitment Team.\n");
            return welcomeKitService.createWelcomekit(welcomeKit);
        } catch (Exception exception){
        System.out.println(exception);


        return  null;
    }
    }

   // Updation of welcome kit status...
//    @RequestMapping(value = "/welcomekit/{id}", method = RequestMethod.PUT)
//    public WelcomeKit updateWelcomekit(@RequestBody WelcomeKit welcomeKit) {
//        return welcomeKitService.updateWelcomekit(welcomeKit);
//    }
//@RequestMapping(value = "/welcomekit/{empid}", method = RequestMethod.PUT)
//public WelcomeKit updateWelcomekit(@PathVariable("empid") int id, @RequestBody WelcomeKit welcomeKit) {
//    return welcomeKitService.updateWelcomekit(id,welcomeKit);
//}

    @RequestMapping(value = "/welcomekit/{empid}", method = RequestMethod.PUT)
    public WelcomeKit updateWelcomekit(@PathVariable("empid") int id, @RequestBody WelcomeKit welcomeKit) {
        try {
            return welcomeKitService.updateWelcomekit(id, welcomeKit);
         }catch (Exception exception){
        System.out.println(exception);
        return  null;
    }
    }


    // Delete welcome kit by welcome kit ID

    @RequestMapping(value = "/welcomekit/{id}", method = RequestMethod.DELETE)
    public void deleteWelcomekit(@PathVariable("id") int id) {
        try {
            welcomeKitService.deleteWelcomekit(id);
        } catch (Exception exception){
        System.out.println(exception);

    }
    }

    //Welcome kit Filter on basis of different fields...
    @RequestMapping("/welcomekit/filter/{keyword}")
    public List<IEmployeeAndKit> viewFilter(Model model, @PathVariable("keyword") String keyword) {
        try {
            List<IEmployeeAndKit> listWelcomeKit = welcomeKitService.listAllKits(keyword);
            return listWelcomeKit;
        } catch (Exception exception){
        System.out.println(exception);
        return  null;
    }
    }

    // Welcome kit pagination...
    @GetMapping("/welcomekit/pagination")
    public ResponseEntity<List<WelcomeKit>> getAllEmployees(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize)

    {
        try {
            List<WelcomeKit> list = welcomeKitService.getAllWelcomekit(pageNo, pageSize);

            return new ResponseEntity<List<WelcomeKit>>(list, new HttpHeaders(), HttpStatus.OK);
        }catch (Exception exception){
        System.out.println(exception);
        return  null;
    }
    }

    // Get all welcome kit and employee details....
    @GetMapping("/welcomekit/employee/")
    public  List<IEmployeeAndKit> getEmployeeAndKit(){
        try {
            return welcomeKitService.getEmployeeAndKit();
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }

    // Get welcome kit details by employee ID
    @GetMapping("/welcomekit/employee/{empId}")
    public  WelcomeKit getEmployeeAndKit(@PathVariable("empId") int empId){
        try{
        return welcomeKitService.getWelcomekitByEmpId(empId);
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }

    @GetMapping("/welcomkit/status/{status}")
    public  List<IEmployeeAndKit> getEmployeeAndKitByStatus(@PathVariable("status") String statusType){
        try {
            return welcomeKitService.getEmployeeAndKitByStatus(statusType);
        }
        catch (Exception ex){
            System.out.println(ex);
            return null;
        }
    }

    @GetMapping("/welcomkit/dept/{dept}")
    public  List<IEmployeeAndKit> getEmployeeAndKitByDept(@PathVariable("dept") String dept){
        try {
            return welcomeKitService.getEmployeeAndKitByDept(dept);
        }
        catch (Exception ex){
            System.out.println(ex);
            return null;
        }
    }
}
