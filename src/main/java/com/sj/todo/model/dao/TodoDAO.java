package com.sj.todo.model.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.sj.todo.model.dto.TodoListDTO;
import com.sj.todo.model.dto.UpdateTodoDTO;
import com.sj.todo.model.dto.CompletedTodoDTO;
import com.sj.todo.model.vo.Todo;

@Mapper
public interface TodoDAO {

	int insertTodo(Todo todo);

	ArrayList<TodoListDTO> selectTodoList();

	int completedTodo(CompletedTodoDTO todoUpdateDTO);

	Todo findTodoById(int no);

	int deleteTodo(int no);

	int updateTodo(UpdateTodoDTO updateTodoDTO);

}
