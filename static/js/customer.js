$(document).ready(function(){
	var dataTable = $("#dataTable").DataTable()
	var customerChannel = pusher.subscribe('customer');
	customerChannel.bind('add', function(data) {
	var date = new Date();
	dataTable.row.add([
	    data.name,
	    data.position,
	    data.office,
	    data.age,
	    `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`,
	    data.salary
	  ]).draw( false );
	});
});