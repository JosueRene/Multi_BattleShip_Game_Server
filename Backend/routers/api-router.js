const router = require('express').Router()
const Game = require('../models/game-model')
const Player = require('../models/player-model')
const Board = require('../models/board-model')

const { v4: uuidv4 } = require('uuid')