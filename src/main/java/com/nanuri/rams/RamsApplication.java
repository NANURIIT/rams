package com.nanuri.rams;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RamsApplication {
	
	@PostConstruct
    public void config() {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
    }

	public static void main(String[] args) {
		SpringApplication.run(RamsApplication.class, args);
	}

}
