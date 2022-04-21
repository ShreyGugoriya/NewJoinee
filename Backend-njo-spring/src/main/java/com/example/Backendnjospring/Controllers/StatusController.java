package com.example.Backendnjospring.Controllers;

import com.example.Backendnjospring.Entities.Status;
import com.example.Backendnjospring.Services.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/status")
public class StatusController {

    @Autowired
    StatusService statusService;

    // Get all the sessions
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Status> getAll(){
        try{
            return  statusService.getAllStatus();
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }

    // Update the status of particular employee { employee ID}
    @RequestMapping(value = "/{id}" , method = RequestMethod.PUT)
    public  Status updateSubmit(@PathVariable("id") int id){
        try{


        if(statusService.checkFileSizeByEmpId(id))
            return statusService.updateSubmit(id);
        else
            return null;
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }

    }

    // Update the status of documentApproved by employee ID
    @RequestMapping(value = "/approved/{id}" , method = RequestMethod.PUT)
    public  Status updateApproved(@PathVariable("id") int id){
       try{
           return statusService.updateApproved(id);
       }catch (Exception exception){
           System.out.println(exception);
           return  null;
       }
    }

    // get the status of the particular employee
    @RequestMapping(value= "/employee/{id}", method = RequestMethod.GET)
    public Status getstatus(@PathVariable("id") int id){
       try{ Status statuss = statusService.getStatusByEmployee(id);
        return statuss;
       }catch (Exception exception){
           System.out.println(exception);
           return  null;
       }
    }


}
