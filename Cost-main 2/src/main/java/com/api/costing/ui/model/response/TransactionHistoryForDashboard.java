package com.api.costing.ui.model.response;
import java.util.List;

public class TransactionHistoryForDashboard {

    private List<String> months;
    private List<Double> valuesYearlyCost;
    private List<Double> valuesYearlySell;

    private List<String> days;

    private List<Double> valuesOfWeeklyCost;
    private List<Double> valuesOfWeeklySell;

    public List<Double> getValuesYearlyCost() {
        return valuesYearlyCost;
    }

    public void setValuesYearlyCost(List<Double> valuesYearlyCost) {
        this.valuesYearlyCost = valuesYearlyCost;
    }

    public List<Double> getValuesYearlySell() {
        return valuesYearlySell;
    }

    public void setValuesYearlySell(List<Double> valuesYearlySell) {
        this.valuesYearlySell = valuesYearlySell;
    }

    public List<String> getMonths() {
        return months;
    }

    public void setMonths(List<String> months) {
        this.months = months;
    }

    public List<String> getDays() {
        return days;
    }

    public void setDays(List<String> days) {
        this.days = days;
    }

    public List<Double> getValuesOfWeeklyCost() {
        return valuesOfWeeklyCost;
    }

    public void setValuesOfWeeklyCost(List<Double> valuesOfWeeklyCost) {
        this.valuesOfWeeklyCost = valuesOfWeeklyCost;
    }

    public List<Double> getValuesOfWeeklySell() {
        return valuesOfWeeklySell;
    }

    public void setValuesOfWeeklySell(List<Double> valuesOfWeeklySell) {
        this.valuesOfWeeklySell = valuesOfWeeklySell;
    }
}
