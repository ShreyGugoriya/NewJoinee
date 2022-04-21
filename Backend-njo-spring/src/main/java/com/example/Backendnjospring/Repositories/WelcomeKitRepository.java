package com.example.Backendnjospring.Repositories;

import com.example.Backendnjospring.Entities.Employee;
import com.example.Backendnjospring.Entities.WelcomeKit;
import com.example.Backendnjospring.ProjectionSchema.IEmployeeAndKit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WelcomeKitRepository extends JpaRepository<WelcomeKit, Integer> {
    @Query(value = "Select e.employee_id as EmpId,e.emp_name as EmpName,e.emp_email as Emp_email, e.emp_address as EmpAddress, e.emp_phone as EmpPhone, e.designation as Designation, e.joining_date as JoiningDate,e.department_id as DepartmentId" +
            "  ,k.kit_id as Kit_id,k.recived as Recived, k.sent as Sent,k.status as status" +
                    "  from employee e left join welcome_kit  k on e.employee_id=k.employee_id left join department d on d.department_id= e.department_id"
            +" where  k.kit_id LIKE %?1%"
            +" OR k.status LIKE %?1%"
            +" OR d.department_name LIKE %?1%"
            +" OR e.emp_name LIKE %?1%"
            +"  OR e.designation LIKE %?1%"

                     ,nativeQuery = true
    )
    public List<IEmployeeAndKit> search(String keyword);


    @Query(value = "Select e.employee_id as EmpId,e.emp_name as EmpName,e.emp_email as Emp_email, e.emp_address as EmpAddress, e.emp_phone as EmpPhone, e.designation as Designation, e.joining_date as JoiningDate,e.department_id as DepartmentId," +
            "  k.kit_id as Kit_id,k.recived as Recived, k.sent as Sent,k.status as status" +
            "  from employee e left join welcome_kit k on e.employee_id=k.employee_id",nativeQuery = true )
    public  List<IEmployeeAndKit> getEmployeeAndKit();

    @Query(value="Select * from welcome_kit k where k.employee_id = ?1", nativeQuery = true)
    public WelcomeKit getWelcomeKitByEmployee(int id);

    @Query(value = "Select e.employee_id as EmpId,e.emp_name as EmpName,e.emp_email as Emp_email, e.emp_address as EmpAddress, e.emp_phone as EmpPhone, e.designation as Designation, e.joining_date as JoiningDate,e.department_id as DepartmentId," +
            "  k.kit_id as Kit_id,k.recived as Recived, k.sent as Sent,k.status as status" +
            "  from employee e left join welcome_kit k on e.employee_id=k.employee_id where k.status Like %?1%",nativeQuery = true )
    public  List<IEmployeeAndKit> getByStatus(String status);
    @Query(value = "Select e.employee_id as EmpId,e.emp_name as EmpName,e.emp_email as Emp_email, e.emp_address as EmpAddress, e.emp_phone as EmpPhone, e.designation as Designation, e.joining_date as JoiningDate,e.department_id as DepartmentId," +
            "  k.kit_id as Kit_id,k.recived as Recived, k.sent as Sent,k.status as status" +
            "  from employee e left join welcome_kit k on e.employee_id=k.employee_id where k.kit_id is NULL",nativeQuery = true )
    public  List<IEmployeeAndKit> getByNoStatus();

    @Query(value = "Select e.employee_id as EmpId,e.emp_name as EmpName,e.emp_email as Emp_email, e.emp_address as EmpAddress, e.emp_phone as EmpPhone, e.designation as Designation, e.joining_date as JoiningDate,e.department_id as DepartmentId," +
            "  k.kit_id as Kit_id,k.recived as Recived, k.sent as Sent,k.status as status" +
            "  from employee e left join welcome_kit k on e.employee_id=k.employee_id inner join department d on d.department_id = e.department_id where d.department_name LIKE %?1% ",nativeQuery = true )
    public  List<IEmployeeAndKit> getByDept(String deptName);


}
