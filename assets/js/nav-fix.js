(function () {
	'use strict';

	function getTarget(link) {
		var href = link.getAttribute('href');

		if (!href || href.charAt(0) !== '#' || href.length < 2)
			return null;

		try {
			return document.querySelector(href);
		}
		catch (error) {
			return null;
		}
	}

	function scrollToTarget(target, updateHash, instant) {
		var headerOffset = window.innerWidth <= 1280 ? 64 : 0;
		var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

		window.scrollTo({
			top: Math.max(0, top),
			behavior: instant || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
		});

		if (updateHash && history.pushState)
			history.pushState(null, '', '#' + target.id);
	}

	document.addEventListener('DOMContentLoaded', function () {
		if (window.jQuery)
			window.jQuery('a.scrolly').off('click.scrolly');

		document.querySelectorAll('a[href^="#"]').forEach(function (link) {
			var target = getTarget(link);

			if (!target)
				return;

			link.addEventListener('click', function (event) {
				event.preventDefault();
				scrollToTarget(target, true);
			});
		});

		if (window.location.hash) {
			var initialTarget = document.querySelector(window.location.hash);

			if (initialTarget)
				window.setTimeout(function () {
					scrollToTarget(initialTarget, false, true);
				}, 150);
		}

		var sidebarLinks = Array.prototype.slice.call(document.querySelectorAll('#sidebar a[href^="#"]'));
		var sections = sidebarLinks
			.map(function (link) {
				return {
					link: link,
					target: getTarget(link)
				};
			})
			.filter(function (item) {
				return item.target;
			});

		function updateActiveSection() {
			var probe = window.scrollY + Math.max(120, window.innerHeight * 0.32);
			var active = sections[0];

			sections.forEach(function (item) {
				if (item.target.offsetTop <= probe)
					active = item;
			});

			if (!active)
				return;

			sidebarLinks.forEach(function (link) {
				link.classList.remove('active');
				link.classList.remove('active-locked');
			});

			active.link.classList.add('active');
		}

		if (sections.length) {
			updateActiveSection();
			window.addEventListener('scroll', updateActiveSection, { passive: true });
			window.addEventListener('resize', updateActiveSection);
		}
	});
})();
