$(function () {

	var
	
	searchContainer = $('.search-container'),
	searchInput = searchContainer.find('input.search'),
	searchButton = searchContainer.find('button.search'),

	resultsContainer = $('.results-container');


	searchButton.on('click', function () {
		disableSearchForm();
		wordSearch(searchInput.val()).done(function (res) {
			showResults(res);
			enableSearchForm();
		});
	});

	function disableSearchForm() {
		searchInput.prop('disabled', true);
		searchButton.prop('disabled', true);
	}

	function enableSearchForm() {
		searchInput.prop('disabled', false);
		searchButton.prop('disabled', false);
	}

	function showResults(res) {
		var zebra = true;
		resultsContainer.empty();
		$.each(res, function (i,v) {
			var row = $('<div/>')
				.addClass('result-row')
				.text(v)
				.appendTo(resultsContainer);
			row.toggleClass('zebra', zebra);
			zebra = !zebra;
		});
	}

	function wordSearch(searchString) {
		searchString = searchString || '';
		var dfd = $.Deferred(),
			matchingWords = [];
		setTimeout(function () {
			$.each(words, function (i, v) {
				var match = true,
					searchLetters = searchString.split((''));
				if (v.length > searchString.length) {
					return;
				}
				$.each(v.split(''), function (li,lv) {
					var matchingLetterIndex = searchLetters.indexOf(lv);
					if (matchingLetterIndex < 0) {
						match = false;
						return false;
					} else {
						searchLetters.splice(matchingLetterIndex, 1);
					}
				});
				if (match) {
					matchingWords.push(v);
				}
			});
			dfd.resolve(matchingWords);
		}, 0);
		return dfd;
	}
	
});