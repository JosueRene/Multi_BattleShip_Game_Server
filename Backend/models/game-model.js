const mongoose = require('mongoose')
const gameSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['waiting', 'started', 'finished'],
        default: 'waiting'
    },
    players: [
        {
            playerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Player',
                required: true
            },
            ready: {
                type: Boolean,
                default: false
            },
            connected: {
                type: Boolean,
                default: true
            }

        }
    ],
    currentTurn: {
        type: String,
        default: null
    },
    winner: {
        type: String,
        default: null
    }
}, {timestamps: true})

const Game = mongoose.model('Game', gameSchema)
module.exports = Game