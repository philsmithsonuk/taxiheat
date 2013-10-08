$.submit_fare.addEventListener('click', function(){
	var fare = $.txf_fare.value;
	if(validForm(fare))
	{
		if(Ti.Network.online)
		{
			submitFare();
		}
		else
			{
				var dialog = Ti.UI.createAlertDialog({
			    title: L('alrt_offline'),
			    buttonNames: ['OK', 'CANCEL']
				});
				
				dialog.addEventListener('click', function(e){
					   switch (e.index) {
					          case 0:					          	
					          break;
					      
					          case 1: 
					          	var index = new Alloy.createController('index').getView();
								index.open();	
								$.end.close();
					          break;
					 
					          default:
					          break;					 
					      }					
				});  
				dialog.show();
							
			}
	}
	else
		alert(L('alrt_fare'));
	
});

//"gg" na, prompt then go back to homepage
function ggDialog()
{
	var dialog = Ti.UI.createAlertDialog({
			    title: L('alrt_end'),
			    buttonNames: ['OK']
			  });
	dialog.addEventListener('click', function(){
		var index = new Alloy.createController('index').getView();
		index.open();	
		$.end.close();
	});  
	dialog.show();
}

function submitFare()
{
	var start_lat = Ti.App.Properties.getString("startPositionLat");
  	var start_lng = Ti.App.Properties.getString("startPositionLong");
	var end_lat = Ti.App.Properties.getString("endPositionLat");
  	var end_lng = Ti.App.Properties.getString("endPositionLong");
  	var fare = $.txf_fare.value;
  	var totalTime = Ti.App.Properties.getString("totalTime");
  	var plate = Ti.App.Properties.getString("taxiPlate");
	
	var xhr = Ti.Network.createHTTPClient();
	
	xhr.onerror = function(){
		alert(L('alrt_offline'));
	};
	xhr.onload = function(e){
		ggDialog();
	};
	
	xhr.open('POST','http://www.taxiheat.com/saveJourney.php');
	xhr.send({
		start_lat:start_lat,
		start_lng:start_lng,
		end_lat:end_lat,
		end_lng:end_lng,
		fare:fare,
		time:totalTime,
		plate:plate		
	});	
}

function validForm(fare)
{
	if(fare == "")
		return false;
	
	return true;	
}

//Calculate Time Taken
var timeTaken = function calculateTime()
{
	var startTime = Ti.App.Properties.getString("startTime");
	var endTime = Ti.App.Properties.getString("endTime");
	var totalTime = endTime - startTime;
	//set to property so we can use it later when we save to the server
	Ti.App.Properties.setString("totalTime",totalTime);
	var totalSec = parseInt( totalTime / 1000);
	hours = parseInt( totalSec / 3600 ) % 24;
	minutes = parseInt( totalSec / 60 ) % 60;
	seconds = totalSec % 60;		
	result = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
			

	$.lbl_timeValue.text = (result);
};

var time = new timeTaken();


var calculateDistance = function calculateDistance()
{
	var lat1 = Ti.App.Properties.getString("startPositionLong");
	var lon1 = Ti.App.Properties.getString("startPositionLat");
	var lat2 = Ti.App.Properties.getString("endPositionLong");
	var lon2 = Ti.App.Properties.getString("endPositionLat"); 
	
	
	$.lbl_distanceValue.text = getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2);
};

var distance = new calculateDistance();

function deg2rad(deg) {
			  return deg * (Math.PI/180);
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	  var R = 6371; // Radius of the earth in km
	  var dLat = deg2rad(lat2-lat1);  // deg2rad below
	  var dLon = deg2rad(lon2-lon1); 
	  var a = 
	    Math.sin(dLat/2) * Math.sin(dLat/2) +
	    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
	    Math.sin(dLon/2) * Math.sin(dLon/2)
	    ; 
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	  var d = R * c; // Distance in km
	  d = Math.round(d*100)/100;
	  return d;
}