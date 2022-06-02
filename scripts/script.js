$(document).ready(function(){
    const todos = {};
    var order = [];


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
        order = [];
        let dates = [];
        for(id in todos)
            dates.push(todos[id]["created_at"]);
        dates.sort();
        dates.reverse();
        for(let i = 0; i < dates.length; i++)
            for(id in todos)
                if(todos[id]["created_at"].getTime() == dates[i].getTime())
                    order.push(id);
    }

    function sort_by_priority(){
        order = [];
        let temp = {};
        for(id in todos)
            temp[id] = todos[id];
        for(let i=5; i > 0; i--)
            for(id in temp)
                if(temp[id]["priority"] == i){
                    order.push(id);
                    delete temp[id];
                }
    }

  


});