const fs = require("fs");
const AWS = require("aws-sdk");
const ObjectId = require("mongoose").Types.ObjectId;

const User = require("../models/User");
const Album = require("../models/Album");
const Photo = require("../models/Photo");

const uploadPhotos = async (file, userId, albumId) => {
  let image = undefined;
  const fileStream = fs.createReadStream(file.path);

  s3 = new AWS.S3({
    region: process.env.S3_REGION,
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  });
  const s3Response = await s3
    .upload({
      Bucket: process.env.S3_BUCKET,
      Body: fileStream,
      Key: file.filename,
    })
    .promise();

  const photo = new Photo({
    album: albumId,
    image: s3Response.Location,
    thumbnail: s3Response.Location,
    owner: userId,
  });

  await photo.save();

  return photo;
};

module.exports.createAlbum = async (req, res, next) => {
  const { name, cover, accessUser } = req.body;
  const user = req.user;

  const admin = (await User.findOne({ _id: user.id })).admin;

  try {
    if (admin < 5) {
      return res
        .status(403)
        .send({ msg: "You do not have permissions to perform this action." });
    }

    const album = new Album({
      name,
      company: user.tenantId,
      requiredAccess: accessUser ? 0 : 5,
    });

    album.save();

    if (req.files.length > 0) {
      req.files.map((file) => {
        uploadPhotos(file, user.id, album._id);
      });
    }

    res.send(album._id);
  } catch (err) {
    next(err);
  }
};

module.exports.getAlbums = async (req, res, next) => {
  const user = req.user;

  try {
    const albums = await Album.find({ company: user.tenantId });

    res.send(albums);
  } catch (err) {
    next(err);
  }
};

module.exports.getAlbum = async (req, res, next) => {
  const { albumId } = req.params;

  try {
    const albumPhotos = await Album.aggregate([
      { $match: { company: ObjectId(req.user.tenantId) } },
      {
        $match: { _id: ObjectId(albumId) },
      },
      {
        $lookup: {
          from: "photos",
          localField: "_id",
          foreignField: "album",
          as: "photos",
        },
      },
      {
        $unset: "photos.album",
      },
    ]);
    res.send(albumPhotos[0]);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteAlbum = async (req, res, next) => {
  const { token } = req.headers;
  const { albumId } = req.params;

  try {
    const isAdmin = (await User.findOne({ _id: req.user.id })).admin <= 5;

    if (!isAdmin) {
      return res
        .status(401)
        .send({
          acknowledgement: false,
          message: "You do not have permissions to perform this action.",
        });
    }

    const response = await Album.deleteOne({ _id: albumId });

    res.send({ acknowledgement: !!response.deletedCount });
  } catch (err) {
    res.send({ acknowledgement: false });
  }
};

module.exports.deletePhoto = async (req, res, next) => {
  const { token } = req.headers;
  const { photoId } = req.params;
  const user = req.user;

  const requester = await User.findOne({ _id: user.id });
  const photo = await Photo.findOne({ _id: photoId });
  if (!photo) {
    return res.status.send({
      msg: "This photo does not exist, please try again.",
    });
  }
  const album = await Album.findOne({
    _id: photo.album,
    company: user.tenantId,
  });

  if (album.requiredAccess > requester.admin) {
    return res
      .status(401)
      .send({ msg: "You do not have permissions to perform this action." });
  } else if (requester.admin !== 5 && requester._id !== photo.owner) {
    return res
      .status(401)
      .send({ msg: "You do not have permissions to perform this action." });
  }

  const response = await Photo.deleteOne({ _id: photoId });

  res.send({ acknowledgement: !!response.deletedCount });
};

module.exports.uploadAlbumPhotos = async(req, res, next) => {

  const {albumId} = req.params;  
 
  try {
    const album = await Album.findOne({_id: albumId});
    const user = await User.findOne({_id: req.user.id});
    if(user.admin < album.requiredAccess){
      return res.status(401).send({msg: 'You do not have permissions to perform this action.'});
    }

    if (req.files.length > 0) {
      await req.files.map(( file) => {
          uploadPhotos(file, user.id, album._id);

      });
    }

    const photos = await Photo.find({_album: albumId});

    res.send({photos});
  } catch (err) {
    next(err);
  }
}