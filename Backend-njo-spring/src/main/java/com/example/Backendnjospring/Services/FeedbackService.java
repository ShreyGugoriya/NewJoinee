package com.example.Backendnjospring.Services;

import com.example.Backendnjospring.Entities.Employee;
import com.example.Backendnjospring.Entities.Feedback;
import com.example.Backendnjospring.Entities.Session;
import com.example.Backendnjospring.ProjectionSchema.IEmployeeAndFeedback;
import com.example.Backendnjospring.ProjectionSchema.IEmployeeAndKit;
import com.example.Backendnjospring.Repositories.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FeedbackService {
    @Autowired
    FeedbackRepository feedbackRepository;

    public List<Feedback> getFeedback() {
        return feedbackRepository.findAll();
    }

    public Feedback getFeedbackById(int id) {
        return feedbackRepository.findById(id).get();
    }


    public Feedback createFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public Feedback updateFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public void deleteFeedback(int id) {
        feedbackRepository.deleteById(id);
    }


    public List<IEmployeeAndFeedback> listAll(String keyword) {
        if (keyword != null) {
            return feedbackRepository.search(keyword);
        }
        return null;
    }
    public List<Feedback> getAllFeedback(Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);

        Page<Feedback> pagedResult = feedbackRepository.findAll(paging);

        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<Feedback>();
        }

    }
    public List<IEmployeeAndFeedback> getFeedbackAndEmployee() {
        List<IEmployeeAndFeedback> empAndFeed = feedbackRepository.getEmployeeAndFeedback();
        return empAndFeed;

    }

    public List<IEmployeeAndFeedback> getFeedbackAndEmployeeOnlyTrue() {
        List<IEmployeeAndFeedback> empAndFeed = feedbackRepository.getEmployeeAndFeedbackOnlyTrue();
        return empAndFeed;

    }

}
