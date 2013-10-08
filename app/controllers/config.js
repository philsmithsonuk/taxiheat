$.save_config.addEventListener('click', function(){	
	//TODO: check at least one input box is filled
	var prejourney = new Alloy.createController('prejourney').getView();	
	prejourney.open();
	$.config.close();	
});

//Show the contacts popup
function showTiContacts(theLabel)
{
		Titanium.Contacts.showContacts({
			cancel: function(e){},
			fields: ['firstName', 'lastName','phone'],
			selectedProperty: function(e){
				if(uniqueContact(e))
				{
					Ti.API.info("setting value:" + e.person.fullName);
					Ti.API.info("setting property:" + e.value);
					theLabel.setText(e.person.fullName);
					Ti.App.Properties.setString(theLabel+"_name", e.person.fullName);
					Ti.App.Properties.setString(theLabel+"_phone", e.value);
					theLabel.setImage('remove.png');
				}
				else
				{
					alert(L('contact_exists'));
				}
			}
		});
};

function removeUser(theLabel){
				
}

//Check if contact is unique
function uniqueContact(e)
{
	var c1 = Ti.App.Properties.getString($.lbl_contact1Name+"_name");
	var c1_phone = Ti.App.Properties.getString($.lbl_contact1Name+"_phone");
	if(e.person.fullName == c1 && e.value == c1_phone)
		return false;
	
	/*var c2 = Ti.App.Properties.getString($.lbl_contact2Name+"_name");
	var c2_phone = Ti.App.Properties.getString($.lbl_contact2Name+"_phone");
	if(e.person.fullName == c2 && e.value == c2_phone)
		return false;
	
	var c3 = Ti.App.Properties.getString($.lbl_contact3Name+"_name");
	var c3_phone = Ti.App.Properties.getString($.lbl_contact3Name+"_phone");
	if(e.person.fullName == c3 && e.value == c3_phone)
		return false;
	*/
	
	return true;
};

//Load Contacts from properties
if(Ti.App.Properties.getString($.lbl_contact1Name+"_name"))
{
	$.lbl_contact1Name.setText(Ti.App.Properties.getString($.lbl_contact1Name+"_name"));
	$.img_contact1Add.setImage('remove.png');
	
}
/*if(Ti.App.Properties.getString($.lbl_contact2Name+"_name"))
{
	$.lbl_contact2Name.setText(Ti.App.Properties.getString($.lbl_contact2Name+"_name"));
	$.img_contact2Add.setImage('remove.png');	
	
}

if(Ti.App.Properties.getString($.lbl_contact3Name+"_name"))
{
	$.lbl_contact3Name.setText(Ti.App.Properties.getString($.lbl_contact3Name+"_name"));
	$.img_contact3Add.setImage('remove.png');
	
}*/
$.img_contact1Add.addEventListener('click', function(e){showTiContacts($.lbl_contact1Name);});
//$.img_contact2Add.addEventListener('click', function(e){showTiContacts($.lbl_contact2Name);});
//$.img_contact3Add.addEventListener('click', function(e){showTiContacts($.lbl_contact3Name);});


