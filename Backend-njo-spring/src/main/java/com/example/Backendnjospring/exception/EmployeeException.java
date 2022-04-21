package com.example.Backendnjospring.exception;

public class EmployeeException extends  RuntimeException{

    public EmployeeException() {
        super();
    }
    public EmployeeException(String message, Throwable cause) {
        super(message, cause);
    }
    public EmployeeException(String message) {
        super(message);
    }
    public EmployeeException(Throwable cause) {
        super(cause);
    }
}
