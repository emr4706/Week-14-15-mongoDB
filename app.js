const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "myDB";

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  insertDocuments(db, function() {
    updateDocument(db, function() {
      removeDocument(db, function() {
        client.close();
      });
    });
  });
});

// Get the documents collection
const insertDocuments = function(db, callback) {
  const collection1 = db.collection("Members");
  // Insert some documents
  // 5 distinct Member(ID, Name, PhoneNumber, Email, Adress)
  collection1.insertMany(
    [
      {
        ID: 1,
        Name: "Eddy",
        PhoneNumber: 3125422345,
        Email: "aaa@gmail.com",
        Adress: "peUS"
      },
      {
        ID: 2,
        Name: "Jan",
        PhoneNumber: 3125422346,
        Email: "aab@gmail.co",
        Adress: "peleSa"
      },
      {
        ID: 3,
        Name: "Michel",
        PhoneNumber: 3125422347,
        Email: "aac@gmail.com",
        Adress: "pelUS"
      },
      {
        ID: 4,
        Name: "Ceren",
        PhoneNumber: 3125422348,
        Email: "aaf@gmail.com",
        Adress: "peleUS"
      },
      {
        ID: 5,
        Name: "Chone",
        PhoneNumber: 3125422349,
        Email: "acf@gmail.com",
        Adress: "pUS"
      }
    ],
    function(err, result) {
      assert.equal(err, null);
      assert.equal(5, result.result.n);
      assert.equal(5, result.ops.length);
      console.log("Inserted 5 documents into the collection1");
      callback(result);
    }
  );
};

// 3 different Album(Title,  Description, ViewCount)

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection2 = db.collection("Album");
  // Insert some documents
  collection2.insertMany(
    [
      {
        Title: "Abbb",
        Description: "good",
        ViewCount: 3
      },
      {
        Title: "Add",
        Description: "good",
        ViewCount: 5
      },
      {
        Title: "Abcc",
        Description: "good",
        ViewCount: 8
      }
    ],
    function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection2");
      callback(result);
    }
  );
};

// 3 distinguished Location(Name, ShortName, City, Country, Coordinates)...

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection3 = db.collection("Location");
  // Insert some documents
  collection3.insertMany(
    [
      {
        Name: "Trk",
        ShortName: "TR",
        City: "Ankara",
        Country: "Turkiye",
        Coordinates: 12345
      },
      {
        Name: "Nedrland",
        ShortName: "ND",
        City: "Amsterdam",
        Country: "Nederland",
        Coordinates: 123456
      },
      {
        Name: "America",
        ShortName: "USA",
        City: "New york",
        Country: "America",
        Coordinates: 1234567
      }
    ],
    function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    }
  );
};

// 5 non-identical Title(Album, Location, Member, ViewCount, UploadDate, PrivacyType)

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection4 = db.collection("Title");
  // Insert some documents
  collection4.insertMany(
    [
      {
        album: "xxxx",
        location: "turkiye",
        member: "yes",
        viewcount: 384848,
        uploaddate: "22June16",
        privacytype: "yes"
      },
      {
        album: "xxtr",
        location: "england",
        member: "yes",
        viewcount: 384856,
        uploaddate: "22June19",
        privacytype: "no"
      },
      {
        album: "xedx",
        location: "greek",
        member: "no",
        viewcount: 384809,
        uploaddate: "22June21",
        privacytype: "yes"
      },
      {
        album: "xxuyt",
        location: "franch",
        member: "yes",
        viewcount: 3848987,
        uploaddate: "22June19",
        privacytype: "yes"
      },
      {
        album: "xkhj",
        location: "nedereand",
        member: "yes",
        viewcount: 3848638,
        uploaddate: "22June20",
        privacytype: "no"
      }
    ],
    function(err, result) {
      assert.equal(err, null);
      assert.equal(5, result.result.n);
      assert.equal(5, result.ops.length);
      console.log("Inserted 5 documents into the collection");
      callback(result);
    }
  );
};

// Update one of the already created Album

const updateDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection("Album");
  // Update document where a is 2, set b equal to 1
  collection.updateOne(
    { Title: "Abbb" },
    { $set: { Description: "no good" } },
    function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Updated the document");
      callback(result);
    }
  );
};

//   Delete one of the already created Title(Album, Location, Member, ViewCount, UploadDate, PrivacyType)

const removeDocument = function(db, callback) {
  // Get the documents collection
  const collection = db.collection("Title");
  // Delete document
  collection.deleteOne({ album: "xxxx" }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document");
    callback(result);
  });
};

// Add 2 more Locations

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection("Location");
  // Insert some documents
  collection.insertMany(
    [
      {
        Name: "almanya",
        ShortName: "DS",
        City: "munih",
        Country: "almanya",
        Coordinates: 12345333
      },
      {
        Name: "sweden",
        ShortName: "sw",
        City: "stocolm",
        Country: "sweden",
        Coordinates: 1234532456
      }
    ],
    function(err, result) {
      assert.equal(err, null);
      assert.equal(2, result.result.n);
      assert.equal(2, result.ops.length);
      console.log("Inserted 2 documents into the collection");
      callback(result);
    }
  );
};
