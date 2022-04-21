package com.example.Backendnjospring.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
public class DepartmentCount {


//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;
    @Id
    @Column(name = "department_id")
    private int dept_id;

    @Column(name = "department_name")
    private  String  dept_name;

    @Column(name="count")
    private  int count;

    public DepartmentCount(int dept_id, String dept_name, int count) {
        this.dept_id = dept_id;
        this.dept_name = dept_name;
        this.count = count;
    }

    public DepartmentCount(){

    };
}

