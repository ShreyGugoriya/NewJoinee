package com.example.Backendnjospring.Services;

import com.example.Backendnjospring.Entities.Employee;
import com.example.Backendnjospring.Entities.Login;
import com.example.Backendnjospring.Entities.Role;
import com.example.Backendnjospring.Repositories.EmployeeRepository;
import com.example.Backendnjospring.Repositories.LoginRepository;
import com.example.Backendnjospring.Repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

@Service
public class LoginServices {

    @Autowired
    LoginRepository repository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    public List<Login> getAllLogin()
    {
        return repository.findAll();
    }

    public Login createEmployee(Login login) {
        return repository.save(login);
    }

    public Login generatePasswordAndEmployee(Employee employee) {

        String username=employee.getEmp_name();
        String dept= employee.getDepartment().getDept_name().substring(0,2);
        String name[]=username.split(" ");
        username=name[0].toLowerCase(Locale.ROOT)+employee.getEmp_id()+"@gmail.com";
        String passName=name[0].toLowerCase(Locale.ROOT);
        String password=passName+'@'+employee.getRoll_id();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String testPasswordEncoded = passwordEncoder.encode(password);
        Login login = new Login();
        login.setPassword(testPasswordEncoded);
        login.setUsername(username);
        login.setEmployee(employee);
        Set<Role> role=new HashSet<>();
        Role role1=roleRepository.getById(2);
        role.add(role1);
        login.setRoles(role);
        System.out.println(testPasswordEncoded+  " password: /t "+password+" username: /t" +username);
        return repository.save(login);

    }

    public Login checkLogin(String username, String password){
        System.out.println("Am here" +
                " "+username +" "+password);
        List<Login> users = repository.findByUsername(username);
        if(users.isEmpty())
            return null;
        else {
                System.out.println("not null");
            Login user =users.get(0);
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            encoder.matches(password, user.getPassword());
            System.out.println(password+"Correct one"+user.getPassword());
//        if (user.getPassword().equals(password))
//            return user;
//
//        return null;
            if (encoder.matches(password, user.getPassword()))
                return user;
        }
        return null;

    }
}
