package com.example.Backendnjospring.Entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Getter
@Setter
@Entity
public class Login {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "login_id")
    private int id;
    @Column(name="username")
    private  String username;
    @Column(name = "password")
    private String password;

    @OneToOne
    @JoinColumn(name="employee_id", referencedColumnName ="employee_id")

//    @OneToOne( cascade = CascadeType.ALL)
//    @JoinColumn( name = "employee_id")

    private Employee employee;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "login_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

//    @OneToOne( cascade = CascadeType.ALL)
//    @JoinColumn( name = "employee_id")
//    private Employee employee;
//>>>>>>> 686dcba757f82c7f245136d7ba468d19ddfe39be


    public Login(String username, String password, Employee employee) {
        this.username = username;
        this.password = password;
        this.employee = employee;
    }

    public Login() {
    }
}