package com.nanuri.rams.com.config;

import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.nanuri.rams.com.interceptor.LoggerInterceptor;

import javax.servlet.MultipartConfigElement;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new LoggerInterceptor())
				.excludePathPatterns("/css/**"
									,"/fonts/**"
									,"/img/**"
									,"/js/**"
									,"/error"
									,"/static/*"
									,"/favicon.ico"
									,"/homepage/**"
									,"/sample/**"
									,"/login"
									); // Interceptor 예외
	}

	// @Bean
	// public CommonsMultipartResolver multipartResolver() {
	// 	CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
	// 	multipartResolver.setDefaultEncoding("UTF-8");
	// 	return multipartResolver;
	// }
}