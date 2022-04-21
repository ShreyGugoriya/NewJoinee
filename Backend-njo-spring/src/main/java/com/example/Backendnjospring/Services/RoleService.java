package com.example.Backendnjospring.Services;

import com.example.Backendnjospring.Entities.Role;
import com.example.Backendnjospring.Repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {
    @Autowired
    RoleRepository roleRepository;


    public Role createRole(Role role) {
        return  roleRepository.save(role);
    }

    public List<Role> getRoles() {
        return  roleRepository.findAll();
    }

    public Role getRolesById(int id) {
        return  roleRepository.findById(id).get();
    }

    public Role updateRoleById(int id, Role role) {
        Role role1 =roleRepository.getById(id);
        role1.setName(role.getName());
        role1.setDesc(role.getDesc());
        return  roleRepository.save(role1);
    }

    public Role deleteRoleById(int id) {
        Role role= roleRepository.getById(id);
       roleRepository.deleteById(id);
        return  role;
    }
}
