package main

// Item contains all of the properties that make up an item
type Item struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Quantity    int    `json:"quantity"`
	PricePer    string `json:"price_per_item"`
	WeightPer   string `json:"weight_per_item"`
	LastUsed    string `json:"last_used"`
	DateBought  string `json:"date_bought"`
	LastUpdated string `json:"last_updated"`
}
