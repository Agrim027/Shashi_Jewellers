package com.shashi.rates;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow requests from our React app
public class GoldRateController {

    @Autowired
    private GoldRateService goldRateService;

    @GetMapping("/live-rates")
    public Map<String, Object> getLiveRates() {
        return goldRateService.fetchLiveRates();
    }
}
