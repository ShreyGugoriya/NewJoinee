package com.example.Backendnjospring.Controllers;

import com.example.Backendnjospring.DTO.APIResponse;
import com.example.Backendnjospring.Entities.Department;
import com.example.Backendnjospring.Entities.Session;
import com.example.Backendnjospring.Entities.WelcomeKit;
import com.example.Backendnjospring.ProjectionSchema.ISessionAndDepartment;
import com.example.Backendnjospring.Services.DepartmentService;
import com.example.Backendnjospring.Services.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class SessionController {
    @Autowired
    SessionService sessionService;

    @Autowired
    DepartmentService departmentService;

    // Get all the sessions
    @RequestMapping(value = "/session/",method = RequestMethod.GET)
    public List<Session> getSession(){
        try{
        return sessionService.getSession();
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }

    // Get session by session ID
    @RequestMapping(value = "/session/{id}",method = RequestMethod.GET)
    public Session getSessionById(@PathVariable("id") int id){
        try{
            return sessionService.getSessionById(id);
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }


    // Create sessions by Department name { Department name } -> multiple departments
    @RequestMapping(value = "/session/{values}",method = RequestMethod.POST)
    public Session createSession(@RequestBody  Session session, @PathVariable String[] values){

        try {
            List<Department> departments = departmentService.getDepartment();
            for (Department department : departments) {

                for (String name : values)

                    if (department.getDept_name().equals(name)) {
                        List<Department> listdepartment = new ArrayList<>();
                        listdepartment.add(department);
                        session.setDepartment(listdepartment);
                        List<Session> listsession = department.getSession();
                        listsession.add(session);
                        sessionService.createSession(session);
                        department.setSession(listsession);
                        departmentService.updateDepartment(department);
                    }

            }
            return sessionService.getSessionById(session.getSes_id());
        } catch (Exception exception){
        System.out.println(exception);
        return  null;
    }

    }

    // update session by session ID
    @RequestMapping(value = "/session/{id}",method = RequestMethod.PUT)
    public Session updateSession(@RequestBody Session session){
        try{return sessionService.updateSession(session);
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }

    // delete session by session ID
    @RequestMapping(value = "/session/{id}",method = RequestMethod.DELETE)
    public void deleteSession(@PathVariable("id") int id){
        try{
            sessionService.deleteSession(id);
        }catch (Exception exception){
            System.out.println(exception);
        }
    }

    // Search/filter sessions
    @RequestMapping(value = "/session/filter/{keyword}")
    public List<Session> viewFilter(Model model, @PathVariable("keyword") String keyword){
        try {
            List<Session> listSession = sessionService.listAll(keyword);
            return listSession;
        }catch (Exception exception){
        System.out.println(exception);
        return  null;
    }
    }

    // sessions pagination
    @GetMapping("/session/pagination")
    public ResponseEntity<List<Session>> getAllSession(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize)

    {
        try {
            List<Session> list = sessionService.getAllSession(pageNo, pageSize);

            return new ResponseEntity<List<Session>>(list, new HttpHeaders(), HttpStatus.OK);
         }catch (Exception exception){
        System.out.println(exception);
        return  null;
    }
    }

    // Get all the sessions by all the department
    @GetMapping("/session/department")
    public List<ISessionAndDepartment> getSessionAndDepartment(){
        try{
        return sessionService.getSessionAndDepartment();
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }


    // Sort sessions by Date
    @RequestMapping(value = "/session/sort/{field}", method = RequestMethod.GET)
    private APIResponse<List<Session>> getSessionWithSort(@PathVariable String field) {
        try {
            List<Session> allSession = sessionService.findSessionAfterSorting(field);
            return new APIResponse<>(allSession.size(), allSession);
        } catch (Exception exception){
        System.out.println(exception);
        return  null;
    }

    }

    // Sort sessions by diff fields
    @GetMapping("/session/orderByDate/{field}/{dir}")
    List<ISessionAndDepartment> getSessionOrderByDate(@PathVariable("field") String field, @PathVariable("dir") String dir){
        try{
        return  sessionService.SessionOrderByField(field, dir);
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }
}
