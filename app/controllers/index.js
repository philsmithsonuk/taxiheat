$.index.open();

$.start_button.addEventListener('click', function(){
	var config = new Alloy.createController("config").getView();
	config.open();
	$.index.close();		    
});
