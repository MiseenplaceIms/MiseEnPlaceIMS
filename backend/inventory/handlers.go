package main

import (
	"encoding/json"
	"net/http"

	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/guregu/dynamo"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
)

// handlers.go
// handles all the business logic

// Heartbeat just sends back some text to make sure it's alive
func Heartbeat(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain")
	w.WriteHeader(200)
	w.Write([]byte("im alive i swear"))
}

// GetAll returns all of the items in a user's inventory
func GetAll(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	db := dynamo.New(session.New(), &aws.Config{Region: aws.String("us-east-1")})
	table := db.Table("venues")


	fmt.Println("Got session")

	results := []Item
	fmt.Println("Scanning table")
	err := table.Scan().All(&results)

	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte(err.Error()))
		fmt.Println("Error: " + err)
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

// GetItem returns the information for a single item
func GetItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	item := Item{
		ID:          "bruh",
		Name:        "bruh",
		QRCode:      "",
		Quantity:    1,
		Purveyour:   "",
		UnitPrice:   "",
		UnitWeight:  "",
		Unit:        "",
		LastUsed:    "",
		DateBought:  "",
		LastUpdated: "",
	}
	json.NewEncoder(w).Encode(item)
}

// AddItem adds an item to a users inventory
func AddItem(w http.ResponseWriter, r *http.Request) {
	db := dynamo.New(session.New(), &aws.Config{Region: aws.String("us-east-1")})
	table := db.Table("venues")

	fmt.Println("Got session")

	item := Item{
		ID:          "test",
		Name:        "test",
		QRCode:      "test",
		Quantity:    1,
		Purveyour:   "test",
		UnitPrice:   "test",
		UnitWeight:  "test",
		Unit:        "test",
		LastUsed:    "test",
		DateBought:  "test",
		LastUpdated: "test",
	}

	fmt.Println("Scanning")
	err := table.Put(item).Run()
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte(err.Error()))
		fmt.Println("error: " + err)
	}
	fmt.Println("No errors")
	w.Write([]byte("Added"))
}

// DeleteItem deletes an item from a user's inventory
func DeleteItem(w http.ResponseWriter, r *http.Request) {
	//
}

// UpdateItem is used to update properties of an item
func UpdateItem(w http.ResponseWriter, r *http.Request) {
	// update in cache
	// return cached version
	// return and async update db
}

// ListResponse just holds the output of our s3 command
type ListResponse struct {
	Buckets []string `json:"buckets"`
}

// ListBuckets returns a list of buckets
func ListBuckets(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("us-east-1"),
	})

	if err != nil {
		w.Write([]byte(err.Error()))
	}

	svc := s3.New(sess)

	result, err := svc.ListBuckets(nil)
	if err != nil {
		w.Write([]byte(err.Error()))
	}

	var res ListResponse
	for _, b := range result.Buckets {
		res.Buckets = append(res.Buckets, aws.StringValue(b.Name))
	}

	json.NewEncoder(w).Encode(res)
}
