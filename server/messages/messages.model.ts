const messageSchema = new Schema({
	email: { type: String, required: true },
	address: { street: { type: String }, city: { type: String } },
	bitcoinAddress: { type: String },
	productName: { type: String },
	price: { type: Number },
});
