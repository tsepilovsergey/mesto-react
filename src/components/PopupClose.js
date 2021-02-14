import React from 'react';

function PopupClose(props) {
    const { children, ...rest } = props;

    React.useEffect(() => {
        function pushKey(event) {
            if (event.key === "Escape") {
                children.props.onClose();
            }
        }

        function closeOverlay(event) {
            if (event.target.classList.contains('popup_opened')) {
                children.props.onClose();
            }
        }

        document.addEventListener('click', closeOverlay);
        document.addEventListener('keydown', pushKey);

        return () => {
            document.removeEventListener('click', closeOverlay);
            document.removeEventListener('keydown', pushKey);
        }
    }, [children]);

    return <> {React.cloneElement(children, { ...rest })} </>
}

export default PopupClose;
