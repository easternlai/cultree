const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({

    name: {
        type:String,
        required: true,
    },
    company: {
        type: Schema.ObjectId,
        ref: 'Company',
        required: true,
    },
    cover: {
        type: Schema.ObjectId,
        ref: 'Photo',
    },
    requiredAccess: {
        type: Number,
        default: 5,
    }
});

AlbumSchema.pre('deleteOne', async function(next){
    const albumId = this.getQuery()['_id'];
    try {
        await mongoose.model('Photo').deleteMany({album: albumId});
        next();
    } catch (err) {
        next(err);
    }
    
});

const AlbumModel = mongoose.model('Album', AlbumSchema);

module.exports = AlbumModel;

