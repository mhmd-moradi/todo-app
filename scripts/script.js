$(document).ready(function(){

    let history = JSON.parse(localStorage.getItem("history"));
    const todos = {};
    var order = [];
    var edit = -1;

    function restore_todos(){
        for (h in history){
            todos[h] = history[h];   
            todos[h]["created_at"] = new Date(todos[h]["created_at"]);    
        }
    }

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
        let info = {};
        info["title"] = title;
        info["desc"] = desc;
        info["priority"] = priority;
        info["is_done"] = false;
        info["created_at"] = time;
        todos[id] = info;
        localStorage.setItem("history", JSON.stringify(todos));
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

    function create_todo_html(id, title, description, priority){
        let todo_html = $($.parseHTML('<div id="'+id+'" class="todo"><div class="todo-title">Title: '+title+'</div><div class="todo-description">Description: '+description+'</div><div class="todo-priority">Priority: '+priority+'</div><div class="icons"><i class="fa fa-edit fa-2x"></i><i class="fa fa-trash fa-2x"></i><i class="fa fa-check fa-2x"></i></div></div>'));
        $("#current-todos").append(todo_html);
    }

    function show_todos(){
        $("#current-todos").html("");
        if($( "#filter option:selected" ).val() == "time")
            sort_by_date();
        else
            sort_by_priority();
        for(let i=0; i<order.length; i++){
            let id = order[i];
            console.log(id);
            if(!todos[id]["is_done"])
                create_todo_html(id, todos[id]["title"], todos[id]["desc"], todos[id]["priority"]);
        }
        icons_action();
    }

    function icons_action(){
        $(".fa-check").click(function(){
            let id = $(this).parent().parent().attr("id");
            todos[id]["is_done"] = true;
            localStorage.setItem("history", JSON.stringify(todos));
            show_todos();
            show_done();
        });

        $(".fa-trash").click(function(){
            let id = $(this).parent().parent().attr("id");
            delete todos[id];
            localStorage.setItem("history", JSON.stringify(todos));
            show_todos();
        });

        $(".fa-edit").click(function(){
            let id = $(this).parent().parent().attr("id");
            edit = id;
            $("#title").val(todos[id]["title"]);
            $("#description").val(todos[id]["desc"]);
            $("#add-btn").html("Update Todo");
        });
    }

    function show_done(){
        $("#done").html("");
        for(id in todos)
            if(todos[id]["is_done"])
                create_done_html(todos[id]["title"], todos[id]["desc"]); 
    }

    function create_done_html(title, description){
        let todo_html = $($.parseHTML('<div class="todo"><div class="todo-title">Title: '+title+'</div><div class="todo-description">Description: '+description+'</div></div>'));
        $("#done").append(todo_html);
    }

    function search(){
        $("#current-todos").html("");
        order = [];
        let temp = {};
        for(id in todos)
            temp[id] = todos[id];
        for(id in temp)
            if(temp[id]["title"].search($("#search").val()) != -1 || temp[id]["desc"].search($("#search").val()) != -1){
                console.log(temp[id]["title"].search($("#search").val()), temp[id]["desc"].search($("#search").val()));
                order.push(id);
                delete temp[id];
            }
        for(let i=0; i<order.length; i++){
            let id = order[i];
            console.log(id);
            if(!todos[id]["is_done"])
                create_todo_html(id, todos[id]["title"], todos[id]["desc"], todos[id]["priority"]);
        }
        icons_action();
    }

    $("#add-btn").click(function(){
        if(check_fields()){
            if(edit == -1)
                create_todo(generate_id(), $("#title").val(), $("#description").val(), $( "#priority option:selected" ).val(), new Date($.now()));
            else{
                todos[edit]["title"] = $("#title").val();   
                todos[edit]["desc"] = $("#description").val(); 
                todos[edit]["priority"] = $("#priority option:selected" ).val(); 
                edit = -1;
                $("#add-btn").html("Add Todo");
            }
            show_todos(); 
        }else
            alert("Please Fill All Fields");
    });

    $("#filter").change(function() {
       show_todos();
    });

    $("#search").keyup(function() {
        search();
    });

    restore_todos();
    show_todos();
    show_done();

});