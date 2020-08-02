const SITE_NAME = 'JQuery Component Based Framework';
const GENERIC_ERROR = 'Oops! An error has occurred.';
const WINDOW_HASH = window.location.hash ? window.location.hash.substring(1, window.location.hash.length) : false;
const MAIN_NAV = $('[data-component="nav"]');
const MENU_TOGGLER = MAIN_NAV.find('.menu-toggler');

var app = app || {};

app.config = app.config || {};

var debug = console.log;
debug.notice = (msg) => console.log('%c' + msg, 'color: #110D66');
debug.success = (msg) => console.log('%c' + msg, 'color: #0B8B11');
debug.warning = (msg) => console.log('%c' + msg, 'color: #C67000');
debug.alert = (msg) => console.log('%c' + msg, 'color: #C50000');

app.isMobile = () => {
	return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

app.ajax = function (url, data = null) {
	let type = data ? 'post' : 'get';

	return $.ajax({
		url: url,
		data: data,
		type: type,
		timeout: 0
	});
}

app.post = function ($form, showLoader = true) {
	return app.ajax($form.attr('action'), $form.find(':input').serialize(), showLoader);
}

app.scrollTo = function (element, offset = 0, callback) {
	let page = $("html, body");

	page.on('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function () {
		page.stop();
		stopSrollBinding();
	});

	page.animate({
		'scrollTop': $(element).offset().top + offset
	}, 750, function () {
		stopSrollBinding();

		if (typeof callback == 'function') return callback();
	});

	function stopSrollBinding() {
		page.off('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove');
	}
}

app.generatePopup = (id, $content, settings = {}) => {
	if (!id) return;

	let classes = settings.classes || 'col-12',
		bgurl = settings.bgurl || '',
		bgc = settings.bgc || 'white',
		no_close = settings.no_close || false,
		default_open = typeof settings.default_open != 'undefined' ? settings.default_open : true,
		close_link = settings.close_link || false;

	let el,
		body = $('body');

	let el_start =
		`<div class="popup-container${no_close ? ' no-close' : ''}" data-popup-id="${id}" data-component="popup">
		<div class="popup position-relative w-100">
			<div class="container">
				<div class="row justify-content-center align-items-center">
					<div class="${classes} ${bgc}-background popup-content-container" ${bgurl ? 'style="background-image:url(' + bgurl + ')"' : ''}>`;
	if (!no_close) {
		el_start += `<div class="w-100 text-right close-btn-container${close_link ? ' absolutely-pretty' : ''}">
							<${close_link ? 'a href="' + close_link + '"' : 'div'} class="close-btn"></${close_link ? 'a' : 'div'}>
						</div>`;
	}
	let el_end = `<div class="w-100 popup-inner">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>`;

	el = $('body > [data-popup-id="' + id + '"]');

	if (el.length) {
		if ($content) {
			el.find('.popup-inner').html('').append($content);
		}

		if (default_open) {
			el.trigger('open');
		}
	} else {
		el = $(el_start + el_end);
		el.initialize();

		if ($content) {
			el.find('.popup-inner').html('').append($content);
		}

		body.append(el);

		if (default_open) {
			setTimeout(() => {
				el.trigger('open');
			}, 200);
		}
	}

	return el;
}

app.getPopup = (id = false) => {
	if (!id) return;

	return $('[data-popup-id="' + id + '"]');
}

app.getParameterByName = function (name, url) {
	if (!url) {
		url = window.location.href;
	}
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

String.prototype.toTitleCase = function () {
	return this.toLowerCase().replace(
		/\w\S*/g,
		function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}
	);
}

String.prototype.replaceAll = function (search, replacement) {
	var target = this;
	return target.replace(new RegExp("\\" + search, 'g'), replacement);
}

String.prototype.slugify = function () {
	str = this.replace(/^\s+|\s+$/g, '').toLowerCase();

	// Remove accents, swap ñ for n, etc
	var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
	var to = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";

	for (var i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	str = str.replace(/[^a-z0-9 -]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');

	return str;
}

$.fn.chunk = function (chunk_size) {
	var _type = typeof this == 'object' && this.length ? 'collection' : false;

	if (_type != 'collection') return false;

	var tempArray = [];

	for (var i = 0; i < this.length; i += chunk_size) {
		myChunk = this.slice(i, i + chunk_size);
		// Do something if you want with the group
		tempArray.push(myChunk);
	}

	return tempArray;
}

Array.prototype.chunk = function (chunk_size) {
	var tempArray = [];

	for (var i = 0; i < this.length; i += chunk_size) {
		myChunk = this.slice(i, i + chunk_size);
		// Do something if you want with the group
		tempArray.push(myChunk);
	}

	return tempArray;
}

app.waiter = (element, callback, found = false) => {
	if ($(element).length && !found) {
		callback($(element));
		found = true;
	} else {
		setTimeout(function () {
			app.waiter(element, callback, false);
		}, 100);
	}
}

app.randomHex = () => {
	return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
}

app.randomString = (length) => {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;

	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

jQuery.fn.extend({
	setClass: function () {
		this.each(function () {
			if (jQuery(this).data('ComponentClass') === undefined && jQuery(this).data('component') !== undefined) {
				let className = jQuery(this).data('component').charAt(0).toUpperCase() + jQuery(this).data('component').slice(1);
				let ComponentClass = app[className];
				if (!ComponentClass) {
					debug.warning('app.' + className + ' is not a class!');
					jQuery(this).data('ComponentClass', false);
				} else {
					debug.success('app.' + className + ' component LOADED!');
					jQuery(this).data('ComponentClass', new ComponentClass(jQuery(this)));
				}
			}
		});
		return this;
	},
	getClass: function () {
		return this.data('ComponentClass');
	},
	findComponent: function (selector) {
		let componentNames = selector.split(' ');
		let parent = this && this !== window ? this : document;
		return jQuery(parent).find('[data-component="' + componentNames.join('"] [data-component="') + '"]').setClass();
	},
	initialize: function () {
		$(this).find('[data-component]').setClass().trigger('load');
		if ($(this).data('component')) {
			$(this).setClass().trigger('load');
		}
	}

});

var $$ = jQuery.fn.findComponent;

app.Component = class {
	constructor($this) {
		this.$this = $this;

		if (typeof this.onLoad === 'function') {
			$this.on('load', () => this.onLoad($this));
		}

		if (typeof this.onReady === 'function') {
			$(() => this.onReady($this));
		}
	}
}

$.fn.isInViewport = function (percentage, whole_element = false) {
	var elementTop = $(this).offset().top;
	var elementBottom = elementTop + $(this).outerHeight();

	var viewportTop = $(window).scrollTop();
	var viewportBottom = viewportTop + $(window).height();

	percentage = (percentage != null || typeof percentage != 'undefined') ? percentage : 1;
	var real_perc = 1 * percentage;
	var remainder = 1 - real_perc;

	if (whole_element) {
		/* IF % of element height is in viewport */
		return (elementTop + ($(this).outerHeight() * real_perc)) <= viewportBottom && elementBottom - ($(this).outerHeight() * remainder) > viewportTop;
	} else {
		/* If element top is in % of viewport */
		return (elementTop - viewportTop) / $(window).height() <= real_perc;
	}

}

$('a[href="#"], a[disabled]').on('click', (e) => {
	e.preventDefault();
});

initCheckboxes = () => {
	let checkboxes = $('input[type="checkbox"]');

	if (checkboxes.length) {
		checkboxes.each((i, el) => {
			$(el).wrapAll('<label for="' + $(el).attr('id') + '" class="custom-checkbox"/>').parent().append('<span class="styledCheckBox"/>');
		});
	}
}

initPopups = () => {
	let popup = null;

	/* for popups to be generated on page load */
	let generatePopups = $('[data-generate-popup]');
	let gen_popup_content = null;
	let gen_popup_settings = {};

	if (generatePopups.length) {
		generatePopups.each((i, el) => {
			gen_popup_content = $(el).data('popup-content'); // should be a CSS query identifier e.g. #popup-content>.content
			gen_popup_settings = $(el).data('popup-settings'); // should be JSON array. Check function app.generatePopup() for settings format and variables

			gen_popup_settings = typeof gen_popup_settings == 'string' ? JSON.parse(gen_popup_settings) : gen_popup_settings;

			if (typeof gen_popup_content != 'undefined' && gen_popup_content != '') {
				app.generatePopup($(el).data('generate-popup'), $(gen_popup_content), gen_popup_settings);
			}
		});
	}

	/* For popups already existing and only needs to open on click trigger */
	$('body').on('click', '[data-open-popup]', function (e) {
		e.preventDefault();

		if ($(this).data('open-popup') != '') {
			popup = $('body > [data-popup-id="' + $(this).data('open-popup') + '"]');

			popup.trigger('open');
		}
	});
}

app.setCookie = (cname, cvalue, exdays, path) => {
	let expires = '';
	if (exdays) {
		let d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		expires = "expires=" + d.toUTCString() + ";";
	}

	document.cookie = cname + "=" + cvalue + ";" + expires + "path=" + (typeof path == 'undefined' || !path ? '/' : path);
}

app.getCookie = (cname) => {
	let name = cname + "=";
	let ca = document.cookie.split(';');

	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];

		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}

		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}

	return "";
}

app.delete_cookie = (name) => {
	document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}