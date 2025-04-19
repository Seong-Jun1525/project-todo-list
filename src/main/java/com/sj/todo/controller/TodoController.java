package com.sj.todo.controller;

import java.util.ArrayList;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import com.sj.todo.model.dto.TodoListDTO;
import com.sj.todo.model.vo.Todo;
import com.sj.todo.service.TodoServiceImpl;

@Controller
public class TodoController {
	private final TodoServiceImpl todoService;

	@Autowired
	public TodoController(TodoServiceImpl todoService) {
		this.todoService = todoService;
	}
	
	@GetMapping("/")
	public String main(Model model) {
		ArrayList<TodoListDTO> todoList = todoService.selectTodoList();
		
		// for(TodoListDTO t : todoList) System.out.println(t);
		
		model.addAttribute("todoList", todoList);
		
		return "index";
	}
	
	@PostMapping("/todos")
	public String registerTodo(Todo todo) {
		System.out.println("요청!");
		System.out.println(todo);
		
		int result = todoService.insertTodo(todo);
		
		if(result > 0) {
			return "redirect:/";
		} else {
			// TODO: 에러페이지 구현
		}

		return "redirect:/";
	}
}
