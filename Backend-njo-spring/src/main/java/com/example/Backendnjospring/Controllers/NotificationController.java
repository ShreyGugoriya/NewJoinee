package com.example.Backendnjospring.Controllers;

import com.example.Backendnjospring.Entities.Employee;
import com.example.Backendnjospring.Entities.Notification;
import com.example.Backendnjospring.Services.EmployeeService;
import com.example.Backendnjospring.Services.NotificationService;
import com.example.Backendnjospring.exception.EmployeeException;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
public class NotificationController {
    @Autowired
    NotificationService notificationService;

    @Autowired
    EmployeeService employeeService;

    @RequestMapping(value = "/notification/",method = RequestMethod.GET)
    public ResponseEntity<?> getNotification(){
        try {

            return ResponseEntity.ok(notificationService.getNotification());
        }
        catch (Exception exception){
            System.out.println(exception);
            return ResponseEntity.ok(exception.getMessage());
        }
    }

    // Get all the employee
    @RequestMapping(value = "/notification/{empId}",method = RequestMethod.GET)
    public List<Notification> getNotificationById(@PathVariable("empId") int empId){

            return notificationService.getNotificationById(empId);

    }

    // Create a new employee
    @RequestMapping(value = "/notification/{empId}",method = RequestMethod.POST)
    public Notification createNotification(@RequestBody Notification notification, @PathVariable("empId") int empId){
        try {
            Employee employee = employeeService.getEmployeeById(empId);
            notification.setEmployee(employee);
            return notificationService.createNotification(notification);

             }
        catch (Exception exception){
            System.out.println(exception);
            return null;
        }

    }


    // Delete an employee by employee ID
    @RequestMapping(value = "/notification/{id}",method = RequestMethod.DELETE)
    public void deleteNotification(@PathVariable("id") int id){
        try {
            notificationService.deleteNotification(id);}
        catch (Exception exception){
            System.out.println(exception);

        }
    }

}
