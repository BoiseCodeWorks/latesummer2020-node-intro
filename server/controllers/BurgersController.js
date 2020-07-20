import express from 'express'

let FAKEDB = [
    {
        id: 1,
        name: "Tim Burger",
        ingredients: ["tomatoes", "ketchup"]
    },
    {
        id: 2,
        name: "D$ Burger",
        ingredients: ["Ribeye steak for buns", "Double beef patty", "Lots of cheese", "wrapped in bacon"],
    }
]

export default class BurgerController {
    constructor() {
        // NOTE this is already at localhost:3000/api/burgers
        this.router = express.Router()
            .get('', this.getAll)
            .get('/:id', this.getOne)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.deleteBurger)
    }

    deleteBurger(req, res, next) {
        FAKEDB.splice(FAKEDB.findIndex(b => b.id == req.params.id), 1)
        res.send("delorted")
    }

    edit(req, res, next) {
        let foundBurger = FAKEDB.find(b => b.id == req.params.id)

        if (!foundBurger) {
            res.status(400).send("Invalid id")
        }

        for (let key in req.body) {
            foundBurger[key] = req.body[key]
        }
        res.send({ message: "updated the burger!", data: foundBurger })
    }

    create(req, res, next) {
        try {
            let burger = {
                id: FAKEDB.length + 1,
                name: req.body.name,
                ingredients: req.body.ingredients
            }
            if (!burger.name) {
                throw new Error("you must supply a name")
            }
            FAKEDB.push(burger)
            res.status(201).send({ message: "Made a burger", data: burger })
        } catch (error) {
            res.status(400).send(error.toString())
        }
    }

    getOne(req, res, next) {
        let foundBurger = FAKEDB.find(b => b.id == req.params.id)
        if (!foundBurger) {
            res.status(400).send("Invalid id")
        }
        res.send({ message: `Got the burger with the id ${req.params.id}`, data: foundBurger })
    }

    getAll(req, res, next) {
        res.send({ message: "Got the buregers!", data: FAKEDB })
    }


}