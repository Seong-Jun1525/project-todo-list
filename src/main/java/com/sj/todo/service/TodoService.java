package com.sj.todo.service;

import java.util.ArrayList;

import com.sj.todo.model.dto.TodoListDTO;
import com.sj.todo.model.dto.CompletedTodoDTO;
import com.sj.todo.model.vo.Todo;

public interface TodoService {
	ArrayList<TodoListDTO> selectTodoList();
	int insertTodo(Todo todo);
	int updateTodo(CompletedTodoDTO todoUpdateDTO);
	Todo findTodoById(int no);
	int deleteTodo(int no);
}
