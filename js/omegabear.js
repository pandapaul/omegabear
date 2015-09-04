$(function () {

	var
	
	searchContainer = $('.search-container'),
	searchInput = searchContainer.find('input.search'),
	searchButton = searchContainer.find('button.search'),

	resultsContainer = $('.results-container'),
	loadingMessage = resultsContainer.find('.loading-message'),
	resultsCount = resultsContainer.find('.results-count'),
	resultsRows = resultsContainer.find('.results-rows');


	searchInput.on('keydown', function (ev, data) {
		var character;
		if (ev.which === 13) {
			activateSearch();
		}
	});

	searchButton.on('click', function () {
		activateSearch();
	});

	function activateSearch() {
		loading();
		wordSearch(searchInput.val().toLowerCase()).done(function (res) {
			doneLoading(res);
		});
	}

	function loading() {
		loadingMessage.show();
		clearResults();
		disableSearchForm();
	}

	function doneLoading(res) {
		enableSearchForm();
		showResults(res);
		loadingMessage.hide();
	}

	function disableSearchForm() {
		searchInput.prop('disabled', true);
		searchButton.prop('disabled', true);
	}

	function enableSearchForm() {
		searchInput.prop('disabled', false);
		searchButton.prop('disabled', false);
	}

	function clearResults() {
		resultsCount.empty();
		resultsRows.empty();
	}

	function showResults(res) {
		var zebra = true;
		if (!(res && res.length)) {
			resultsCount.text('You can\'t make any words');
		} else if (res.length === 1) {
			resultsCount.text('You can make 1 word:');
		} else {
			resultsCount.text('You can make ' + res.length + ' words:');
		}
		$.each(res, function (i,v) {
			var row = $('<div/>')
				.addClass('result-row')
				.text(v.toUpperCase())
				.appendTo(resultsRows);
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