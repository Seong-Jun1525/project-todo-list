package com.sj.todo.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class UpdateTodoDTO {
	private int no;
	private String title;
	private String content;
}
