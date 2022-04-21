package com.example.Backendnjospring.Services;

import com.example.Backendnjospring.Entities.Department;
import com.example.Backendnjospring.Entities.Document;
import com.example.Backendnjospring.Entities.DocumentEmployee;
import com.example.Backendnjospring.Repositories.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class DocumentService {
    @Autowired
    DocumentRepository documentRepository;

    public List<Document> getDocument() {
        return documentRepository.findAll();
    }

    public Document getDocumentById(int id) {
        return documentRepository.findById(id).get();
    }

    public Document createDocument(Document document) {
        return documentRepository.save(document);
    }

    public Document updateDocument(Document document) {
        return documentRepository.save(document);
    }

    public void deleteDocument(int id) {
        documentRepository.deleteById(id);
    }

    public Page<Document> DocumentWithPagination(int offset, int pageSize){
        Page<Document> documentPaged = documentRepository.findAll(PageRequest.of(offset,pageSize));
        return  documentPaged;
    }



}
