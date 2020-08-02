app.Popup = class extends app.Component {
    constructor($this) {
        super($this);
        this.this = $this;
        this.popup_container = $this.find('.popup-content-container');
    }

    onReady($this) {
        this.toggler($this);
        this.initNiceScroll($this);

        $this.addClass('initialized');
    }

    open() {
        this.this.trigger('open');
    }

    close() {
        this.this.trigger('close');
    }

    toggler($this) {
        $this.on('open', () => {
            $this.addClass('initialized');

            $('body > [data-component="popup"]').trigger('close');
            $this.addClass('active');
            $('body #body-container').addClass('popup-overlay');

            setTimeout(() => {
                this.popup_container.getNiceScroll().resize();
            }, 200);
        });

        $this.on('close', () => {
            $this.removeClass('active');
            $this.find('[data-required][required]').removeAttr('required');
            $('body #body-container').removeClass('popup-overlay');
        });

        $this.on('destroy', () => {
            $this.remove();
        });

        $this.find('[data-popup-close]').on('click', () => {
            $this.trigger('close');
        });

        $this.on('click', (e) => {
            if (!$(e.target).is('.popup-content-container, .popup-content-container *')) {
                $this.trigger('close');
            }
        });
    }

    initNiceScroll($this) {
        let delay = null;

        $(window).on('resize', () => {
            if (delay) {
                clearTimeout(delay);
                delay = null;
            }

            if (!app.isMobile) {
                this.popup_container.getNiceScroll().remove();
            } else {
                delay = setTimeout(() => {
                    app.initNiceScroll(this.popup_container, true);
                }, 500);
            }
        });
    }
}