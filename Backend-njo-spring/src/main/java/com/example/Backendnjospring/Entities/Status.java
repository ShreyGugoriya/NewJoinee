package com.example.Backendnjospring.Entities;

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
public class Status {

    @Id
    @Column(name = "status_id")
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private int statusId;

    private boolean documentApproved;
    private boolean documentSubmitted;


    @OneToOne(cascade = CascadeType.PERSIST)
    private  Employee employee;

    public  Status(boolean documentSubmitted, boolean documentApproved, Employee employee){
        this.documentSubmitted=documentSubmitted;
        this.documentApproved=documentApproved;
        this.employee=employee;

    }
}
