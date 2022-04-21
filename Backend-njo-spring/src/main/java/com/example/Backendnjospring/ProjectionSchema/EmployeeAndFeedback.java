package com.example.Backendnjospring.ProjectionSchema;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeAndFeedback {
    private int emp_id;
    private String emp_name;
    private String emp_email;
    private String emp_address;
    private String emp_phone;
    private String designation ;
    private String joiningDate;
    private int fdbk_id;
    private String description;
    private String type;
    private String reply;
}
