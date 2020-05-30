$(document).ready( function () {
	var table, fileUrl, selectedBranch, auth_Signature;	
	$('#container').hide();	
	$('#print_all').hide();
	$('#refresh').hide();

	$('#selectBranch').change(function() {
		var selected = $(this).val();
		if (selected == 1) {
			selectedBranch = $("#selectBranch option:selected").html();
			$('#selectedDirector').val('DR. LAURA T. DAVID');
			$('#selectedPosition').val('DIRECTOR');
			$('#selectedEsig').val('img/ltd_esig1.png');
			auth_Signature = 'Authorized Signature';
			
		} else if(selected == 2) {
			selectedBranch = $("#selectBranch option:selected").html();
			$('#selectedDirector').val('DR. MA. JOSEFA R. PANTE');
			$('#selectedPosition').val('DEPUTY DIRECTOR FOR BML');
			$('#selectedEsig').val('img/ltd_esig2.png');
			auth_Signature = 'Authorized Signature';
		} else {
			selectedBranch = $('').html();
			$('#selectedDirector').val('');
			$('#selectedPosition').val('');
			$('#selectedEsig').val('');
		}
	});

	$('#btnApplyChanges').click(function () {
		$('.head-title').text(selectedBranch);
		$('.esig').attr('src', $('#selectedEsig').val());
		$('.directorName').text($('#selectedDirector').val());
		$('.directorName').text($('#selectedDirector').val());
		$('.directorPosition').text($('#selectedPosition').val());
		$('.authorizeSig').text(auth_Signature);

	});

});

$("#import").bind("click", function () {
	var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;

	if (regex.test($("#fileUpload").val().toLowerCase())) {
		if (typeof (FileReader) != "undefined") {
			$('#container').show();
			var reader = new FileReader();
			reader.onload = function (e) {
				$('#import').remove();
				$('#input_file').remove();
				$('#print_all').show();
				$('#refresh').show();
				var table_data = '<table id="dt_list" class="dataTables">';
				table_data += '<thead>';
				table_data += '<tr>';
				// table_data += '<th>No</th>';
				table_data += '<th>Employees</th>';
				table_data += '<th>Position</th>';
				table_data += '<th>Employee Barcode</th>';
				table_data += '<th>Status</th>';
				table_data += '</tr>';
				table_data += '</thead>';
				table_data += '<tbody>';
				var rows = e.target.result.split("\n");
				for (var i = 1; i < rows.length -1; i++) {
					// var cells = rows[i].split(',');
					var cells = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/g);
					table_data += '<tr>';
					for (var j = 0; j < 4; j++) { // cells.length
						if (i > 0) {
							// let status = cells[j];
							// $.each([ status ], function( index, value ) {
							//   if (index %4 === 0) {
							// 	console.log(value);
							//   }
							// });
							table_data += '<td>' +  cells[j] + '</td>';
						} else {

						}
					}
					table_data += '</tr>';	
				}
				table_data += '</tbody>';
				table_data += '</table>';

				$("#employee_table").html(table_data);
				table = $('#dt_list').DataTable();
				loadPreviewPrint(table);
			}
			reader.readAsText($("#fileUpload")[0].files[0]);
		} else {
			alert("This browser does not support HTML5.");
		}
	} else {
		alert("Please upload a valid CSV file.");
	}

});

function loadPreviewPrint(table) {
	var data = table.rows().data();
	data.each(function (value, index) {
		// replace all td that has double qoutes 
		let names1 = `${value[0]}`.replace(/\"/g, '');
		let names2= names1.replace(/\�/g, 'ñ');
		let position = `${value[1]}`;
		let empid = `${value[2]}`;
		let print_status = `${value[3]}`;
		if (print_status == 'C') {
		} else {
			$('#print_area').append(
				'<div class="col-xs-6 col-id">' +
					'<div class="panel panel-default border-3 text-center panel-id ">' +
						'<div class="tm-10 bm-10">' +
							'<img src="img/msi.png" class="id-logo" />' +
							'<img src="img/cs.png" 	class="id-logo" />' +
							'<img src="img/up.png" 	class="id-logo" />' +
						'</div>' +
						'<div class="id-head">' + '<p class="head-title text-white"></p><p class="head-subtitle text-white">COLLEGE OF SCIENCE<br> UNIVERSITY OF THE PHILIPPINES</p>' + '</div>' +
						'<div class="panel-content p-all-10">' +
							'<form class="id-form">' + 
								'<div class="row row-idpb">' +
									'<div class="col-xs-5 col-idp">' +
										'<img class="profile" src="img/admin.jpg" id="'+ 'img_'+ empid + '" onclick="loadProfile('+"'"+empid+"'"+');" /></div>' +
									'<div class="col-xs-7" style="padding-left:0px;"><img id="barcode'+ empid +'" /></div>' +
									'<input class="id-pic" type="file" accept="image/x-png,image/jpeg" id="'+ empid +'" onChange="readURL(this, '+"'"+empid+"'"+');">' +
									'<script>JsBarcode("#barcode'+ empid +'", "'+ empid +'", {format:"CODE128",displayValue:true,fontSize:17,fontOptions: "bold",width: 1.4, height: 75, marginTop: 15,marginBottom: 5,marginLeft: 0,marginRight: 0});</script>' +	
								'</div>' +
								'<div class="row row-idi">' +
									'<div class="y-bar"><h3 class="y-bar-title">' + names2 + '</h3></div>' +
									'<h3 class="position">' + position + '</h3>' +
									'<div class="form-group tm-25">' +
										'<div class="image-stack">' +
	    									'<div class="image-stack__item image-stack__item--top">' +
												// '<img src="img/ltd_esig.png" id="esig" class="esig" alt="" />' +
												'<img src="" id="esig" class="esig" alt="" />' +
											'</div>' +
										'</div>' +
										'<h4 class="director"><span class="directorName"></span><br />' +
											'<small><span class="directorPosition"></span> <br />' + 
											'<span class="authorizeSig"></span></small>' +
										'</h4>' + 
									'</div>' + 
								'</div>' +
							'</form>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<p class="newpage"></p>'
			);
		}
	});
	$('p.newpage:nth-child(' + (3) + 'n)').after('<p style="page-break-after:always !important;"></p>');

	// replace all td that has double qoutes 
    $('table tbody tr td').text(function(_,txt) {
        // return txt.replace(/\"/g, '');
        return txt.replace(/["�]/g, (m=>m==='"'? '':'ñ'));
    });
	// $('table tbody tr td').text(function(_,txt) {
 //        return txt.replace(/\�/g, '&ntilde;');
 //    });
}


function print_all() {
	var data = document.getElementById('print_area').innerHTML;
	
	var mywindow = window.open('', 'new div', 'height=400,width=600');
    mywindow.document.write('<html><head><title></title>');
    mywindow.document.write("<link rel=\"stylesheet\" href=\"bootstrap/css/bootstrap.min.css\" type=\"text/css\"  media=\"all\" /><link rel=\"stylesheet\" href=\"css/style.css\"   media=\"all\" />" );
    mywindow.document.write('</head><body >');
    mywindow.document.write(data);
    mywindow.document.write('</body></html>');
    mywindow.document.close();
    mywindow.focus();
    setTimeout(function(){ 
    	mywindow.print();
    	mywindow.close();
    },800);		     

    return true;
}

function loadProfile(id) {
	$('#'+id).click();
}

function readURL(input, id) {
	var ext = input.files[0]['name'].substring(input.files[0]['name'].lastIndexOf('.') + 1).toLowerCase();
	var reader = new FileReader();
	reader.onload = function(e) {
		$('#img_'+id).attr('src', e.target.result);
	}
	reader.readAsDataURL(input.files[0]);
}
