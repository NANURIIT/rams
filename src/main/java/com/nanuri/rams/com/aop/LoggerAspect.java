package com.nanuri.rams.com.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@Aspect
public class LoggerAspect {
	
	@Around("execution(* com.nanuri.rams.business..controller.*Controller.*(..)) and "
			+ "!execution(* com.nanuri.rams.business..controller.LoginController.*(..)) or "
			+ "execution(* com.nanuri.rams.business..service.*Service.*(..)) or "
			// + "execution(* com.nanuri.rams.business..repository.*Repository.*(..)) or "
			+ "execution(* com.nanuri.rams.business..mapper.*Mapper.*(..))")
	public Object printLog(ProceedingJoinPoint joinPoint) throws Throwable {

		String type = "";
		String name = joinPoint.getSignature().getDeclaringTypeName();

		if (name.contains("Controller") == true) {
			type = "##### Controller ===> ";
		}

		if (name.contains("Service") == true) {
			type = "##### Service    ===> ";
		}

		if (name.contains("Repository") == true) {
			type = "##### Repository ===> ";
		}

		if (name.contains("Mapper") == true) {
			type = "##### Mapper     ===> ";
		}

		log.debug(type + name + "." + joinPoint.getSignature().getName() + "()");
		return joinPoint.proceed();
	}

}
