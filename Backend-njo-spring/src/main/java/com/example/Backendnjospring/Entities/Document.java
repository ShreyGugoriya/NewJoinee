package com.example.Backendnjospring.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
public class Document {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    @Column( name = "document_id")
    private int doc_id;
    private String doc_name;

    @JsonIgnore
    @OneToMany( mappedBy = "document", cascade = CascadeType.ALL)
    private List<DocumentEmployee> documentEmployees;


    public Document(String doc_name, List<Employee> employees) {
        this.doc_name = doc_name;
    }

    public Document() {
    }
}
