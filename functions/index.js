const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

const toDate = (timestamp) => {
  const time = new Date(timestamp * 1000);
  return time.toLocaleString("sv-SE").split(" ")[0];
};

exports.measurements = functions.https.onRequest(async (req, res) => {
  const data = req.body;
  if (Object.keys(data).length === 4) {
    const nodeRef = db.collection("nodes").doc(data.id);
    const recordRef = db
      .collection("nodes")
      .doc(data.id)
      .collection("measurements");

    nodeRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        nodeRef.update({ ...data });
        recordRef.doc(toDate(data.last_measurement.timestamp)).set({
          values: data.last_measurement.values,
        });
      } else {
        nodeRef.set({
          ...data,
          info: {
            address: "no address",
            company: "no company",
            contactName: "no name",
            contactPhone: "no phone",
            contactPhone: "no description",
            id: data.id,
            lat: 0,
            lng: 0,
          },
        });
        recordRef.doc(toDate(data.last_measurement.timestamp)).set({
          values: data.last_measurement.values,
        });
      }
    });
    res.json({ message: "ok" });
  } else {
    res.json({ message: "error" });
  }
});
