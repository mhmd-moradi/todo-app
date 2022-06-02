$(document).ready(function(){
    var todos = {};

    function generate_id(){
        let id = Math.floor(Math.random() * 9999);
        while((id in todos)){
            id = Math.floor(Math.random() * 9999);
        }
        return id;
    }

    console.log(generate_id());
});