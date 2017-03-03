// source: http://stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery

function scrollToTop(scrollDuration, cb) {
    const   scrollHeight = window.scrollY,
            scrollStep = Math.PI / ( scrollDuration / 15 ),
            cosParameter = scrollHeight / 2;
    var     scrollCount = 0,
            scrollMargin;
    requestAnimationFrame(step);
    function step () {
        setTimeout(function() {
            if ( window.scrollY != 0 ) {
                    requestAnimationFrame(step);
                scrollCount = scrollCount + 1;
                scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
                window.scrollTo( 0, ( scrollHeight - scrollMargin ) );
            } else if (window.scrollY === 0) {
              cb && cb();
            }
        }, 15 );
    }
}

export default scrollToTop;
