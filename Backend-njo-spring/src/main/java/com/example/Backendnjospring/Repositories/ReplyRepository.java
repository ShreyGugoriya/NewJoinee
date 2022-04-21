package com.example.Backendnjospring.Repositories;

import com.example.Backendnjospring.Entities.Login;
import com.example.Backendnjospring.Entities.Reply;
import com.example.Backendnjospring.ProjectionSchema.IFeedbackAndReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyRepository extends JpaRepository<Reply,Integer> {

//    @Query(value = "SELECT e.emp_name  as EmpName, f.feedback_id as Fdbk_id  , f.description as Descritpion , r.reply as Reply , r.reply_by as ReplyBy From  feedback f Inner Join employee e On e.employee_id=f.employee_id left Join reply r on r.feedback_id =f.feedback_id where" +
////
    @Query(value = "SELECT e.emp_name  as EmpName, f.feedback_id as Fdbk_id  , f.description as Description, r.reply as Reply , r.reply_by as ReplyBy From  feedback f left Join employee e On e.employee_id=f.employee_id left Join reply r on r.feedback_id =f.feedback_id where" +

            "  f.feedback_id = ?1",
            nativeQuery = true)
    public List<IFeedbackAndReply> getFeedbackReply(int fdbkId);
}
