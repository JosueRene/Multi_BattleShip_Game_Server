const mongoose = require('mongoose')
const boardSchema = new mongoose.Schema({
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    playerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true
    },
    grid: {
        type: [[Number]],
        required: true
    },
    ships: [
        {
            type: {
                type: String, 
                enum: ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'],
                required: true
            },
            size: {
                type: Number,
                required: true
            },
            positions: {
                type: [[Number]],
                required: true
            },
            hits: {
                type: Number,
                default: 0
            }
        }
    ],
    shots: {
        type: [[Number]],
        default: []
    }
})


// Compound index to ensure one board per player per game
boardSchema.index({gameId: 1, playerId: 1}, {unique: true})

module.exports = mongoose.model('Board', boardSchema)