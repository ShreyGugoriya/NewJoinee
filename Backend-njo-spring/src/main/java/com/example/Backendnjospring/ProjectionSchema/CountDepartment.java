package com.example.Backendnjospring.ProjectionSchema;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class CountDepartment {
    private int departmentId;
    private int departmentCount;

    public CountDepartment(int departmentId, int departmentCount) {
        this.departmentId = departmentId;
        this.departmentCount = departmentCount;
    }
}
