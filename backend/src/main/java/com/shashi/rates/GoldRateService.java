package com.shashi.rates;

import org.jsoup.Jsoup;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.time.Instant;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

@Service
public class GoldRateService {

    private static final String API_URL = "https://bcast.agarwaljewellers.in:7768/VOTSBroadcastStreaming/Services/xml/GetLiveRateByTemplateID/agarwal";

    public Map<String, Object> fetchLiveRates() {
        Map<String, Object> result = new HashMap<>();
        try {
            // Fetch raw text from the API using Jsoup, ignoring content type since it's plain text
            String rawData = Jsoup.connect(API_URL)
                    .ignoreContentType(true)
                    .execute()
                    .body();

            // Expected format is tab-separated lines
            String[] lines = rawData.split("\n");

            String gold18k = "N/A";
            String gold24k = "N/A";
            String silver = "N/A";

            for (String line : lines) {
                String[] parts = line.split("\t");
                if (parts.length > 3) {
                    String id = parts[1].trim(); // ID column
                    if ("7631".equals(id)) {
                        double pricePer10g = Double.parseDouble(parts[3].trim());
                        double pricePer1g = pricePer10g / 10.0;
                        gold24k = formatCurrency(pricePer1g);
                        
                        // Approximate 18K (75.5%)
                        double price18kPer1g = pricePer1g * 0.755;
                        gold18k = formatCurrency(price18kPer1g);
                    } else if ("7632".equals(id)) {
                        double pricePer1kg = Double.parseDouble(parts[3].trim());
                        double pricePer1g = pricePer1kg / 1000.0;
                        silver = formatCurrency(pricePer1g);
                    }
                }
            }

            result.put("gold18k", gold18k + "/g");
            result.put("gold24k", gold24k + "/g");
            result.put("silver", silver + "/g");
            result.put("updatedAt", Instant.now().toString());

        } catch (Exception e) {
            e.printStackTrace();
            result.put("error", "Failed to fetch rates: " + e.getMessage());
            result.put("gold18k", "N/A");
            result.put("gold24k", "N/A");
            result.put("silver", "N/A");
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
