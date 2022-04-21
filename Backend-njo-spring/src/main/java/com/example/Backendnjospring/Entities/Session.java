package com.example.Backendnjospring.Entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.time.LocalDate;

import java.util.Date;
import java.util.HashSet;

import java.util.List;

@Entity
@Getter
@Setter
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "session_id")
    private int ses_id;

    @Column(name = "session_name")
    private  String  sesName;

    @Column(name = "session_desc")
    private String ses_desc;



    @Column( name = "session_date")
    private LocalDate sesDate;


    @Column( name = "session_duration")
    private String ses_duration;

    @Column( name = "session_link")
    private String ses_link;

    @JsonIgnore
    @ManyToMany( cascade = CascadeType.PERSIST,mappedBy = "session")
    private List<Department> department;
}
