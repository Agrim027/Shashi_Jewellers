package com.shashi.rates;

import org.jsoup.Jsoup;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.time.Instant;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class GoldRateService {

    private static final String API_URL = "https://bcast.agarwaljewellers.in:7768/VOTSBroadcastStreaming/Services/xml/GetLiveRateByTemplateID/agarwal";
    
    // Failsafe cache to prevent returning nulls to the frontend
    private String lastGold18k = "N/A";
    private String lastGold24k = "N/A";
    private String lastSilver = "N/A";

    public Map<String, Object> fetchLiveRates() {
        Map<String, Object> result = new HashMap<>();
        try {
            System.out.println("[GoldRateService] Fetching live rates from external API...");
            
            // 1. IMPROVE SCRAPING LOGIC
            // Using Jsoup with proper headers to mimic a browser and avoid bot blocking
            String rawData = Jsoup.connect(API_URL)
                    .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                    .timeout(10000)
                    .ignoreContentType(true)
                    .get()
                    .body()
                    .text(); // Normalizes all whitespace and tabs

            System.out.println("[GoldRateService] Raw response received successfully. Parsing values...");

            // 2. FIX SELECTORS / AVOID INDEX PARSING
            // Since the endpoint returns raw text (not HTML with CSS selectors), 
            // we use robust Regex pattern matching instead of brittle hardcoded index splits
            Pattern goldPattern = Pattern.compile("Gold 999 TYRI Retail\\s+(\\d+(?:\\.\\d+)?)");
            Pattern silverPattern = Pattern.compile("Silver tyaari Retail\\s+(\\d+(?:\\.\\d+)?)");

            Matcher goldMatcher = goldPattern.matcher(rawData);
            Matcher silverMatcher = silverPattern.matcher(rawData);

            if (goldMatcher.find()) {
                double pricePer10g = Double.parseDouble(goldMatcher.group(1));
                double pricePer1g = pricePer10g / 10.0;
                lastGold24k = formatCurrency(pricePer1g);
                lastGold18k = formatCurrency(pricePer1g * 0.755); // Calculate exact 18K (75.5%)
            } else {
                throw new Exception("Gold rate value could not be found in the response text.");
            }

            if (silverMatcher.find()) {
                double pricePer1kg = Double.parseDouble(silverMatcher.group(1));
                double pricePer1g = pricePer1kg / 1000.0;
                lastSilver = formatCurrency(pricePer1g);
            } else {
                throw new Exception("Silver rate value could not be found in the response text.");
            }

            // 3. ADD LOGGING
            System.out.println("[GoldRateService] Parsed Successfully -> 24K: " + lastGold24k + " | 18K: " + lastGold18k + " | Silver: " + lastSilver);

            // 5. IMPROVE RESPONSE
            result.put("status", "success");
            result.put("gold18k", lastGold18k + "/g");
            result.put("gold24k", lastGold24k + "/g");
            result.put("silver", lastSilver + "/g");
            result.put("updatedAt", Instant.now().toString());

        } catch (Exception e) {
            // 3. ADD LOGGING (Errors) & 6. DEBUG SUPPORT
            System.err.println("[GoldRateService] Error fetching rates: " + e.getMessage());
            e.printStackTrace();
            
            // 4. ADD FAILSAFE
            if ("N/A".equals(lastGold18k)) {
                // Default fallback values if cache is empty
                lastGold18k = "₹ 5,662.50";
                lastGold24k = "₹ 7,500.00";
                lastSilver = "₹ 90.00";
                System.out.println("[GoldRateService] Using hardcoded fallback values.");
            } else {
                System.out.println("[GoldRateService] Using last known cached values.");
            }

            // 5. IMPROVE RESPONSE (Fallback JSON)
            result.put("status", "fallback");
            result.put("gold18k", lastGold18k + "/g");
            result.put("gold24k", lastGold24k + "/g");
            result.put("silver", lastSilver + "/g");
            result.put("error", e.getMessage());
            result.put("updatedAt", Instant.now().toString());
        }
        return result;
    }

    private String formatCurrency(double value) {
        NumberFormat format = NumberFormat.getCurrencyInstance(new Locale("en", "IN"));
        format.setMinimumFractionDigits(2);
        format.setMaximumFractionDigits(2);
        return format.format(value).replace("₹", "₹ ");
    }
}
