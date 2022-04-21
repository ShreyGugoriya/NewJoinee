package com.example.Backendnjospring.Services;

import com.example.Backendnjospring.Entities.Document;
import com.example.Backendnjospring.Entities.DocumentEmployee;
import com.example.Backendnjospring.Entities.Employee;
import com.example.Backendnjospring.Entities.Status;
import com.example.Backendnjospring.Repositories.EmployeeRepository;
import com.example.Backendnjospring.Repositories.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StatusService {

    @Autowired
    private DocumentEmployeeService documentEmployeeService;
    @Autowired
    private DocumentService documentService;
    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Status> getAllStatus(){
        return  statusRepository.findAll();
    }

    public  Status updateStatus(Status status){
      return  statusRepository.save(status);
    }

    public Status updateSubmit(int id){
        Status status = statusRepository.getByEmployeeId(id);
        status.setDocumentSubmitted(true);
        return statusRepository.save(status);
    }

    public Status updateApproved(int id){
//       Status status = statusRepository.getById(id);
        Status status = statusRepository.getByEmployeeId(id);
        if( status.isDocumentSubmitted())
        {status.setDocumentApproved(true);
                return  statusRepository.save(status);}

        return null;
    }

    public  Status createStatus(Employee employee){
        Status status = new Status(false,false,employee);
        return statusRepository.save(status);
    }

    public Status getStatusByEmployee( int id){
        Status status = statusRepository.getByEmployeeId(id);
        return status;
    }
    public Boolean checkFileSizeByEmpId(int  id){
        List<DocumentEmployee> docEmpFilesSize = documentEmployeeService.getAllFiles().filter(dbFile-> dbFile.getEmployee().getEmp_id()==id).collect(Collectors.toList());
        int sizeofemployedoc = docEmpFilesSize.size();
        List<Document> getdocsSize = documentService.getDocument();
        int sizeofdocs= getdocsSize.size();

        if(sizeofdocs == sizeofemployedoc)
            return true;
        else
            return false;
    }

}
