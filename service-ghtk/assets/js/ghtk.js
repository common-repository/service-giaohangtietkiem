jQuery(document).ready(function(){
	jQuery("#woocommerce_svw_shipping_ghtk_sender_city, #woocommerce_svw_shipping_ghtk_sender_district, #woocommerce_svw_shipping_ghtk_sender_ward").select2();

	if ( jQuery('#woocommerce_svw_shipping_ghtk_sender_city').length > 0 ) {
		jQuery('#woocommerce_svw_shipping_ghtk_sender_city').on('change', function(){
			jQuery.ajax({
				type: 'POST',
			  	url: svw_admin_params.ajax.url,
			  	data: {
			  		city_id : jQuery(this).val(),
			  		action: 'admin_update_shipping_method_district'
			  	}
			}).done(function(result) {
				jQuery('#woocommerce_svw_shipping_ghtk_sender_district').html(result);
			});
		});
	}

	// Update Xã / Phường Khi Chọn Thành Phố GHTK
	if ( jQuery('#woocommerce_svw_shipping_ghtk_sender_district').length > 0 ) {
		jQuery('#woocommerce_svw_shipping_ghtk_sender_district').on('change', function(){
			jQuery.ajax({
				type: 'POST',
			  	url: svw_admin_params.ajax.url,
			  	data: {
			  		district_id : jQuery(this).val(),
			  		action: 'admin_update_shipping_method_ward'
			  	}
			}).done(function(result) {
				jQuery('#woocommerce_svw_shipping_ghtk_sender_ward').html(result);
			});
		});
	}

	if ( jQuery('#svw_create_order_ghtk').length > 0 ) {
		jQuery('#svw_create_order_ghtk').on('click', function(){
			jQuery.ajax({
				type: 'POST',
			  	url: svw_admin_params.ajax.url,
			  	data: {
					action              : 'create_order_ghtk',
					recipient_name      : jQuery(this).data('recipient_name'),
					recipient_address   : jQuery(this).data('recipient_address'),
					recipient_phone     : jQuery(this).data('recipient_phone'),
					recipient_city      : jQuery(this).data('recipient_city'),
					recipient_district  : jQuery(this).data('recipient_district'),
					recipient_ward      : jQuery(this).data('recipient_ward'),
					sender_name         : jQuery(this).data('sender_name'),
					sender_address      : jQuery(this).data('sender_address'),
					sender_phone        : jQuery(this).data('sender_phone'),
					sender_city         : jQuery(this).data('sender_city'),
					sender_district     : jQuery(this).data('sender_district'),
					sender_ward         : jQuery(this).data('sender_ward'),
					sender_token        : jQuery(this).data('sender_token'),
					cod_fee             : jQuery(this).data('cod_fee'),
					service_id          : jQuery(this).data('service_id'),
					total_weight        : jQuery(this).data('total_weight'),
					order_id            : jQuery(this).data('order_id'),
					recipient_note_extra: jQuery('textarea[name="recipient_note_extra"]').val(),
			  	},
			  	beforeSend: function( xhr ) {
				    jQuery('#svw_create_order_ghtk').html('ĐANG XỬ LÝ ...');
				    jQuery('#svw_create_order_ghtk').attr('disabled','disabled');
				}
			}).done(function(result) {
				jQuery('#svw_create_order_ghtk').remove();
				jQuery('.svw-response').html(result);
			});
		});
	}

	if ( jQuery('.svw-ghtk-status').length > 0 ) {
		jQuery.ajax({
			type: 'POST',
		  	url: svw_admin_params.ajax.url,
		  	data: {
				ghtk_code: jQuery('.svw-ghtk-status').data('ghtk_code'),
				action  : 'get_status_order_ghtk',
				token   : jQuery('.svw-ghtk-status').data('token')
		  	}
		}).done(function(result) {
			jQuery('.svw-ghtk-status span').html(result);
		});
	}

    if ( jQuery('#svw_cancel_package_ghtk').length > 0 ) {
        jQuery('#svw_cancel_package_ghtk').on('click', function () {
            jQuery.ajax({
                type: 'POST',
                url: svw_admin_params.ajax.url,
                data: {
                    action  : 'cancel_package_ghtk',
					ghtk_code : jQuery('#svw_cancel_package_ghtk').data('ghtk_code'),
                    token   : jQuery('#svw_cancel_package_ghtk').data('token')
                },
                beforeSend: function( xhr ) {
                    jQuery('#svw_cancel_package_ghtk').html('ĐANG XỬ LÝ ...');
                    jQuery('#svw_cancel_package_ghtk').attr('disabled','disabled');
                }
            }).done(function(result) {
                jQuery('#svw_cancel_package_ghtk').remove();
                jQuery('.svw-response').html(result);
            });
        });
	}

	// if ( jQuery('.svw-ghtk-print').length > 0 ) {
	// 	jQuery('.svw-ghtk-print').on('click', function () {
	// 		jQuery.ajax({
	// 			type: 'GET',
	// 			url: svw_admin_params.ajax.url,
	// 			data: {
	// 				action  : 'print_package_ghtk',
	// 				ghtk_code : jQuery('.svw-ghtk-print').data('ghtk_code'),
	// 				token   : jQuery('.svw-ghtk-print').data('token')
	// 			},
	// 			beforeSend: function( xhr ) {
     //                jQuery('.svw-ghtk-print').html('ĐANG XỬ LÝ ...');
     //                jQuery('.svw-ghtk-print').attr('disabled','disabled');
	// 			}
	// 		}).done(function(result) {
	// 			jQuery('.svw-ghtk-print').remove();
	// 			jQuery('.svw-response').html(result);
	// 		});
	// 	});
	// }
});