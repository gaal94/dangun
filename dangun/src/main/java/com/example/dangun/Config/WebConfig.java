package com.example.dangun.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
 @Override
 public void addCorsMappings(CorsRegistry registry) {
     registry.addMapping("/**")
             .allowedOrigins("http://localhost:3000") // 허용할 출처 : 특정 도메인만 받을 수 있음
             .allowedMethods("GET", "POST") // 허용할 HTTP method
             .allowCredentials(true); // 쿠키 인증 요청 허용
 }
 
 @Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
	 	registry.addResourceHandler("/upload/**").addResourceLocations("file:///c:/ezwel/upload");
	}
}