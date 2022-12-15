package com.nanuri.rams.com.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.nanuri.rams.com.interceptor.LoggerInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new LoggerInterceptor())
				.excludePathPatterns("/css/**"
									,"/font-awesome/**"
									,"/fonts/**"
									,"/images/**"
									,"/js/**"
									,"/error"
									,"/static/*"
									,"/favicon.ico"
									,"/sample/**"
									,"/login"
									); // Interceptor 예외
	}

	@Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/login").setViewName("login");
        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
    }
	
}