package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/guregu/dynamo"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
)

// handlers.go
// handles all the business logic

// Heartbeat just sends back some text to make sure it's alive
func Heartbeat(ctx context.Context) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/plain")
		w.WriteHeader(200)
		w.Write([]byte("im alive i promise"))
	}
}

// GetAll returns all of the items in a user's inventory
func GetAll(ctx context.Context) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		r = r.WithContext(ctx)
		w.Header().Set("Content-Type", "application/json")
		db := dynamo.New(session.New(), &aws.Config{Region: aws.String("us-east-1")})
		table := db.Table("venues")

		fmt.Println("Got session")

		var results []interface{}

		fmt.Println("Scanning table")
		err := table.Scan().All(&results)

		if err != nil {
			w.WriteHeader(500)
			w.Write([]byte(err.Error()))
			fmt.Println("Error: ", err)
		}

		fmt.Println("No errors")
		json.NewEncoder(w).Encode(results)

		// fmt.Println("Hit GetAll")
		// client, err := GetClient()
		// if err != nil {
		// 	w.WriteHeader(500)
		// 	w.Write([]byte(err.Error()))
		// }
		// fmt.Println("got client")

		// result, err := client.Scan(&dynamodb.ScanInput{
		// 	TableName: aws.String("venues"),
		// })
		// fmt.Println("scanning table")

		// if err != nil {
		// 	fmt.Printf("%s", err)
		// }

		// obj := []Item{}
		// err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &obj)
		// if err != nil {
		// 	w.WriteHeader(500)
		// 	w.Write([]byte(err.Error()))
		// }
		// fmt.Println("unmarshalling data")

		// err = json.NewEncoder(w).Encode(obj)
		// if err != nil {
		// 	w.Write([]byte(err.Error()))
		// }
	}
}

type testObj struct {
	VenueID string `dynamo:"venue_id"`
	ItemID  string `dynamo:"item_id"`
	Item    Item   `dynamo:"item"`
	QRCode  string `dynamo:"qr_code"`
}

// GetItem returns the information for a single item
func GetItem(ctx context.Context) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		db := dynamo.New(session.New(), &aws.Config{Region: aws.String("us-east-1")})
		table := db.Table("TestTable")

		fmt.Println("got table")

		bruh := testObj{
			VenueID: "613",
			ItemID:  "13",
			QRCode:  ";lkjdsf;lkj",
			Item: Item{
				ID:          "bruh",
				Name:        "bruh",
				Quantity:    1,
				Purveyour:   "bruh",
				UnitPrice:   "bruh",
				UnitWeight:  "bruh",
				Unit:        "bruh",
				LastUsed:    "bruh",
				DateBought:  "bruh",
				LastUpdated: "bruh",
			}}

		fmt.Println("made object")
		err := table.Put(bruh).Run()
		if err != nil {
			fmt.Println("error", err)
			w.Write([]byte(err.Error()))
		}

		fmt.Println("Writing to response")
		w.Write([]byte("Added to db"))

		// 	item := Item{
		// 		ID:          "bruh",
		// 		Name:        "bruh",
		// 		Quantity:    1,
		// 		Purveyour:   "",
		// 		UnitPrice:   "",
		// 		UnitWeight:  "",
		// 		Unit:        "",
		// 		LastUsed:    "",
		// 		DateBought:  "",
		// 		LastUpdated: "",
		// 	}

		// 	entry := Entry{
		// 		VenueID: "1",
		// 		ItemID:  "1",
		// 		QRCode:  "qr code",
		// 		Item:    item,
		// 	}

		// 	json.NewEncoder(w).Encode(entry)
	}
}

// AddItem adds an item to a users inventory
func AddItem(ctx context.Context) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("hit add")
		db := dynamo.New(session.New(), &aws.Config{Region: aws.String("us-east-1")})
		table := db.Table("venues")

		fmt.Println("Got session")

		item := Item{
			ID:          "test",
			Name:        "test",
			Quantity:    1,
			Purveyour:   "test",
			UnitPrice:   "test",
			UnitWeight:  "test",
			Unit:        "test",
			LastUsed:    "test",
			DateBought:  "test",
			LastUpdated: "test",
		}

		entry := Entry{
			VenueID: "1010101",
			ItemID:  "1",
			QRCode:  "qr code",
			Item:    item,
		}

		fmt.Println("Scanning")
		err := table.Put(entry).Run()
		if err != nil {
			w.WriteHeader(500)
			w.Write([]byte(err.Error()))
			fmt.Println("error: ", err)
		}
		fmt.Println("No errors")
		w.Write([]byte("Added"))
	}
}

// DeleteItem deletes an item from a user's inventory
func DeleteItem(ctx context.Context) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {

	}
}

// UpdateItem is used to update properties of an item
func UpdateItem(ctx context.Context) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {

	}
	// update in cache
	// return cached version
	// return and async update db
}
