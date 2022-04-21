package com.example.Backendnjospring.Repositories;

import com.example.Backendnjospring.Entities.Employee;
import com.example.Backendnjospring.Entities.Feedback;
import com.example.Backendnjospring.ProjectionSchema.IEmployeeAndFeedback;
import com.example.Backendnjospring.ProjectionSchema.IEmployeeAndKit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback,Integer> {
    @Query(value ="Select e.employee_id as EmpId,e.emp_name as EmpName,e.emp_email as Emp_email, e.emp_address as EmpAddress, e.emp_phone as EmpPhone, e.designation as Designation, e.joining_date as JoiningDate,e.department_id as DepartmentId," +
            "  f.feedback_id as FdbkId,f.description as Description, f.type as Type" +
            " FROM feedback f inner join employee e on e.employee_id = f.employee_id where f.feedback_id LIKE %?1%"
            +"  OR f.description  LIKE %?1% "
            +"  OR f.type LIKE %?1%"
            +"  OR f.employee_id LIKE %?1%"
            +"  OR e.emp_name LIKE %?1%"


            ,nativeQuery = true
    )
    public List<IEmployeeAndFeedback> search(String keyword);

    @Query(value = "Select e.employee_id as EmpId,e.emp_name as EmpName,e.emp_email as Emp_email,e.emp_address as EmpAddress, e.emp_phone as EmpPhone, e.designation as Designation, e.joining_date as JoiningDate,e.department_id as DepartmentId," +
            "  f.feedback_id as FdbkId,f.reply as Reply, f.description as Description, f.type as Type" +
            "  from employee e inner join feedback f on e.employee_id=f.employee_id",nativeQuery = true )
    public  List<IEmployeeAndFeedback> getEmployeeAndFeedback();

    @Query(value = "Select e.employee_id as EmpId,e.emp_name as EmpName,e.emp_email as Emp_email,e.emp_address as EmpAddress, e.emp_phone as EmpPhone, e.designation as Designation, e.joining_date as JoiningDate,e.department_id as DepartmentId," +
            "  f.feedback_id as FdbkId,f.reply as Reply, f.description as Description, f.type as Type" +
            "  from employee e inner join feedback f on e.employee_id=f.employee_id where f.status=true",nativeQuery = true )
    public  List<IEmployeeAndFeedback> getEmployeeAndFeedbackOnlyTrue();
}

