package com.example.Backendnjospring.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class WelcomeKit {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private int kit_id;
    private String status;
    private boolean sent;
    private boolean recived;

    @OneToOne( cascade = CascadeType.PERSIST)
    @JsonIgnore
    @JoinColumn( name = "employee_id")
    private Employee employee;

}
