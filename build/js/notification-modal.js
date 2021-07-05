window.$ = window.jQuery = jQuery;

function NotificationModal()
{
    this.modal = $('.notification-modal');
    this.message = $('.notification-modal-message', this.modal);

    this.showModal = function(message)
    {
        this.message.text(message);

        this.modal.addClass('active');

        setTimeout(function()
        {
            this.modal.removeClass('active');
        }.bind(this), 3000);
    }
}

const notificationModal = new NotificationModal();