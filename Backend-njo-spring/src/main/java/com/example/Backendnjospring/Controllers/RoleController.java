package com.example.Backendnjospring.Controllers;

import com.example.Backendnjospring.Entities.Role;
import com.example.Backendnjospring.Services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RoleController {

    @Autowired
    RoleService roleService;

    @RequestMapping(value = "/role/",method = RequestMethod.POST)
    public Role createRole(@RequestBody  Role role){
        return roleService.createRole(role);
    }

    @RequestMapping(value = "/role/",method = RequestMethod.GET)
    public List<Role> getRoles(){
        return roleService.getRoles();
    }

    @RequestMapping(value = "/role/{id}/",method = RequestMethod.PUT)
    public Role updateRole(@PathVariable("id") int id, @RequestBody Role role){
        return roleService.updateRoleById(id,role);
    }
    @RequestMapping(value = "/role/{id}/",method = RequestMethod.DELETE)
    public Role deleteRole(@PathVariable("id") int id){
        return roleService.deleteRoleById(id);
    }
}
