const WelcomeBanner = ({ firstName, isReturning }) => {
    const greeting = isReturning ? 'Welcome Back' : 'Welcome';
    const separator = firstName ? ', ' : '!';

    return (
        <section>
            <h3 data-testid="greeting">{`${greeting}${separator}${
                firstName || ''
            }`}</h3>
        </section>
    );
};

export default WelcomeBanner;
