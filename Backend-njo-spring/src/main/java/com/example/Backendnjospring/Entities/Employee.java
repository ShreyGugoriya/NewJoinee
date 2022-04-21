package com.example.Backendnjospring.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.List;


@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor

public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column( name = "employee_id")
    private int emp_id;

    private String roll_id;

    @NotBlank(message = "Name cannot be null")
    private String emp_name;
    private String emp_email;
    private String emp_address;
    private String emp_phone;
    private String designation ;
    private LocalDate joiningDate;
    private String profile;

    @Lob
    private byte[] profilePhoto;

    @JsonIgnore()
    @OneToMany(mappedBy = "employee",

            cascade = CascadeType.ALL)
    private List<Feedback> feedbacks;

    @JsonIgnore
    @OneToMany(mappedBy = "employee",cascade = CascadeType.ALL)
    private List<DocumentEmployee> documentEmployees;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn( name = "department_id")
    private Department department;



    @JsonBackReference
    @OneToOne ( mappedBy = "employee",cascade = CascadeType.ALL)

    private WelcomeKit welcomeKit;

    @JsonIgnore
    @OneToOne(mappedBy = "employee",cascade = CascadeType.ALL)
    private  Status status;

    @OneToOne(mappedBy = "employee", cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn
    private Login login;


    @JsonIgnore
    @OneToMany(mappedBy = "employee",cascade = CascadeType.ALL)
    private List<Notification> notifications;

}
