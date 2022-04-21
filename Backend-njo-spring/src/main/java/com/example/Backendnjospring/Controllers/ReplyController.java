package com.example.Backendnjospring.Controllers;

import com.example.Backendnjospring.Entities.Reply;
import com.example.Backendnjospring.ProjectionSchema.IFeedbackAndReply;
import com.example.Backendnjospring.Services.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReplyController {
    @Autowired
    ReplyService replyService;

    // Send reply by feedback ID
    @RequestMapping(value="/reply/{fdId}/", method = RequestMethod.POST)
    public Reply createReply( @PathVariable("fdId") int fdId, @RequestBody Reply reply){
        try{
         return       replyService.createReply(fdId,reply);
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }

    // Get reply by feedback ID
    @RequestMapping(value="/reply/{fdId}/", method = RequestMethod.GET)
    public List<IFeedbackAndReply> getReplies(@PathVariable("fdId") int fdId){
        try{
        return  replyService.getReplies(fdId);
        }catch (Exception exception){
            System.out.println(exception);
            return  null;
        }
    }
}
