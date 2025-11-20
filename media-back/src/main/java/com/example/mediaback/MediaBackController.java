package com.example.mediaback;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MediaBackController {

    @GetMapping("/")
    public String hello() {
        return "Media Back API";
    }
}
