package com.example.Backendnjospring.Services;

import com.example.Backendnjospring.Entities.*;
import com.example.Backendnjospring.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Backendnjospring.Entities.DocumentEmployee;
import com.example.Backendnjospring.Repositories.DocumentEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Service
public class DocumentEmployeeService {
    @Autowired
    DocumentEmployeeRepository documentEmployeeRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    DocumentRepository documentRepository;

    public List<DocumentEmployee> getDocumentEmployee() {
        return documentEmployeeRepository.findAll();

    }

    public List<DocumentEmployee> listAllDocumentEmp(String keyword) {
        if (keyword != null) {
            return documentEmployeeRepository.search(keyword);
        }
        return null;}


    public DocumentEmployee getgetDocumentEmployeeById(String id) {
        return documentEmployeeRepository.findById(id).get();
    }

    public void deleteDocumentEmployee(String id) {
        documentEmployeeRepository.deleteById(id);
    }

    public List<DocumentEmployee> getAllDocumentEmployee(Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);

        Page<DocumentEmployee> pagedResult = documentEmployeeRepository.findAll(paging);

        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<DocumentEmployee>();
        }

    }


    public DocumentEmployee store(MultipartFile file, int id, int docId) throws IOException {
        Employee emp = employeeRepository.findById(id).get();
        Document doc   = documentRepository.findById(docId).get();
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        DocumentEmployee FileDB = new DocumentEmployee(fileName, file.getContentType(), file.getBytes(),emp,doc);

        return documentEmployeeRepository.save(FileDB);
    }

    public DocumentEmployee getFile(String id) {
//        List<DocumentEmployee> document = documentEmployeeRepository.getByEmpName(id);
        return documentEmployeeRepository.findById(id).get();
    }

    public Stream<DocumentEmployee> getAllFiles() {
        return documentEmployeeRepository.findAll().stream();
    }
}
