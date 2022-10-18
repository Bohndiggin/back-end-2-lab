const db = require('./db.json')
let houseId = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(db)
    },
    deleteHouse: (req, res) => {
        let id = req.body.id
        let index = db.findIndex(e => e.id == +id)
        db.splice(index, 1)
        res.status(200).send(db)
    },
    createHouse: (req, res) => {
        let { address, price, imageURL } = req.body
        let house = {
            id: houseId,
            address,
            price: +price,
            imageURL
        }
        houseId++
        db.push(house)
        res.status(200).send(db)
    },
    updateHouse: (req, res) => {
        let id = req.params.id
        let type = req.body.type
        let houseIdFind = db.findIndex(element => element.id === +id)
        if(type === 'plus') {
            db[houseIdFind].price += 10000
            res.status(200).send(db)
        } else if (type === 'minus') {
            db[houseIdFind].price -= 10000
            res.status(200).send(db)
        } else {
            res.sendStatus(400)
            return
        }
    }
}