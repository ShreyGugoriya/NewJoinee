package com.example.Backendnjospring.Repositories;

import com.example.Backendnjospring.Entities.Department;
import com.example.Backendnjospring.Entities.DocumentEmployee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DocumentEmployeeRepository extends JpaRepository<DocumentEmployee,String> {
    @Query(value = "SELECT * FROM document_employee docE inner join employee e on docE.employee_id = e.employee_id inner join document doc on docE.document_id = doc.document_id" +
            "  where doc.doc_name LIKE %?1%"
            +"  OR e.emp_name  LIKE %?1% "
            +"  OR doc.document_id LIKE %?1%"



            ,nativeQuery = true
    )
    public List<DocumentEmployee> search(String keyword);

//    @Query(value = "Select * from document_employee docE inner join employee e on docE.employee_id = e.employee_id where e.employee_id == ?1")
//    public List<DocumentEmployee> getByEmpName(int keyword);
}
