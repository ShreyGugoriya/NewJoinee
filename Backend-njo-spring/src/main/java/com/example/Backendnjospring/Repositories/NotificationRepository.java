package com.example.Backendnjospring.Repositories;

import com.example.Backendnjospring.Entities.Notification;
import com.example.Backendnjospring.ProjectionSchema.IFeedbackAndReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    @Query(value = "SELECT * from notification where employee_employee_id = ?1",
            nativeQuery = true)
    public List<Notification> getNotificationbyEmployeeId (int empId);
}
