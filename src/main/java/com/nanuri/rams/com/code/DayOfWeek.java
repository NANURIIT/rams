package com.nanuri.rams.com.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum DayOfWeek {
	
	SUN("일"), 
	MON("월"), 
	TUE("화"), 
	WED("수"), 
	THU("목"), 
	FRI("금"), 
	SAT("토");
	
	String dayOfWeek;
	
}
