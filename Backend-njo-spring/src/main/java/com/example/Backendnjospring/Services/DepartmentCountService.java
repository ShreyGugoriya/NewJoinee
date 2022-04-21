package com.example.Backendnjospring.Services;


import com.example.Backendnjospring.Entities.DepartmentCount;
import com.example.Backendnjospring.Repositories.DepartmentCountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class DepartmentCountService {
    @Autowired
    DepartmentCountRepository departmentCountRepository;

    public List<DepartmentCount> addDepCount(){
        List<DepartmentCount> departmentCounts= departmentCountRepository.getAll();
        System.out.println(departmentCounts.size());
//        departmentCountRepository.saveAll(departmentCounts);
//        for(DepartmentCount dep: departmentCounts)
                departmentCountRepository.save(departmentCounts.get(0));

//        departmentCountRepository.saveAll(Arrays.asList(
//
//                new DepartmentCount(1,"name",12),
//                new DepartmentCount(2,"name",12)
//        ));
        return departmentCounts;
    }
}
