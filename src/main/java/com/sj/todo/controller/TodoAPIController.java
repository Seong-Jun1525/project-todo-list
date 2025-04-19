package com.sj.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sj.todo.model.dto.TodoUpdateDTO;
import com.sj.todo.service.TodoServiceImpl;

@RestController
@RequestMapping("/api")
public class TodoAPIController {
	private final TodoServiceImpl todoService;

	@Autowired
	public TodoAPIController(TodoServiceImpl todoService) {
		this.todoService = todoService;
	}
	
	// 할 일 완료 처리
	@PatchMapping("/todos")
	@ResponseBody
	public String updateTodo(TodoUpdateDTO todoUpdateDTO) {
		System.out.println(todoUpdateDTO);
		
		int result = todoService.updateTodo(todoUpdateDTO);
		
		if(result > 0) {
			return "success";
		} else {
			return "failed";
		}
	}
}
