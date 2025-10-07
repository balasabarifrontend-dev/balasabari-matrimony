// package com.matrimony;

// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication
// public class BackendApplication {
//   public static void main(String[] args){
//     SpringApplication.run(BackendApplication.class, args);
//   }
// }

package com.matrimony;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner testDatabase() {
        return args -> {
            System.out.println("🚀 Tamil Matrimony Backend Started Successfully!");
            System.out.println("📊 Database: tamil_matrimony");
            System.out.println("🌐 Server: http://localhost:8080");
            System.out.println("✅ Ready to receive requests...");
        };
    }
}