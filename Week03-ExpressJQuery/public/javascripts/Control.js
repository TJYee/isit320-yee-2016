var MyObject = (function() {

        // constructor
    function MyObject() {
    }

    MyObject.prototype.readyCalled = function() {
        $("#readyCalled").html("Ready was called and myObjected created");
    };

    return MyObject;
}());


$(document).ready(function() {
    var myObject = new MyObject();
    myObject.readyCalled();
});
