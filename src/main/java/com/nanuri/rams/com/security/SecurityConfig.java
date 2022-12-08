package com.nanuri.rams.com.security;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.filter.CharacterEncodingFilter;

import com.nanuri.rams.com.security.handler.AuthenticationAccessDeniedHandler;

import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	private final AuthenticationFailureHandler customFailureHandler;

	private final AuthenticationSuccessHandler customSuccessHandler;

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	// @Override
	// protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	// 	auth.authenticationProvider(authenticationProvider());
	// }

	// @Bean
    // public AuthenticationProvider authenticationProvider() {
    //     return new AdminAuthenticationProvider();
    // }

	//정적 자원에 대해서는 Security 적용 안함.
	@Override
    public void configure(WebSecurity web) {
		//web.ignoring().mvcMatchers("/therapist/signup");
		web.ignoring().mvcMatchers("/sample/**", "/business/**", "/img/**");
		web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
	}

    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	CharacterEncodingFilter filter = new CharacterEncodingFilter();
    	filter.setEncoding("UTF-8");
    	filter.setForceEncoding(true);
    	http.addFilterBefore(filter, CsrfFilter.class);

    	http.authorizeRequests()
				.antMatchers("/login", "/", "/**")
				.permitAll()
    			// .antMatchers("/admin/employeeAdd").hasAnyRole("ADMIN", "ASSISTANT", "EMPLOYEE")
    			// .antMatchers("/admin/employeeList").hasAnyRole("ADMIN", "EMPLOYEE", "ASSISTANT")
    			// .antMatchers("/admin/noticeWrite").hasAnyRole("ADMIN", "EMPLOYEE", "ASSISTANT")
    			// .antMatchers("/admin/dutyConfirm").hasAnyRole("ADMIN", "ASSISTANT")
    			// .antMatchers("/mobile/employeeAdd").hasAnyRole("ADMIN", "ASSISTANT", "EMPLOYEE")
    			// .antMatchers("/mobile/employeeList").hasAnyRole("ADMIN", "EMPLOYEE", "ASSISTANT")
    			// .antMatchers("/mobile/noticeWrite").hasAnyRole("ADMIN", "EMPLOYEE", "ASSISTANT")
    			// .antMatchers("/mobile/dutyConfirm").hasAnyRole("ADMIN", "ASSISTANT")
    			// .antMatchers("/mobile/dutyConfirmDetail").hasAnyRole("ADMIN", "ASSISTANT")
    			/* .antMatchers("**").authenticated()
    			.and()
    		.formLogin()
    			.loginPage("/login")
    			.defaultSuccessUrl("/", true)
    			.usernameParameter("loginId").passwordParameter("pwd")
    			.successHandler(customSuccessHandler)
    			.failureHandler(customFailureHandler)
    			.permitAll()
    			.and()
    		.logout()
	    		.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
	            .logoutSuccessUrl("/")
    			.invalidateHttpSession(true) */;
    	//hasAnyAuthority("OP") //권한정책 필요시
    	//.logoutSuccessHandler(customLogoutSuccessHandler) //로그아웃 성공시 handler

    	http.csrf().disable();

    	http.sessionManagement()
			.invalidSessionUrl("/");

    	// 인증 거부 관련 처리
        http.exceptionHandling().accessDeniedHandler(accessDeniedHandler());
	}

    @Configuration
    @EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true, jsr250Enabled = true)
    public class MethodSecurity {

    }

    // @Bean
    // @Override
    // public AuthenticationManager authenticationManagerBean() throws Exception {
    //     return super.authenticationManagerBean();
    // }

    private AccessDeniedHandler accessDeniedHandler() {
    	AuthenticationAccessDeniedHandler accessDeniedHandler = new AuthenticationAccessDeniedHandler();
        accessDeniedHandler.setErrorPage("/denied");
        return accessDeniedHandler;
    }

}
