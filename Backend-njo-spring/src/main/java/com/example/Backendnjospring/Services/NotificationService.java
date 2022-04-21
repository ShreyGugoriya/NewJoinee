package com.example.Backendnjospring.Services;

import com.example.Backendnjospring.Entities.Notification;
import com.example.Backendnjospring.Repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class NotificationService {

    @Autowired
    NotificationRepository notificationRepository;

    public List<Notification> getNotification() {
        return notificationRepository.findAll();
    }

    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public void deleteNotification(int id) {
        notificationRepository.deleteById(id);
    }

    public List<Notification> getNotificationById(int empId) {
        return notificationRepository.getNotificationbyEmployeeId(empId);
    }
}
