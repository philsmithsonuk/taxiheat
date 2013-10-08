$.start_journey.addEventListener('click', function(){
	
	var phone = $.txf_taxiPhone.value;
	var plate = $.txf_taxiPlate.value;
	
	if(validForm(phone, plate))
	{	
		saveForm(phone, plate);
			
			if(Ti.Geolocation.locationServicesEnabled)
			{
				Ti.API.info("location services: "+Ti.Geolocation.locationServicesEnabled);
				Ti.Geolocation.purpose = L('alrt_locationRequest');
				Ti.Geolocation.getCurrentPosition(function(e){				
					if(e){		
						Ti.API.info(e);
						Ti.App.Properties.setString("startTime", new Date().getTime());
						Ti.App.Properties.setString("startPositionLong",e.coords.longitude);
						Ti.App.Properties.setString("startPositionLat",e.coords.latitude);
						var injourney = new Alloy.createController('injourney').getView();
						injourney.open();
						$.prejourney.close();
					}
					else
						alert(L('alrt_gpsFail'));						
				});				
			}
	}	
});

function validForm(phone, plate)
{
	if(phone == "" || plate == "")
	{
		alert(L('complete_all'));
		return false;
	}
	
	return true;	 	
};

function saveForm(phone, plate)
{
	Ti.App.Properties.setString('taxiPhone',phone);
	Ti.App.Properties.setString('taxiPlate',plate);
}

