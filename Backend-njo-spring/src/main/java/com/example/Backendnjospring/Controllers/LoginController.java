package com.example.Backendnjospring.Controllers;

import com.example.Backendnjospring.ProjectionSchema.AdminOrUserorNull;
import com.example.Backendnjospring.Services.LoginServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.Backendnjospring.Entities.*;
import java.util.List;
import java.util.Set;

@RestController
public class LoginController {
    @Autowired
    LoginServices service;

    // get all the login credentials of all the users
    @GetMapping("api/logins")
    public List<Login> getLogins(){
        return service.getAllLogin();
    }

    //
    @GetMapping("api/login/{username}/{password}")
    public boolean checkLogins(@PathVariable("username")String username, @PathVariable("password") String password){
        try{
       Login login= service.checkLogin(username,password);
       if( login==null){

           return false;
       }
       return true;
        }catch (Exception exception){
            System.out.println(exception);
            return false;
        }
    }
    @GetMapping("api/login/admin/user/{username}/{password}")
    public AdminOrUserorNull checkLoginsAdminOrUser(@PathVariable("username")String username, @PathVariable("password") String password){
        try{
        Login login= service.checkLogin(username,password);

        if( login==null){

            return new AdminOrUserorNull(0, null);
        }
        Set<Role> roles= login.getRoles();
        for(Role role: roles){
            if (role.getName().equals("ADMIN")){
                System.out.println("Admin");
                return new AdminOrUserorNull(0,"ADMIN" );}
            else {
                System.out.println("User");
                int id = login.getEmployee().getEmp_id();
                return  new AdminOrUserorNull(id,"USER");
            }
        }
        return new AdminOrUserorNull(0, null);
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }

    }
    @RequestMapping(value = "/login/",method = RequestMethod.POST)
    public Login createLogin(@RequestBody Login login){
        try{
        return service.createEmployee(login);
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }
}
