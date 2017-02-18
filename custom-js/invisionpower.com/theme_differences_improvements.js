if(window.location.href == "https://invisionpower.com/index.php?app=core&module=system&controller=plugins&do=diff" && $('.ipsType_pageTitle').text() != 'Theme Differences') {
	var applications=["All"];
	$('#ipsTabs_elThemeDiffs_el_themeDiffsHtml_panel .ipsHr').hide();
	$('#ipsTabs_elThemeDiffs_el_themeDiffsHtml_panel table.diff').hide();

	$('#ipsTabs_elThemeDiffs_el_themeDiffsHtml_panel .ipsSpacer_bottom').each( function(index) {
		index_name_mappings = [ 'application', 'location', 'group', 'template'];
		var outerDiv = this;
		var templateLocation = '';
		$(this).find('.ipsGrid_span3 .ipsType_large').each( function( index_name ) {
			var itemName = $(this).text();
			switch( index_name ) {
				case 0:
					templateLocation += itemName;
					if( applications.indexOf(itemName)==-1 )
						applications.push( itemName );
					break;
				case 1:
					templateLocation += '/' + itemName;
					break;
				case 2:
					templateLocation += '/' + itemName;
					break;
				case 3:
					templateLocation += '/' + itemName + '.phtml';
					$(outerDiv).find('.ipsGrid.ipsAreaBackground_light').append('<div class="clickToHide ipsGrid_span12"><span class="ipsType_large">' + templateLocation + ' (Click here to collapse/expand the diff)</span></div>');
					$(outerDiv).find('.clickToHide').on( 'click', function() {
						if( $(outerDiv).find('table.diff').length ) {
							$(outerDiv).find('table.diff').toggle();
						}
					});
					break;
			}
			$(outerDiv).attr('data-' + index_name_mappings[index_name], $(this).text());
			if( $(outerDiv).find('.ipsPad.ipsType_center.ipsType_large').length ) {
				var noDiffDiv = $(outerDiv).find('.ipsPad.ipsType_center.ipsType_large');
				var datastate = $(noDiffDiv).find('strong').text();
				$(outerDiv).attr('data-state', datastate);
			}
		});
	});

	$('.ipsPageHeader').append('<form id="formSelector"><select id="selectApplications"></select></form>');
	applications.forEach( function(value) {
		$('#selectApplications')
			.append($('<option>', { value : value })
			.text(value));
	});

	$( "#ipsTabs_elThemeDiffs_el_themeDiffsHtml_panel .ipsSpacer_bottom[data-state='added']" ).css({
		'background' :  'green',
		'opacity' : '0.6'
	});
	$( "#ipsTabs_elThemeDiffs_el_themeDiffsHtml_panel .ipsSpacer_bottom[data-state='deleted']" ).css({
		'background' :  'red',
		'opacity' : '0.6'
	});

	$( "#ipsTabs_elThemeDiffs_el_themeDiffsHtml_panel .ipsSpacer_bottom .ipsPad.ipsType_center.ipsType_large" ).css('color', 'white');

	$('#selectApplications').change( function() {
	    var selectedApp = $( "select option:selected" ).text();
	    if( selectedApp == 'All' ) {
	    	$( "#ipsTabs_elThemeDiffs_el_themeDiffsHtml_panel .ipsSpacer_bottom" ).show();
	    } else {
	    	$( "#ipsTabs_elThemeDiffs_el_themeDiffsHtml_panel .ipsSpacer_bottom" ).hide();
	    	$( "#ipsTabs_elThemeDiffs_el_themeDiffsHtml_panel [data-application='" + selectedApp + "']" ).show();
	    }
	});
}