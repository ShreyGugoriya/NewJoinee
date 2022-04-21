package com.example.Backendnjospring.ProjectionSchema;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SessionAndDepartment {
    private int ses_id;
    private String sesName;
    private String ses_desc;
    private String sesDate;
    private String ses_duration;
    private String ses_link;
    private int dept_id;
    private  String  dept_name;
    private  String dept_desc;

}
