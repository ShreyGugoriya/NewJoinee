package com.example.Backendnjospring.Controllers;


import com.example.Backendnjospring.Entities.*;
import com.example.Backendnjospring.Services.DocumentEmployeeService;
import com.example.Backendnjospring.Services.DocumentService;
import com.example.Backendnjospring.message.ResponseFile;
import com.example.Backendnjospring.message.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backendnjospring.Entities.DocumentEmployee;
import com.example.Backendnjospring.Services.DocumentEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class DocumentEmployeeController {
    @Autowired
    DocumentEmployeeService documentEmployeeService;

    @Autowired
    DocumentService documentService;

    @RequestMapping(value = "/document/filter/{keyword}",method = RequestMethod.GET)
    public List<DocumentEmployee> viewFilter(Model model, @PathVariable("keyword") String keyword) {
        try {
            List<DocumentEmployee> listDepartment = documentEmployeeService.listAllDocumentEmp(keyword);
            return listDepartment;
        }catch (Exception exception){
            System.out.println(exception);
            return null;
        }
    }


    @GetMapping("/documentEmployee/pagination")
    public ResponseEntity<List<DocumentEmployee>> getAllDocumentEmployee(
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "10") Integer pageSize)

    {
        try {
        List<DocumentEmployee> list = documentEmployeeService.getAllDocumentEmployee(pageNo, pageSize);

        return new ResponseEntity<List<DocumentEmployee>>(list, new HttpHeaders(), HttpStatus.OK);
        }catch (Exception exception){
            System.out.println(exception);
            return null;
        }
    }

    // Upload document of particular employee {employee ID } { Document type ID }
    @PostMapping("/upload/{id}/{docId}")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file, @PathVariable("id") int id, @PathVariable("docId") int docId) {
        String message = "";
        try {
            documentEmployeeService.store(file, id,docId);

            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    // get all the documents uploaded by all the employees
    @GetMapping("/files")
    public ResponseEntity<List<ResponseFile>> getListFiles() {
        try {
        List<ResponseFile> files = documentEmployeeService.getAllFiles().map(dbFile -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/files/")
                    .path(dbFile.getId())
                    .toUriString();

            return new ResponseFile(
                    dbFile.getName(),
                    fileDownloadUri,
                    dbFile.getType(),
                    dbFile.getData().length);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(files); }catch (Exception exception){
            System.out.println(exception);
            return null;
        }
    }

    // Get the document by document ID
    @GetMapping("/files/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        try {
        DocumentEmployee fileDB = documentEmployeeService.getFile(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
                .body(fileDB.getData());
        }catch (Exception exception){
            System.out.println(exception);
            return null;
        }
    }

    // Get all the documents of a particular employee {employee ID}
    @GetMapping("/files/emp/{id}")
    public  ResponseEntity<List<ResponseFile>>getFileByEmpId(@PathVariable int  id) {
        try {
        List<DocumentEmployee> docEmpFiles = documentEmployeeService.getAllFiles().filter(dbFile-> dbFile.getEmployee().getEmp_id()==id).collect(Collectors.toList());
        List<ResponseFile> files = new ArrayList<>();

        for(DocumentEmployee dbFile: docEmpFiles){
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/files/")
                    .path(dbFile.getId())
                    .toUriString();

            files.add(new ResponseFile(
                    dbFile.getName(),
                    fileDownloadUri,
                    dbFile.getType(),
                    dbFile.getData().length)
            );}

        return ResponseEntity.status(HttpStatus.OK).body(files);
        }catch (Exception exception){
            System.out.println(exception);
            return null;
        }

    }

}