/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: _Abiodun Oke__ Student ID: _117180166__ Date: _2019-05-29__
*
*
********************************************************************************/ 

function updatePageWithXMLData(){
	$.ajax({
		type: "GET",
		dataType: "json",
		contentType: "application/json",
		url: "data.json",
		success: function(data){
			var count = 0;
			$.each(data,function(i,j){
				var name = j.name;
				var department = j.department;
				var address = j.address;
				var state = j.state;
		
				count++;
				var data = "\
						<tr>\
							<td>"+count +"</td>\
							<td>"+name+"</td>\
							<td>"+department+"</td>\
							<td>"+address+"</td>\
							<td>"+state+"</td>\
						</tr>\
						";

				$("#result").append(data);
			})
		}
	})

}