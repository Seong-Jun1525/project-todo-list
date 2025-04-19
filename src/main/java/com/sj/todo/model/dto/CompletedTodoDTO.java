package com.sj.todo.model.dto;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class CompletedTodoDTO {
	private List<Integer> no;
	private String status;
}
