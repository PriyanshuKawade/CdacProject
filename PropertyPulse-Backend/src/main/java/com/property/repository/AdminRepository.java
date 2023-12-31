package com.property.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.property.models.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {

}
