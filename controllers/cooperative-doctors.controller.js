const mongoose = require("mongoose");
const CooperativeDoctor = require('../models/cooperative-doctor.model');


const getCooperativeDoctors = async (req, res) => {
    let doctors = await CooperativeDoctor.find().populate('primaryFacility');

    if(doctors) {
        res.status(200).json(doctors);
    } else {
        res.status(400).json()
    }
}

const getCooperativeDoctor = async (req, res) => {
    let doctor = await CooperativeDoctor.findById(req.params.id).populate('primaryFacility');

    if(doctor) {
        res.status(200).json(doctor);
    } else {
        res.status(400).json()
    }
}

const createCooperativeDoctor = async (req, res) => {
    req.body._id = new mongoose.Types.ObjectId();
    req.body.firstname = req.body.fullname.split(" ")[0];
    req.body.lastname = req.body.fullname.split(" ")[1] ? req.body.fullname.split(" ")[1] : "";
    req.body.primaryPhone ? req.body.phoneNumbers.push(req.body.primaryPhone) : null;
    let doctor = await CooperativeDoctor.create(req.body);
    res.status(201).json(doctor);
}

const updateCooperativeDoctor = async (req, res) => {
    req.body.firstname = req.body.fullname.split(" ")[0];
    req.body.lastname = req.body.fullname.split(" ")[1] ? req.body.fullname.split(" ")[1] : "";
    req.body.primaryPhone ? req.body.phoneNumbers = [req.body.primaryPhone] : req.body.phoneNumbers = [];
    req.body.secondaryPhones ? req.body.phoneNumbers.push(req.body.secondaryPhones) : null;
    let doctor = await CooperativeDoctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(doctor);
}

module.exports = {
    getCooperativeDoctors, getCooperativeDoctor, createCooperativeDoctor, updateCooperativeDoctor
}