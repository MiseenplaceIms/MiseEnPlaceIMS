package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"goji.io"
	"goji.io/pat"
)

func main() {
	router := goji.NewMux()
	ctx := context.Background()
	//config := config.GetConfig()

	router.HandleFunc(pat.Get("/status"), Heartbeat(ctx))
	router.HandleFunc(pat.Get("/get"), GetAll(ctx))
	router.HandleFunc(pat.Get("/get/:id"), GetItem(ctx))
	router.HandleFunc(pat.Post("/add"), AddItem(ctx))
	router.HandleFunc(pat.Delete("/delete/:id"), DeleteItem(ctx))
	router.HandleFunc(pat.Put("/update/:id"), UpdateItem(ctx))

	fmt.Println("Inventory service is online")
	logger := handlers.LoggingHandler(os.Stdout, router)
	log.Fatal(http.ListenAndServe(":80", logger))
}
