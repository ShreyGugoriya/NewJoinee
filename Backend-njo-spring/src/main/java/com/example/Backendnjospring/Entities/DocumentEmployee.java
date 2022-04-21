package com.example.Backendnjospring.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DocumentEmployee {
//    @Id
//    @GeneratedValue( strategy = GenerationType.IDENTITY)
//    private int id;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String name;

    private String type;



    @Lob
    private byte[] data;


    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn( name = "employee_id")
    private Employee employee;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn( name = "document_id")
    private Document document;

    public DocumentEmployee(String name, String type, byte[] data, Employee employee, Document document) {
        this.name = name;
        this.type = type;
        this.data = data;
        this.employee = employee;
        this.document = document;
    }
}
