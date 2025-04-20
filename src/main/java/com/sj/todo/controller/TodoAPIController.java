package com.sj.todo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sj.todo.model.dto.CompletedTodoDTO;
import com.sj.todo.model.vo.Todo;
import com.sj.todo.service.TodoServiceImpl;

@RestController
@RequestMapping("/api")
public class TodoAPIController {
	private final TodoServiceImpl todoService;

	@Autowired
	public TodoAPIController(TodoServiceImpl todoService) {
		this.todoService = todoService;
	}

	// 할 일 등록 처리
	@PostMapping("/todos")
	@ResponseBody
	public String registerTodo(Todo todo) {
		System.out.println("요청!");
		System.out.println(todo);
		
		int result = todoService.insertTodo(todo);
		
		if(result > 0) {
			return "success";
		} else {
			return "failed";
		}
	}
	
	// 할 일 완료 처리
	@PatchMapping("/todos")
	@ResponseBody
	public String completedTodo(CompletedTodoDTO todoUpdateDTO) {
		System.out.println(todoUpdateDTO);
		
		int result = todoService.completedTodo(todoUpdateDTO);
		
		if(result > 0) {
			return "success";
		} else {
			return "failed";
		}
	}
	
	// 할 일 수정
	@PutMapping("/todos")
	public String updateTodo() {
		return "";
	}
	
	// 할 일 삭제 처리
	@DeleteMapping("/todos")
	@ResponseBody
	public String deleteTodo(int no) {
		System.out.println(no);
		
		int result = todoService.deleteTodo(no);
		
		if(result > 0) {
			return "success";
		} else {
			return "failed";
		}
	}
}
