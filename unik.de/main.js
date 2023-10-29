
		$(document).ready(function() 
		{
	 	});

		var leftpos = new Array();

		leftpos[ "macbitch" ] = 0;
		leftpos[ "pet" ] = 0;
		leftpos[ "kurz" ] = 0;
		leftpos[ "kardio" ] = 0;
		leftpos[ "anruf" ] = 0;
		leftpos[ "subversive" ] = 0;
		leftpos[ "blusher" ] = 0;
		leftpos[ "intense" ] = 0;
		leftpos[ "disco" ] = 0;
		leftpos[ "shrooms" ] = 0;
		leftpos[ "love" ] = 0;
		leftpos[ "defrost" ] = 0;
		leftpos[ "pluxity" ] = 0;

		function nextImg(id, width, dir)
		{
			if(dir == 1)
				leftpos[ id ] -= width;
			else
				leftpos[ id ] += width;

			var numpics = $('.' + id + '_img').size() - 1;

			if(leftpos[ id ] <= (-numpics * width))
			{
				leftpos[ id ] = (-numpics * width);
                $('#' + id + '_next').attr('style', 'color:#84b018; text-decoration:line-through; cursor:pointer;');
			}
			else
			{
                $('#' + id + '_next').attr('style', 'color:#84b018; text-decoration:none; cursor:pointer;');
			}

			if(leftpos[ id ] >= 0)
			{
				leftpos[ id ] = 0;
                $('#' + id + '_prev').attr('style', 'color:#84b018; text-decoration:line-through; cursor:pointer;');
			}
			else
			{
                $('#' + id + '_prev').attr('style', 'color:#84b018; text-decoration:none; cursor:pointer;');
			}

			//alert('leftpos: ' + leftpos[ id ]);

			$('#' + id + '_inner').animate({ left:(leftpos[ id ]) + "px" }, { queue:false, duration:500, easing:'swing' }, function(){} );
		}
