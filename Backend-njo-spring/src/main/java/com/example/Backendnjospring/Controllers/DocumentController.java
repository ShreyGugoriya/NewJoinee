package com.example.Backendnjospring.Controllers;

import com.example.Backendnjospring.Entities.Department;
import com.example.Backendnjospring.Entities.Document;
import com.example.Backendnjospring.ProjectionSchema.DocumentEmployeeI;
import com.example.Backendnjospring.Services.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
public class DocumentController {
    @Autowired
    DocumentService documentService;

    // Get all document
    @RequestMapping(value = "/document/",method = RequestMethod.GET)
    public List<Document> getDocument(){
        try{
        return documentService.getDocument();
        }catch (Exception exception){
            System.out.println(exception);
            return null;
        }
    }

    // get document by document id
    @RequestMapping(value = "/document/{id}",method = RequestMethod.GET)
    public Document getDocumentById(@PathVariable("id") int id){
        try{
        return documentService.getDocumentById(id); }catch (Exception exception){
            System.out.println(exception);
            return null;
        }
    }

    // add documents
    @RequestMapping(value = "/document/",method = RequestMethod.POST)
    public Document createDocument(@RequestBody Document document){
        try{
        return documentService.createDocument(document);}catch (Exception exception){
            System.out.println(exception);
            return null;
        }
    }

    // update documents by document ID
    @RequestMapping(value = "/document/{id}",method = RequestMethod.PUT)
    public Document updateDocument(@RequestBody Document document){
        try{
        return documentService.updateDocument(document);}catch (Exception exception){
            System.out.println(exception);
            return null;
        }
    }

    // delete document by document ID
    @RequestMapping(value = "/document/{id}",method = RequestMethod.DELETE)
    public void deleteDocument(@PathVariable("id") int id){
        try{
        documentService.deleteDocument(id);
        }catch (Exception exception){
            System.out.println(exception);
        }
    }

    // Pagination to all the documents
    @GetMapping("/document/pagination/{offset}/{pageSize}")
    public Page<Document> getDocumentWithPagination(@PathVariable("offset") int offset, @PathVariable("pageSize") int pageSize){
        try{

            Page<Document> allPagedDocument = documentService.DocumentWithPagination(offset,pageSize);
        return allPagedDocument;
        }catch (Exception exception){
            System.out.println(exception);
            return null;
        }
    }


}
