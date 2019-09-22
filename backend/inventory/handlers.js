const { json } = require('body-parser')
const aws = require('aws-sdk')

const client = null
const docClient = null

const getClient = () => {
	if (client == null) {
		aws.config.update({ region: 'us-east-1' })
		const client = new aws.DynamoDB()
		return client
	}

	return client
}

const getDocClient = () => {
	if (docClient == null) {
		aws.config.update({ region: 'us-east-1' })
		const docClient = new aws.DynamoDB.DocumentClient()
		return docClient
	}

	return docClient
}

module.exports = {
	status: (req, res) => {
		res.json('alive')
	},

	getAll: (req, res) => {
		const client = getDocClient()

		console.log(req.params.venue)

		const params = {
			TableName: 'entries',
			KeyConditionExpression: 'venue_id = :v',
			ExpressionAttributeValues: {
				':v': req.params.venue,
			},
		}

		client.query(params, (err, data) => {
			if (err) {
				res.send({
					success: false,
					message: 'Error: ' + err,
				})
			} else {
				console.log('data', data)
				const { Items } = data
				res.send({
					success: true,
					message: 'Got items',
					item: Items,
				})
			}
		})
	},

	getItem: (req, res) => {
		const client = getDocClient()
		const params = {
			TableName: 'entries',
			KeyConditionExpression: 'venue_id = :v and item_id = :i',
			ExpressionAttributeValues: {
				':v': req.params.venue,
				':i': req.params.id,
			},
		}

		client.query(params, (err, data) => {
			if (err) {
				res.send({
					success: false,
					message: 'Error: ' + err,
				})
			} else {
				console.log('data', data)
				const { Items } = data
				res.send({
					success: true,
					message: 'Got item',
					item: Items,
				})
			}
		})
	},

	updateItem: (req, res) => {
		const client = getClient()
		const params = {
			ExpressionAttributeNames: {
				'#N': 'name',
				'#Q': 'qr_code',
			},
			ExpressionAttributeValues: {
				':n': {
					S: req.params.name,
				},
				':q': {
					S: req.params.qr_code,
				},
			},
			Key: {
				venue_id: {
					S: req.params.venue,
				},
				item_id: {
					S: req.params.id,
				},
			},
			TableName: 'entries',
			UpdateExpression: 'SET #N = :n, #Q = :q',
		}

		client.updateItem(params, (err, data) => {
			if (err) {
				res.send({
					success: false,
					message: 'Error: ' + err,
				})
			} else {
				console.log('data', data)
				const { Items } = data
				res.send({
					success: true,
					message: 'deleted item',
				})
			}
		})
	},

	deleteItem: (req, res) => {
		console.log('hit delete')
		const client = getClient()
		const params = {
			TableName: 'entries',
			Key: {
				venue_id: {
					S: req.params.venue,
				},
				item_id: {
					S: req.params.id,
				},
			},
		}

		client.deleteItem(params, (err, data) => {
			if (err) {
				res.send({
					success: false,
					message: 'Error: ' + err,
				})
			} else {
				console.log('data', data)
				const { Items } = data
				res.send({
					success: true,
					message: 'deleted item',
				})
			}
		})
	},

	add: (req, res) => {
		const client = getClient()
		const params = {
			TableName: 'entries',
			Item: {
				venue_id: '103349',
				item_id: '1335',
				qr_code: 'def a real qr',
				item: {
					name: 'fruit',
					cost: '54.65',
				},
			},
		}

		client.put(params, (err, data) => {
			if (err) {
				res.send({
					success: false,
					message: 'Error: ' + err,
				})
			} else {
				console.log('data', data)
				const { Items } = data
				res.send({
					success: true,
					message: 'Added item',
				})
			}
		})
	},
}
