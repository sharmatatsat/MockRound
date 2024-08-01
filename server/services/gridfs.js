const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

let gridFSBucket;

const connectToGridFS = async () => {
    const db = mongoose.connection.db;
    gridFSBucket = new GridFSBucket(db, {
        bucketName: 'fs'
    });
};

const getGridFS = () => {
    if (!gridFSBucket) {
        throw new Error('GridFSBucket is not initialized');
    }
    return gridFSBucket;
};

module.exports = { connectToGridFS, getGridFS };
