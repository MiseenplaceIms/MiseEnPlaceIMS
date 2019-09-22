package main

type Entry struct {
	VenueID string `json:"venue_id",dynamo:"venue_id"`
	ItemID  string `json:"item_id",dynamo:"item_id"`
	QRCode  string `json:"qr_code",dynamo:"qr_code"`
	Item    Item   `json:"item",dynamo:"item"`
}

// Item contains all of the properties that make up an item
type Item struct {
	ID          string `json:"id",dynamo:"id"`
	Name        string `json:"name",dynamo:"name"`
	Quantity    int    `json:"quantity",dynamo:"quantity"`
	Purveyour   string `json:"purveyour",dynamo:"purveyour"`
	UnitPrice   string `json:"price_per_item",dynamo:"unit_price"`
	UnitWeight  string `json:"weight_per_item",dynamo:"unit_weight"`
	Unit        string `json:"unit",dynamo:"unit"`
	LastUsed    string `json:"last_used",dynamo:"last_used"`
	DateBought  string `json:"date_bought",dynamo:"date_bought"`
	LastUpdated string `json:"last_updated",dynamo:"last_updated"`
}
