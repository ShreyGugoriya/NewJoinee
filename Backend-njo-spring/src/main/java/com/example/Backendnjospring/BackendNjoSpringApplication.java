package com.example.Backendnjospring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BackendNjoSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendNjoSpringApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer configure(){
		return  new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/employee/").allowedOrigins("http://localhost:3001");
				registry.addMapping("/**").allowedMethods("*").allowedOriginPatterns("*");
			}
		};
	}
}
