package main

// Item contains all of the properties that make up an item
type Item struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	QRCode      string `json:"qr_code"`
	Quantity    int    `json:"quantity"`
	Purveyour   string `json:"purveyour"`
	UnitPrice   string `json:"price_per_item"`
	UnitWeight  string `json:"weight_per_item"`
	Unit        string `json:"unit"`
	LastUsed    string `json:"last_used"`
	DateBought  string `json:"date_bought"`
	LastUpdated string `json:"last_updated"`
}
