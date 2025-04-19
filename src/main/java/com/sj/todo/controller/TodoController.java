package com.sj.todo.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
	
	// 할 일 상세 모달
	@GetMapping("/todos")
	@ResponseBody
	public Todo findTodoById(int no) {
		System.out.println(no);
		
		Todo todo = todoService.findTodoById(no);
		
		return todo;
	}
	
	// 할 일 수정 페이지
	@GetMapping("/todos/edit")
	public String updateTodoPage(int no, Model model) {
		System.out.println("수정!! : " + no);
		Todo todo = todoService.findTodoById(no);
		
		System.out.println(todo);
		
		model.addAttribute("todo", todo);
		
		return "/pages/updateTodo";
	}
}
