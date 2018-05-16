const mongoose = require("mongoose");
const Album = require = require("../models/album");

//Get All Albums
exports.getAllAlbums = (req, res, next) => {
    Album.find()
    .select("fNAme lName phone albumImage _id")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            albums: docs.map(doc => {
                return {
                    fName: doc.fName,
                    lName: doc.lName,
                    phone: doc.phone,
                    albumImage: doc.albumImage,
                    _id: doc._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:3100/albums/" + doc._id
                    }
                };
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

//Create New Album
exports.newAlbum = (req, res, next) => {
    const album = new Album({
        _id: new mongoose.Types.ObjectId(),
        fName: req.body.fName,
        lName: req.body.lName,
        phone: req.body.phone,
        albumImage: req.file.path      
    });
    album
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "Album uploaded",
            createdAlbum: {
                _id: result._id,
                fName: result.fName,
                lName: result.lName,
                phone: result.phone,
                albumImage: result.albumImage,
                request: {
                    type: "GET",
                    url: "http://localhost:3100/albums/" +result._id
                } 
            }
        });
    })
    .catch(err => {
        console.log(500).json({
            error: err
        });
    });
};

//Get Single Album
exports.getAlbum = (req, res, next) => {
const id = req.params.albumId;
    Album.findById(id)
    .select('fName lName phone _id albumImage')
    .exec()
    .then(doc => {
        console.log('From database', doc);
        if(doc) {
            res.status(200).json({
                album: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3100/albums'
                }
            });
        } else {
            res
            .status(404)
            .json({ message: 'Unable to get'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
};

//edit Album
exports.editAlbum = (req, res, next) => {
    const id = req.params.albumId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Album.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Album updated",
                request: {
                    type: "GET",
                    url: "http://localhost:300/albums/" + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
};

//delete Album
exports.albumDelete = (req, res, next) => {
    const id = req.params.albumId;
    Album.remove({ _id: id })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Album deleted",
            request: {
                type: 'POST',
                url: 'http://localhost:3100/albums',
                body: { fName: 'String', lName: 'String', phone: 'Number'}
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};
