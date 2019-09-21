package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()
	//config := config.GetConfig()

	router.HandleFunc("/status", Heartbeat).Methods("GET")
	router.HandleFunc("/list", ListBuckets).Methods("GET")
	router.HandleFunc("/get", GetAll).Methods("GET")
	router.HandleFunc("/get/{id}", GetItem).Methods("GET")
	router.HandleFunc("/add", AddItem).Methods("POST")
	router.HandleFunc("/delete/{id}", DeleteItem).Methods("DELETE")
	router.HandleFunc("/update/{id}", UpdateItem).Methods("PUT")

	fmt.Println("Inventory service is online")
	logger := handlers.LoggingHandler(os.Stdout, router)
	log.Fatal(http.ListenAndServe(":80", logger))
}
