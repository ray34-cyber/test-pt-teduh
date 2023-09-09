const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "project_2";

const client = new MongoClient(url);

client.connect((err) => {
  if (err) {
    console.error("Koneksi ke database gagal:", err);
    return;
  }
  console.log("Koneksi ke database berhasil");

  const db = client.db(dbName);

  const result = db.Psikolog.aggregate([
    {
      $lookup: {
        from: "Review", // Nama koleksi ulasan (reviews)
        _id: "_id",
        psikolog_id: "psikolog_id",
        as: "reviews",
      },
    },
    {
      $unwind: "$reviews",
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        reviews: {
          $push: {
            _id: "$reviews._id",
            psikolog_id: "$reviews.psikolog_id",
            rating: "$reviews.rating",
            message: "$reviews.message",
          },
        },
        average_rating: { $avg: "$reviews.rating" },
      },
    },
  ]).toArray();

  console.log("Hasil Query:", result);

  client.disconnect();
});
