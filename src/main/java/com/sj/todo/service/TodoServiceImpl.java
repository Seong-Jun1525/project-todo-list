package com.sj.todo.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sj.todo.model.dao.TodoDAO;
import com.sj.todo.model.dto.TodoListDTO;
import com.sj.todo.model.dto.CompletedTodoDTO;
import com.sj.todo.model.vo.Todo;

@Service
public class TodoServiceImpl implements TodoService {
	
	private final TodoDAO todoDAO;
	
	@Autowired
	public TodoServiceImpl(TodoDAO todoDAO) {
		this.todoDAO = todoDAO;
	}

	@Override
	public int insertTodo(Todo todo) {
		return todoDAO.insertTodo(todo);
	}

	@Override
	public ArrayList<TodoListDTO> selectTodoList() {
		return todoDAO.selectTodoList();
	}

	@Override
	public int completedTodo(CompletedTodoDTO todoUpdateDTO) {
		return todoDAO.completedTodo(todoUpdateDTO);
	}

	@Override
	public Todo findTodoById(int no) {
		return todoDAO.findTodoById(no);
	}

	@Override
	public int deleteTodo(int no) {
		return todoDAO.deleteTodo(no);
	}

}
