package com.example.Backendnjospring.ProjectionSchema;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class EmployeeAndKit {
    private int kit_id;
    private String status;
    private boolean sent;
    private boolean recived;
    private int emp_id;
    private String emp_name;
    private String emp_email;
    private String emp_address;
    private String emp_phone;
    private String designation ;
    private String joiningDate;



    public EmployeeAndKit(int kit_id, String status, boolean sent, boolean recived, int emp_id, String emp_name, String emp_email, String emp_address, String  emp_phone, String designation, String joiningDate) {
        this.kit_id = kit_id;
        this.status = status;
        this.sent = sent;
        this.recived = recived;
        this.emp_id = emp_id;
        this.emp_name = emp_name;
        this.emp_email = emp_email;
        this.emp_address = emp_address;
        this.emp_phone = emp_phone;
        this.designation = designation;
        this.joiningDate = joiningDate;
    }
}
