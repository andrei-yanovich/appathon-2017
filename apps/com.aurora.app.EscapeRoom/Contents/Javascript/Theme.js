// Set base glow and focus theme, if you use the default theming/styling
Theme.set({
    BaseGlow: { // This is the CSS classname that is applied in the HTML
        styles: { // These are the default styles
            // These are normal CSS properties in JS notation
            color: '#F1F1F1', // Always use the long version here, not #CCC for example
            backgroundColor: '#999999'
        }
    },
    BaseFocus: {
        styles: {
            backgroundColor: '#5F429C'
        }
    },
    AppWelcome: {
        styles: {
            backgroundImage: 'Images/Screen0.1.png',
            'background-repeat': 'no-repeat',
            'background-size': 'cover'
        }
    },
    RoomSelector: {
        styles: {
            backgroundImage: 'Images/Screen0.2.png',
            'background-repeat': 'no-repeat',
            'background-size': 'cover'
        }
    },
    GoT: {
        styles: {
            backgroundImage: 'Images/Screen0.2.png',
        }
    }
});
