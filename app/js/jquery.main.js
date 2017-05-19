( function(){

    $( function(){

        $.each( $( '.header__mobile-wrap' ), function() {
            new Menu ( $( this ) );
        } );

        $.each( $( '.hero_swipe' ), function() {
            new Slider ( $( this ) );
        } );

        $.each( $( '.search' ), function() {
            new Search ( $( this ) );
        } );

        $.each( $( '.projects' ), function() {
            new Slider ( $( this ) );
        } );

        $.each( $( '.portfolio' ), function() {
            new Slider ( $( this ) );
        } );

        $.each( $( '#map' ), function() {
            new Map ( $( this ) );
        } );

        $.each( $( '.leadership' ), function() {
            new Leadership ( $( this ) );
        } );

        $.each( $( '.category' ), function() {
            new CategoryTabs ( $( this ) );
        } );

    } );

    var Leadership = function( obj ){

        //private properties
        var _obj = obj,
            _person = _obj.find( '.leadership__item' ),
            _window = $( window ),
            _chosen = 'leadership__item_chosen';

        //private methods
        var _constructor = function(){
                _onEvents();
            },
            _onEvents = function(){

                _window.on( 'resize', function () {

                    var activeItem = _obj.find( '.leadership__item_chosen' );

                    _sizeInfo( activeItem );

                } );

                _person.on( 'click', function () {

                    var curElement = $( this );

                    if ( curElement.hasClass( _chosen ) ){

                        _inactiveInfo( curElement );

                    } else {

                        _sizeInfo( curElement );

                    }
                    return false;

                } );

            },
            _sizeInfo = function ( element ) {

                var curElement = element,
                    curInfo = curElement.find( '.leadership__info' ),
                    leftIndent = curElement.offset().left * -1,
                    rightIndent = ( _window.width() + leftIndent - curElement.width() ) * -1;

                _person.removeClass( _chosen );
                _person.css( 'margin-bottom', 18 );

                curElement.addClass( _chosen );
                curInfo.css( { left: leftIndent, right: rightIndent } );
                curElement.css( 'margin-bottom', curInfo.height() + 18 );
                return false;

            },
            _inactiveInfo = function ( element ) {

                var curElement = $( element );

                curElement.removeClass( _chosen );
                curElement.css( 'margin-bottom', 18 );

            };

        //public properties

        //public methods

        _constructor();

    };

    var Map = function (obj) {

        //private properties
        var _obj = obj,
            _mapData = _obj.data('map'),
            _myMap, _myPlacemark;

        //private methods
        var _onEvent = function(){

                _initMap();
                _initPlaces();

            },
            _initMap = function(){

                _myMap = new ymaps.Map('map', {
                    center: _mapData.center,
                    zoom: _mapData.zoom
                }, {
                    searchControlProvider: 'yandex#search'
                });

                //_myMap.behaviors.disable(['drag', 'scrollZoom'])

            },
            _initPlaces = function(){

                for ( var i=0; i < _mapData.points.length; i++ ){

                    _myPlacemark = new ymaps.Placemark( _mapData.points[i].place, {
                        balloonContent: _mapData.points[i].balloon
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: _mapData.points[i].img,
                        iconImageSize: _mapData.points[i].imgSize
                    });

                    _myMap.geoObjects.add(_myPlacemark);

                }

            },
            _init = function() {
                ymaps.ready(_onEvent);
            };

        //public properties

        //public methods


        _init();
    };

    var Menu = function( obj ){

        //private properties
        var _obj = obj,
            _sumMenu = $( '.menu__link' ),
            _btn = $( '.header__mobile-btn' ),
            _html = $( 'html' );

        //private methods
        var _constructor = function(){
                _onEvents();
            },
            _onEvents = function(){

                _btn.on( 'click', function() {

                    if ( $( this).hasClass( 'close' ) ){
                        _closeMenu();
                    } else {
                        _openMenu();
                    }

                } );

                _sumMenu.on( 'click', function () {

                    if ( $( this ).next( 'ul' ).css( 'display' ) == 'block' ){
                        $( this ).next( 'ul' ).slideUp(300);
                        return false;
                    } else {
                        $( this ).next( 'ul' ).slideDown(300);
                        return false;
                    }

                } )

            },
            _openMenu = function(){
                _btn.addClass( 'close' );
                _obj.addClass( 'visible' );
                _html.css( 'overflow-y', 'hidden' );
            },
            _closeMenu = function(){
                _btn.removeClass( 'close' );
                _obj.removeClass( 'visible' );
                _html.css( 'overflow-y', 'visible' );
            };

        //public properties

        //public methods

        _constructor();

    };

    var CategoryTabs = function( obj ){

        //private properties
        var _obj = obj,
            _links = _obj.find( '.category__link' ),
            _wrap = $( '.category__wrap' ),
            _item = _wrap.find( '.category__item' ),
            _window = $( window );

        //private methods
        var _constructor = function(){
                _onEvents();
                _numberItems();
                _activeTab( 0 );
            },
            _numberItems = function () {

                _links.each( function () {

                    var curElem = $( this );

                    curElem.attr( 'data-number', curElem.index() )

                } );

                _item.each( function () {

                    var curElem = $( this );

                    curElem.attr( 'data-number', curElem.index() )

                } );

            },
            _activeTab = function ( number ) {

                var curNumber = number,
                    curElem = _links.filter( '[data-number="'+ curNumber +'"]' ),
                    curTab = _item.filter( '[data-number="'+ curNumber +'"]' );

                _links.removeClass( 'active' );
                _item.removeClass( 'active' );

                _wrap.css( 'height', curTab.height() );

                curElem.addClass( 'active' );
                curTab.addClass( 'active' );

            },
            _onEvents = function(){

                _links.on( 'click', function() {

                    var curElem = $( this ),
                        curNumber = curElem.data( 'number' );

                    _activeTab( curNumber );

                    return false;

                } );

                _window.on( 'resize', function () {

                    var activeItem = _wrap.find( '.active' ).data( 'number' );

                    console.log( activeItem )

                    _activeTab( activeItem );

                } )
                
            };

        //public properties

        //public methods

        _constructor();

    };

    var Search = function( obj ){

        //private properties
        var _obj = obj,
            _btn = _obj.find( '.search__btn' ),
            _form = _obj.find( '.search__form' ),
            _close = _obj.find( '.search__close' ),
            _body = $( 'body' );

        //private methods
        var _constructor = function(){
                _onEvents();
            },
            _onEvents = function(){

                _body.on( 'click', function() {
                    _closeForm();
                } )

                _obj.on( 'click', function( e ) {
                    e.stopPropagation();
                } );

                _btn.on( 'click', function() {

                    _openForm();
                    return false;

                } );

                _close.on( 'click', function() {
                    _closeForm();
                } );

            },
            _openForm = function(){
                _form.addClass( 'visible' );

                _form.css( 'width', _body.width() - ( _body.width() - _obj.offset().left - _obj.width() ) * 2 )

            },
            _closeForm = function(){
                _form.removeClass( 'visible' );
            };

        //public properties

        //public methods

        _constructor();

    };

    var Slider = function( obj ) {

        //private properties
        var _obj = obj,
            _heroSlider = _obj.find( '.hero__swipe' ),
            _projectsSlider = _obj.find( '.projects__swipe' ),
            _portfolioSlider = _obj.find( '.portfolio__swipe' ),
            _heroItem = _obj.find( '.hero__item' ),
            _portfolioItem = _obj.find( '.portfolio__item' ),
            _portfolioMainImg = _obj.find( '.portfolio__main-img' ),
            _heroPagination = _obj.find( '.hero__pagination' ),
            _projectsPrevButton = _obj.find( '.projects__button-prev' ),
            _portfolioPrevButton = _obj.find( '.portfolio__button-prev' ),
            _projectsNextButton = _obj.find( '.projects__button-next' ),
            _portfolioNextButton = _obj.find( '.portfolio__button-next' ),
            _hero,
            _projects,
            _portfolio;

        //private methods
        var _initSlider = function() {

                _hero = new Swiper ( _heroSlider, {
                    setWrapperSize: true,
                    autoplay: false,
                    speed: 500,
                    effect: 'slide',
                    slidesPerView: 1,
                    loop: true,
                    autoplayDisableOnInteraction: false,
                    pagination: _heroPagination,
                    paginationClickable: true,
                    paginationBulletRender: function ( i, className ) {
                        var slide = _heroItem.eq( i ),
                            slideTitle = slide.data( 'title' );
                        return '<span class="' + className + '"> '+ slideTitle +' </span>';
                    }
                } );

                _projects = new Swiper ( _projectsSlider, {
                    setWrapperSize: true,
                    autoplay: false,
                    speed: 500,
                    effect: 'slide',
                    slidesPerView: 3,
                    loop: true,
                    spaceBetween: 18,
                    autoplayDisableOnInteraction: false,
                    prevButton: _projectsPrevButton,
                    nextButton: _projectsNextButton,
                    breakpoints: {
                        767: {
                            slidesPerView: 1,
                            spaceBetween: 0
                        },
                        1200: {
                            slidesPerView: 2
                        }
                    }
                } );

                _portfolio = new Swiper ( _portfolioSlider, {
                    setWrapperSize: true,
                    autoplay: false,
                    speed: 500,
                    effect: 'slide',
                    slidesPerView: 4,
                    loop: true,
                    spaceBetween: 2,
                    autoplayDisableOnInteraction: false,
                    prevButton: _portfolioPrevButton,
                    nextButton: _portfolioNextButton,
                    onInit: function() {

                        var curItem = _portfolioSlider.find( '.swiper-slide-active' );

                        curItem.addClass( 'active' );

                        _portfolioMainImg.html( '<img src="'+ curItem.data( 'img' ) +'" alt="img" />' )

                    }
                } );

            },
            _onEvent = function() {

                _portfolioItem.on( 'click', function () {

                    var curItem = $( this );

                    _portfolioItem.removeClass( 'active' );
                    curItem.addClass( 'active' );

                    _portfolioMainImg.html( '<img src="'+ curItem.data( 'img' ) +'" alt="img" />' )

                } )

            },
            _init = function() {
                _initSlider();
                _onEvent();
            };

        //public properties

        //public methods

        _init();
    };

} )();