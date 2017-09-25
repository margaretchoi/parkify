const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
        // required: true
    },
    pw_hash: {
        type: String,
    },
    reservations: [
        {
    		type: Schema.Types.ObjectId,
    		ref: 'Reservation'
        }
    ],
    posted_spots: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Spot'
        }
    ],
    uuid: {
        type: String,
    },
    provider: {
        type: String,
    },
    passport_id: {
        type: String
    },
    total_spent: {
        type: Number
    },
    total_earned: {
        type: Number
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(deepPopulate, {
    whitelist: [
        'posted_spots.schedule',
        'reservations.spot'
    ]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
