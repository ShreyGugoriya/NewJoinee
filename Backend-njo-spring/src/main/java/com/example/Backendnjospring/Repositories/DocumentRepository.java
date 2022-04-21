package com.example.Backendnjospring.Repositories;

import com.example.Backendnjospring.Entities.Department;
import com.example.Backendnjospring.Entities.Document;
import com.example.Backendnjospring.Entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Integer> {

}
