console.log("I'm working");

const $button = $("#btn");

$button.on("click", function(){
    $(".ingredient").clone().appendTo(".ingredient");
});