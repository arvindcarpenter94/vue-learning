package com.example.demo.persistence.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.persistence.model.Tutorial;

public interface TutorilaDao extends CrudRepository<Tutorial, Integer>{

	List<Tutorial> findByTitleLike(String string);

}
