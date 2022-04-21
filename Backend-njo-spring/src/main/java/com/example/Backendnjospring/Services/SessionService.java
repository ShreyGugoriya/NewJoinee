package com.example.Backendnjospring.Services;

import com.example.Backendnjospring.Entities.Session;
import com.example.Backendnjospring.Entities.WelcomeKit;
import com.example.Backendnjospring.ProjectionSchema.ISessionAndDepartment;
import com.example.Backendnjospring.Repositories.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SessionService {
    @Autowired
    SessionRepository sessionRepository;

    public List<Session> getSession() {
        return sessionRepository.findAll();
    }

    public Session getSessionById(int id) {
        return sessionRepository.findById(id).get();
    }


    public Session createSession(Session session) {
        return sessionRepository.save(session);
    }

    public Session updateSession(Session session) {
        return sessionRepository.save(session);
    }

    public void deleteSession(int id) {
        sessionRepository.deleteById(id);
    }

    public List<Session> listAll(String keyword) {
        if (keyword != null) {
            return sessionRepository.search(keyword);
        }
        return null;
    }

    public List<Session> getAllSession(Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);

        Page<Session> pagedResult = sessionRepository.findAll(paging);

        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<Session>();
        }
    }

    public List<ISessionAndDepartment> getSessionAndDepartment(){
        return sessionRepository.getSessionAndDepartment();
    }


    public List<Session> findSessionAfterSorting(String field) {
        return sessionRepository.findAll(Sort.by(Sort.Direction.ASC, field));

    }

    public  List<ISessionAndDepartment> SessionOrderByField(String field, String dir){
        String searchField="";
        if(field.contains("date"))
            return  sessionRepository.getOrderByDate();
        else if(field.contains("name"))
            return  sessionRepository.getOrderByName();
        else
            return  sessionRepository.getOrderByDepartment();

    }
}
