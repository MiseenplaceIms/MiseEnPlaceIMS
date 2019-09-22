package main

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

var client *dynamodb.DynamoDB

// GetClient returns the db client if there is an open connection
func GetClient() (*dynamodb.DynamoDB, error) {
	if client != nil {
		return client, nil
	}

	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("us-east-1"),
	})

	if err != nil {
		return nil, err
	}

	client = dynamodb.New(sess)
	return client, nil
}
