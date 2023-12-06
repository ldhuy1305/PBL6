var serviceAccount = require("../key.json");
var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://api-notify-70b0b-default-rtdb.firebaseio.com",
});

exports.notify = async function(storeId, orderId, isSeen = false) {
  var db = admin.database();
  await db
    .ref(storeId)
    .child(orderId)
    .set({
      // id : orderId,
      title: "Thông báo",
      message: `Bạn có đơn hàng mã ${orderId} đang chờ! Shipper đang đến nhé <3`,
      isSeen: isSeen,
    });
};
