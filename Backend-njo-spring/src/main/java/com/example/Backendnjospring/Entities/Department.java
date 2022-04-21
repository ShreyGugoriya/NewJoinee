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
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "department_id")
    private int dept_id;

    @Column(name = "department_name")
    private  String  dept_name;

    @Column(name = "department_desc")
    private  String dept_desc;

    @JsonIgnore
    @JsonManagedReference
    @ManyToMany(
            cascade = {
                    CascadeType.ALL
            })
    @JoinTable(
            name = "Session_Department",
            joinColumns = {@JoinColumn(name="department_id")},
            inverseJoinColumns = {
                    @JoinColumn(name = "session_id")
            }
    )
    private List<Session> session;

    @JsonIgnore
    @OneToMany(mappedBy = "department",cascade = CascadeType.ALL)
    private List<Employee> employees;





//    @JsonIgnore
//    @OneToMany( mappedBy = "department")
//    private Set<Employee> employees;

}

