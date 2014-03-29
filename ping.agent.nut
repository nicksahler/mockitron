http.onrequest(function(req, res) {
    local data = "unlock";
    device.send("state", data);
    res.send(200, "Success!");
});