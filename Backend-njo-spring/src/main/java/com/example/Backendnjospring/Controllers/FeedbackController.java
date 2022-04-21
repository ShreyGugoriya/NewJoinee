package com.example.Backendnjospring.Controllers;


import com.example.Backendnjospring.Entities.Employee;
import com.example.Backendnjospring.Entities.Feedback;
import com.example.Backendnjospring.Entities.Session;
import com.example.Backendnjospring.ProjectionSchema.IEmployeeAndFeedback;
import com.example.Backendnjospring.Services.EmployeeService;
import com.example.Backendnjospring.Services.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.ui.Model;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class FeedbackController {

    @Autowired
    FeedbackService feedbackService;

    @Autowired
    EmployeeService employeeService;

    @RequestMapping(value = "/feedback/",method = RequestMethod.GET)
    public List<Feedback> getFeedback(){
        try {
            return feedbackService.getFeedback();
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }

    @RequestMapping(value = "/feedback/{id}",method = RequestMethod.GET)
    public Feedback getFeedbackById(@PathVariable("id") int id){
        try {
        return feedbackService.getFeedbackById(id);
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }


    //POST Feedback by employee
    @RequestMapping(value = "/feedback/{id}",method = RequestMethod.POST)
    public Feedback createFeedback(@Valid  @RequestBody Feedback feedback, @PathVariable("id") int id){
        try {
            Employee employee = employeeService.getEmployeeById(id);
            feedback.setEmployee(employee);
            feedback.setStatus(true);
            List<Feedback> listfeedback = employee.getFeedbacks();
            listfeedback.add(feedback);
            feedbackService.createFeedback(feedback);
            employeeService.updateEmployee(employee);
            return feedbackService.getFeedbackById(feedback.getFdbk_id());

        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }

    // Get all the feedback of a particular employee {employee id}
    @RequestMapping(value = "/feedback/employee/{id}",method = RequestMethod.GET)
    public List<Feedback> getfeedbacklist( @PathVariable("id") int id){

        try {
            List<Feedback> feedbackList = feedbackService.getFeedback();
            List<Feedback> newfeedback = new ArrayList<>();
            for (Feedback feedback : feedbackList) {
                if (feedback.getEmployee().getEmp_id() == id) {
                    newfeedback.add(feedback);
                }
            }
            return newfeedback;
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }

    // Update a feedback by feedback ID
    @RequestMapping(value = "/feedback/{id}",method = RequestMethod.PUT)
    public Feedback updateFeedback(@PathVariable("id") int id,@RequestBody Feedback feedback){
        try {

            Feedback feedback1 = feedbackService.getFeedbackById(id);
            feedback1.setStatus(feedback.isStatus());
            return feedbackService.updateFeedback(feedback1);
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }

    //Delete a feedback by feedback ID
    @RequestMapping(value = "/feedback/{id}",method = RequestMethod.DELETE)
    public void deleteFeedback(@PathVariable("id") int id){
        try{
        feedbackService.deleteFeedback(id);
        }catch (Exception exception){
            System.out.println(exception);
        }
    }

    // Search feedback by keyword
    @RequestMapping("/feedback/filter/{keyword}")
    public List<IEmployeeAndFeedback> viewFilter(Model model, @PathVariable("keyword") String keyword) {
        try{
        List<IEmployeeAndFeedback> listFeedback = feedbackService.listAll(keyword);
        return listFeedback;
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }

    // Feedback pagination
    @GetMapping("/feedback/pagination")
    public ResponseEntity<List<Feedback>> getAllFeedback(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize)

    {try{
        List<Feedback> list = feedbackService.getAllFeedback(pageNo, pageSize);

        return new ResponseEntity<List<Feedback>>(list, new HttpHeaders(), HttpStatus.OK);
    }catch (Exception exception){
        System.out.println(exception);
        return  null;
    }
    }

    // Get all the feedbacks by all the employees
    @RequestMapping(value = "/feedback/employee/",method = RequestMethod.GET)
    public List<IEmployeeAndFeedback> getFeedbackAndEMployee(){
        try {
            return feedbackService.getFeedbackAndEmployee();
         }catch (Exception exception){
        System.out.println(exception);
        return  null;
    }
    }

    @RequestMapping(value = "/feedbackOnlyTrue/employee/",method = RequestMethod.GET)
    public List<IEmployeeAndFeedback> getFeedbackAndEMployeeOnlyTrue(){
        try {

        return feedbackService.getFeedbackAndEmployeeOnlyTrue();
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }

    // Send a reply for a feedback for a particular employee by employee ID
    @RequestMapping(value = "/feedback/reply/{id}/", method = RequestMethod.PUT)
    public  Feedback sendReply(@RequestBody Feedback feedback, @PathVariable("id" ) int id){
        try{
        Feedback feedbackser = feedbackService.getFeedbackById(id);
        feedbackser.setReply(feedback.getReply());
        return feedbackService.updateFeedback(feedbackser);
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }

}

