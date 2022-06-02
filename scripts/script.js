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

    function create_todo(id, title, desc, priority, time){
        let info = [];
        info["title"] = title;
        info["desc"] = desc;
        info["priority"] = priority;
        info["is_done"] = false;
        info["created_at"] = time;
        todos[id] = info;
    }

    function sort_by_date(){
        let dates = [];
        for(id in todos)
            dates.push(todos[id]["created_at"]);

        dates.sort();
        dates.reverse();
        console.log(dates);
    }

   


});