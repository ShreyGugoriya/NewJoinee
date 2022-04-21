package com.example.Backendnjospring.Services;

import com.example.Backendnjospring.Entities.Employee;
import com.example.Backendnjospring.Entities.WelcomeKit;
import com.example.Backendnjospring.ProjectionSchema.IEmployeeAndKit;
import com.example.Backendnjospring.Repositories.WelcomeKitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class WelcomeKitService {
    @Autowired
    WelcomeKitRepository welcomeKitRepository;


    public List<WelcomeKit> getWelcomekit() {
        return welcomeKitRepository.findAll();
    }

    public WelcomeKit getWelcomekitById(int id) {
        return welcomeKitRepository.findById(id).get();
    }
    public WelcomeKit getWelcomekitByEmpId(int id) {

        return welcomeKitRepository.getWelcomeKitByEmployee(id);
    }

    public WelcomeKit createWelcomekit(WelcomeKit welcomeKit) {
        return welcomeKitRepository.save(welcomeKit);
    }


public WelcomeKit updateWelcomekit(int id,WelcomeKit welcomeKit) {
    WelcomeKit welcomeKit1 = welcomeKitRepository.getWelcomeKitByEmployee(id);
    welcomeKit1.setStatus(welcomeKit.getStatus());
    return welcomeKitRepository.save(welcomeKit1);
}

//    public WelcomeKit updateWelcomekit(int id,WelcomeKit welcomeKit) {
//            WelcomeKit welcomeKit1 = welcomeKitRepository.getWelcomeKitByEmployee(id);
//            welcomeKit1.setStatus(welcomeKit.getStatus());
//        return welcomeKitRepository.save(welcomeKit1);
//    }


    public void deleteWelcomekit(int id) {
        welcomeKitRepository.deleteById(id);
    }


    public List<IEmployeeAndKit> listAllKits(String keyword) {
        if (keyword != null) {
            return welcomeKitRepository.search(keyword);
        }
        return null;
    }
    public Page<WelcomeKit> WelcomekitWithPagination(int offset, int pageSize){
        Page<WelcomeKit> WelcomekitPaged = welcomeKitRepository.findAll(PageRequest.of(offset,pageSize));
        return WelcomekitPaged;
    }

    public List<WelcomeKit> getAllWelcomekit(Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);

        Page<WelcomeKit> pagedResult = welcomeKitRepository.findAll(paging);

        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<WelcomeKit>();
        }

    }

    public List<IEmployeeAndKit> getEmployeeAndKit(){
        List<IEmployeeAndKit> empAndkit = welcomeKitRepository.getEmployeeAndKit();
        return  empAndkit;
    }

    public List<IEmployeeAndKit> getEmployeeAndKitByStatus(String statusType) {
       List<IEmployeeAndKit> emp= welcomeKitRepository.getByStatus(statusType);

       if(statusType.equals("abc"))
                return welcomeKitRepository.getByNoStatus();
       return emp;

    }
    public List<IEmployeeAndKit> getEmployeeAndKitByDept(String deptName) {
        List<IEmployeeAndKit> emp= welcomeKitRepository.getByDept(deptName);
            return emp;
    }
}
