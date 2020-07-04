const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
var UserModel = require('./model/userSchema');
var bookModel = require('./model/bookingSchema');
var slotsModel = require('./model/slotSchema');
const connectDB = require('./config/db')


const app = express();

// Load config
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5005

// Connect DB
connectDB();

// Body parser
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Access-Control-Allow-Headers");
    next();
});

const authMiddleWare = (req, res, next) => {
    console.log("in here auth")
    next();
}

app.get('/', (req, res) => {
    return res.json({
        response: 'Saved...'
    })
})


app.post('/booking', authMiddleWare, (req, res) => {
    console.log(req.body)
    var book = bookModel({
        buyer_name: req.body.buyer_name,
        buyer_email: req.body.buyer_email,
        buyer_phone: req.body.buyer_phone,
        seller_id: req.body.seller_id,
        seller_name: req.body.seller_name,
        date: new Date(req.body.date),
        time_slot: req.body.time_slot,
    });
    book.save((err) => {
        if (err) {
            return res.status(400).json({
                'message': 'Unable to book appoinment please try after some time'
            });
        } else {
            return res.status(200).json({
                'message': 'booking placed'
            });
        }
    })

})

app.post('/register', authMiddleWare, (req, res) => {
    var book = UserModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
    });
    book.save((err) => {
        if (err) {
            return res.status(400).json({
                'message': 'Unable to book appoinment please try after some time'
            });
        } else {
            return res.status(200).json({
                'message': 'booking placed'
            });
        }
    })

})


app.post('/login', (req, res) => {
    UserModel.findOne({
        'email': req.body.email
    }, function (err, user) {
        if (user && user.email && (req.body.password === '1234')) {
            return res.json({
                'user': user
            })
        } else if (user && user.email) {
            return res.status(401).json({
                'error': 'user password is incorrect'
            })
        } else {
            return res.status(404).json({
                'error': 'user not found'
            })
        }
    })
})

app.get('/sellers', authMiddleWare, (req, res) => {
    UserModel.find({
        role: 'seller'
    }, function (err, users) {
        return res.status(200).json(users)
    })
})

app.post('/seller', authMiddleWare, (req, res) => {
    UserModel.remove({ '_id': req.body.id }, function (err, users) {
        return res.status(200).json(users)
    })
})

app.get('/buyers', authMiddleWare, (req, res) => {
    UserModel.find({
        role: 'buyer'
    }, function (err, users) {
        return res.status(200).json(users)
    })
})

app.get('/sellers/:seller_id/:date', authMiddleWare, (req, res) => {
    bookModel.findOne({
        'seller_id': req.params.seller_id,
        'date': new Date(req.params.date),
        'booking_status': 'pending'
    }, function (err, bookings) {
        return res.status(200).json(bookings)
    })
})


app.put('/booking/update/:id', authMiddleWare, (req, res) => {
    bookModel.updateOne({
        '_id': req.params.id,
    }, { 'booking_status': req.body.status }, function (err, bookings) {
        return res.status(200).json({
            'message': 'Succesfully Updated'
        })
    })
})

app.get('/bookings/:seller_id', authMiddleWare, (req, res) => {
    bookModel.find({
        'seller_id': req.params.seller_id,
        'booking_status': 'pending'
    }, function (err, bookings) {
        return res.status(200).json(bookings)
    })
})

app.get('/slots/:seller_id', authMiddleWare, (req, res) => {
    slotsModel.findOne({
        'seller_id': req.params.seller_id,
    }, null, { sort: { '_id': -1 } }, function (err, slots) {
        return res.status(200).json(slots)
    })
})

app.post('/bookslots', authMiddleWare, (req, res) => {

    let slots = slotsModel({
        seller_id: req.body.seller_id,
        slots: req.body.slots
    })
    slots.save((err) => {
        if (err) {
            return res.status(400).json({ 'error': 'error' })
        } else {
            return res.status(200).json({ 'message': 'slots booked' })
        }
    })
})

app.post('/deletelots', authMiddleWare, (req, res) => {

    slotsModel.deleteMany({ seller_id: req.body.seller_id }, (err) => {
        if (err) {
            return res.status(400).json({ 'error': 'error' })
        } else {
            return res.status(200).json({ 'message': 'slots Deleted' })
        }
    })
})


app.listen(PORT, console.log(`Server running on ${PORT}`))

