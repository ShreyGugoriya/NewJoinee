package com.example.Backendnjospring.Services;

import com.example.Backendnjospring.Entities.Feedback;
import com.example.Backendnjospring.Entities.Reply;
import com.example.Backendnjospring.ProjectionSchema.IFeedbackAndReply;
import com.example.Backendnjospring.Repositories.FeedbackRepository;
import com.example.Backendnjospring.Repositories.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReplyService {
    @Autowired
    ReplyRepository replyRepository;

    @Autowired
    FeedbackRepository feedbackRepository;

    public Reply createReply(int fdbkId, Reply reply){
        Feedback feedback = feedbackRepository.getById(fdbkId);
        reply.setFeedback(feedback);
        return  replyRepository.save(reply);
    }

    public List<IFeedbackAndReply> getReplies(int fdbkId){
        return replyRepository.getFeedbackReply(fdbkId);
    }



}
