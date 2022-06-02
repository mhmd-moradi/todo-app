$(document).ready(function(){
    var todos = {};

    function generate_id(){
        let id = Math.floor(Math.random() * 9999);
        while((id in todos)){
            id = Math.floor(Math.random() * 9999);
        }
        return id;
    }

    function check_fields(){
        if($("#title").val() == "" || $("#description").val() == "")
            return false;
        return true;
    }

    function create_todo(id, title, desc, priority){
        let info = [];
        info["id"] = id;
        info["title"] = title;
        info["desc"] = desc;
        info["priority"] = priority;
        console.log(info);
    }

    


});