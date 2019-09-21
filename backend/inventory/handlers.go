package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/aws/aws-sdk-go/service/s3"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
)

// handlers.go
// handles all the business logic

// Heartbeat just sends back some text to make sure it's alive
func Heartbeat(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(200)
	w.Write([]byte("im awake i swear"))
}

// GetAll returns all of the items in a user's inventory
func GetAll(w http.ResponseWriter, r *http.Request) {
	// check cache
	// false, go to db
}

// GetItem returns the information for a single item
func GetItem(w http.ResponseWriter, r *http.Request) {
	// check cache
	// false go to db
}

// AddItem adds an item to a users inventory
func AddItem(w http.ResponseWriter, r *http.Request) {
	// add to db
	// add message to queue to update cache
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

	svc := s3.New(sess)

	result, err := svc.ListBuckets(nil)
	if err != nil {
		log.Fatalf("Unable to list buckets, %v", err)
	}

	var res ListResponse
	for _, b := range result.Buckets {
		res.Buckets = append(res.Buckets, aws.StringValue(b.Name))
	}

	json.NewEncoder(w).Encode(res)
}
