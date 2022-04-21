package com.example.Backendnjospring.Controllers;

import com.example.Backendnjospring.Entities.DepartmentCount;
import com.example.Backendnjospring.Services.DepartmentCountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DepartmentCountController {
    @Autowired
    DepartmentCountService departmentCountService;

    @GetMapping("/departmentCount/")
    public List<DepartmentCount> loadAll()
    {

        try {
            return departmentCountService.addDepCount();
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }
}
