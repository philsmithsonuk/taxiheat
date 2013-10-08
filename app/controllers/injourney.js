//TODO: get button text with subtitle

$.btn_help.addEventListener('click', function(){
	
	Ti.Geolocation.purpose = L('alrt_locationRequest');
	Ti.Geolocation.getCurrentPosition(function(e){				
		if(e){	
			//TODO: send SMS to all emergency contacts								
			Ti.App.Properties.setString("currentPosition",e.coords);	
			alert(L('msg_help'));			
		}
		else{
			var long = Ti.App.Properties.getString("startPositionLong",e.coords);
			var lat = Ti.App.Properties.getString("startPositionLat",e.coords);
			alert(L('alrt_gpsFailSMSSent'));
		}						
	});	
});

$.btn_endJourney.addEventListener('click', function(){
	Ti.Geolocation.purpose = L('alrt_locationRequest');
	Ti.Geolocation.getCurrentPosition(function(e){				
		if(e){						
			Ti.App.Properties.setString("endPositionLong",e.coords.longitude);
			Ti.App.Properties.setString("endPositionLat",e.coords.latitude);
			Ti.App.Properties.setString("endTime",new Date().getTime());
			var end = new Alloy.createController('end').getView();
			end.open();	
			$.injourney.close();
		}
		else
			alert(L('alrt_gpsFail'));						
	});	
});

