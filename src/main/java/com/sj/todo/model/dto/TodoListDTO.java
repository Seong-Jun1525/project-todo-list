package com.sj.todo.model.dto;

import java.sql.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class TodoListDTO {
	private int no;
	private String title;
	private String done;
	private Date regDate;
}
