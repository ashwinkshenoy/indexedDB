// Query saved Data
// db.contact
//    .where('email')
//    .equalsIgnoreCase("ashwin@foofys.com")
//    .each (function (contact) {
//       console.log ("Found Ashwin: " + JSON.stringify(contact));
//    });

$(document).ready(function($) {
	// Define your database
	var db = new Dexie("contact_DB");
	db.version(2).stores({
		contact: 'email,name,message'
	});

	// Open it
	db.open().catch(function (e) {
		console.log("Open failed: " + e);
	});

	// Load saved Data
	function loadTable(){
		$('.table tbody').html("");
		db.contact
			.each (function (contact) {
				var tr = '<tr>'+
										'<td>'+contact.name+'</td>'+
										'<td>'+contact.email+'</td>'+
										'<td>'+contact.message+'</td>'+
									'</tr>';
				$('.table tbody').append(tr);
			});
	} // reload table

	// Load Table
	loadTable();


	$('#submit').click(function(event) {
		var c_name = $('input[name="name"]').val();
		var c_email = $('input[name="email"]').val();
		var c_msg = $('textarea[name="message"]').val();
		db.contact.put({
			name: c_name,
			email: c_email,
			message: c_msg
		}).then(function (contact) {
			console.log(contact+' added to IDB!');
			loadTable();
		});
		$('input[type="text"]').val('');
		$('textarea').val('');
	}); // on click

	$('#delete').click(function(event) {
		db.delete().then(() => {
			console.log("Database successfully deleted");
		}).catch((err) => {
			console.error("Could not delete database");
		}).finally(() => {
			// Do what should be done next...
			location.reload();
		});
		loadTable();
	}); // on click

	// Delete Induvidual by emailid
	// db.contact.delete('ashwinkshenoy@gmail.com');

}); // doc.ready
