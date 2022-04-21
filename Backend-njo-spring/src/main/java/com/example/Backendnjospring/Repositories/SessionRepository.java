package com.example.Backendnjospring.Repositories;

import java.math.BigDecimal;
import java.sql.Date;
import com.example.Backendnjospring.Entities.Session;
import com.example.Backendnjospring.ProjectionSchema.ISessionAndDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SessionRepository extends JpaRepository<Session,Integer> {
//    @Query(value = "SELECT * FROM session INNER JOIN department ON session.department_id = department.department_id WHERE department.department_name LIKE %?1%" +" OR session.session_name LIKE %?1%"
//     ,nativeQuery = true
//    )


    @Query(value = "SELECT * FROM session s INNER JOIN session_department sd ON sd.session_id = s.session_id INNER JOIN department d " +
            "             on sd.department_id = d.department_id WHERE d.department_name LIKE %?1%" +" OR s.session_name LIKE %?1% "+
            " OR s.session_date LIKE %?1%"+
            " OR s.session_duration  LIKE %?1%"

            ,nativeQuery = true
    )
    List<Session> search(String keyword);


    @Query(value = "SELECT s.session_id as Ses_id, s.session_desc as Ses_desc, s.session_name as SesName, s.session_duration as Ses_duration, s.session_date as SesDate, s.session_link as Ses_link," +
            " d.department_id as Dept_id, d.department_name as Dept_name, d.department_desc as Dept_desc FROM session s INNER JOIN session_department sd ON sd.session_id = s.session_id INNER JOIN department d" +
            " on sd.department_id = d.department_id" ,nativeQuery = true )

    List<ISessionAndDepartment> getSessionAndDepartment();



    @Query(value = "SELECT s.session_id as Ses_id, s.session_desc as Ses_desc, s.session_name as SesName, s.session_duration as Ses_duration, s.session_date as SesDate, s.session_link as Ses_link," +
            " d.department_id as Dept_id, d.department_name as Dept_name, d.department_desc as Dept_desc FROM session s INNER JOIN session_department sd ON sd.session_id = s.session_id INNER JOIN department d" +
            " on sd.department_id = d.department_id order By s.session_date" ,nativeQuery = true )
    List<ISessionAndDepartment> getOrderByDate();

    @Query(value = "SELECT s.session_id as Ses_id, s.session_desc as Ses_desc, s.session_name as SesName, s.session_duration as Ses_duration, s.session_date as SesDate, s.session_link as Ses_link," +
            " d.department_id as Dept_id, d.department_name as Dept_name, d.department_desc as Dept_desc FROM session s INNER JOIN session_department sd ON sd.session_id = s.session_id INNER JOIN department d" +
            " on sd.department_id = d.department_id order By s.session_name" ,nativeQuery = true )
    List<ISessionAndDepartment> getOrderByName();

    @Query(value = "SELECT s.session_id as Ses_id, s.session_desc as Ses_desc, s.session_name as SesName, s.session_duration as Ses_duration, s.session_date as SesDate, s.session_link as Ses_link," +
            " d.department_id as Dept_id, d.department_name as Dept_name, d.department_desc as Dept_desc FROM session s INNER JOIN session_department sd ON sd.session_id = s.session_id INNER JOIN department d" +
            " on sd.department_id = d.department_id order By d.department_name" ,nativeQuery = true )
    List<ISessionAndDepartment> getOrderByDepartment();

}
