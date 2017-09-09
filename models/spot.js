// Require mongoose
const mongoose = require("mongoose");

// Create a Schema class with mongoose
const Schema = mongoose.Schema;

// Create a NoteSchema with the Schema class
const SpotSchema = new Schema({
    location: {
        lat: {
            type: String,
            required: true
        },
        lng: {
            type: String,
            required: true
        }
    },
    cost: {
        day: {
            type: Number
        },
        hr: {
            type: Number
        }
    },
    owner: {
        type: Schema.Type.ObjectId,
        required: true,
        ref: "User"
    schedule:{
        type: Schema.Type.ObjectId,
        required: true,
        ref: "SpotSchedule"
    }
});

// Make a Spot model with the SpotSchema
const Spot = mongoose.model("Spot", SpotSchema);

// Export the Note model
module.exports = Spot;