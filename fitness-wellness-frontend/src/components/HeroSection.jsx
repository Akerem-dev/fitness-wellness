
import React from 'react';

function HeroSection() {
    return (
        <section
            id="home"
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/natura-header-bg.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '2rem 5rem',
                color: 'white',
            }}
        >
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(5px)',
                zIndex: 1,
            }} />
            <div style={{ position: 'relative', maxWidth: '600px', zIndex: 2 }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem', lineHeight: 1.1 }}>
                    Transform Your Body & Mind with NaturaFitness
                </h1>
                <p style={{ fontSize: '1.25rem', maxWidth: '500px' }}>
                    Join our community and start your fitness journey today with expert guidance and personalized plans.
                </p>
            </div>
        </section>
    );
}

export default HeroSection;
