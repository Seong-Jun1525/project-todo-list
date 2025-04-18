package com.sj.todo.model.vo;

import java.sql.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class Todo {
	private int no;
	private String title;
	private String content;
	private String done;
	private Date regDate;
}
