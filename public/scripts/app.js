console.log("I'm working");

const $button = $("#btn");



$button.on("click", function(event){
    event.preventDefault()
    $(".ingredient:first").clone().appendTo(".ingredient-container");
});