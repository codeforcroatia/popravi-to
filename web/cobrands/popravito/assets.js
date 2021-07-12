var fixmystreet = fixmystreet || {};

fixmystreet.pageController = {
    toPage: function(page, opts) {
        opts = opts || {};
        var $curr = $('.js-reporting-page--active');
        var $page;
        if (page === 'first') {
            $page = $('.js-reporting-page').first();
            page = $page.data('pageName');
        } else if (page === 'next') {
            if ($curr.data('pageName') === 'map') {
                if (!fixmystreet.reporting.selectedCategory().category) {
                    $page = $('.js-reporting-page').first();
                } else {
                    // It is possible for multiple map 'page' divs to exist if
                    // multiple layers shown. We only need one of them
                    $page = $curr.nextAll('.js-reporting-page:not(.js-reporting-page--skip,.js-reporting-page--map)').first();
                }
            } else {
                $page = $curr.nextAll('.js-reporting-page:not(.js-reporting-page--skip)').first();
            }
            page = $page.data('pageName');
        } else {
            $page = $('.js-reporting-page[data-page-name=' + page + ']');
        }
        if ($curr.data('pageName') === 'map' || $('#mob_ok:visible').length || opts.forceMapHide) {
            if ($("html").hasClass("mobile")) {
                $('#map_box').addClass('hidden-js');
                $('html').removeClass('only-map map-page');
            }
        }

        $curr.removeClass('js-reporting-page--active');
        $page.addClass('js-reporting-page--active');

        if ($page.data('pageName') === 'map' || opts.forceMapShow) {
            // We're going to bypass to the map for the next step, then come back here
            // Or we have clicked Back to the original map
            if ($("html").hasClass("mobile")) {
                $('#map_box').removeClass('hidden-js');
                $('html').addClass('only-map map-page');
            }
        }
        setTimeout(function() {
            $('html, body, #map_sidebar').scrollTop(0);
        }, 0);
        if (!opts.popstate && 'pushState' in history) {
            history.pushState({
                reportingPage: page
            }, null, '#' + page);
        }
        $(fixmystreet).trigger('report_new:page_change', [ $curr, $page ]);
    },
    mapStepButtons: function() {
        // We are now in the reporting flow, so set the page flag used for error display
        $('html').addClass('map-page');

        var $map_box = $('#map_box');
        var links = '<a href="#ok" id="mob_ok">' + translation_strings.ok + '</a>';
        if (fixmystreet.page !== 'new') {
            links = '<a href="#" class="js-back" id="problems_nearby">' + translation_strings.back + '</a>' + links;
        }
        $map_box.append('<p class="sub-map-links" id="mob_sub_map_links">' + links + '</p>');

        $('.mobile-map-banner span').text(translation_strings.right_place);

        // mobile user clicks 'ok' on map
        $('#mob_ok').click(function(e){
            e.preventDefault();
            var $page = $('.js-reporting-page--active');
            var first_page = $('.js-reporting-page').first().data('pageName');
            if ($page.data('pageName') === first_page || !$page.length) {
                // Either the original pin location, or the map 'page' was
                // removed while we had it open, due to e.g. clicking the map
                // in a totally different council. Show first step
                fixmystreet.pageController.toPage('first', {
                    forceMapHide: true
                });
            } else {
                // Something later, e.g. asset selection, move to next step
                fixmystreet.pageController.toPage('next');
            }
        });
    },
    addMapPage: function(layer) {
        var $map_page = $('#' + layer.id + '_map');
        if (!$map_page.length) {
            $map_page = $('<div data-page-name="map" class="js-reporting-page js-reporting-page--map" id="' + layer.id + '_map"></div>');
        }
        // Move the map page depending on if we are basing its appearance on the
        // answer to an extra question (so subcategories key is present) or not
        if (layer.fixmystreet.subcategories) {
            $map_page.insertAfter('#js-post-category-messages');
        } else {
            $map_page.insertBefore('#js-post-category-messages');
        }
    },
    addNextPage: function(name, $div) {
        $div.addClass('js-reporting-page');
        $div.attr('data-page-name', name);
        $div.append("<button class='btn btn--block btn--final js-reporting-page--next'>" + translation_strings.ok + "</button>");
        $('.js-reporting-page--active').after($div);
    }
};

alert('asset')