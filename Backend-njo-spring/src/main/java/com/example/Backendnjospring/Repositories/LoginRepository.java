package com.example.Backendnjospring.Repositories;

import com.example.Backendnjospring.Entities.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface LoginRepository extends  JpaRepository<Login, Integer>{
    @Query(value = "SELECT *  FROM login  WHERE login.username LIKE  ?1",
            nativeQuery = true)
    public List<Login> findByUsername(String username);
    public Login getUserByUsername(@Param("username") String username);
}
