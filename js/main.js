document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll-Driven Video Logic
    const video = document.getElementById("hero-video");
    const container = document.getElementById("hero-sticky-container");
    const fallbackImage = document.getElementById("hero-fallback-image");
    
    // Only execute if video exists on the page
    if (video && container) {
        
        // Function to check if the video has loaded enough to be seekable
        const setupScrollVideo = () => {
            // Once the video loads, we can hide the fallback image
            if (video.readyState >= 2 && fallbackImage && !video.error) {
                 fallbackImage.style.display = 'none'; // Ensure CSS transitions or just hide
            }
            
            // Calculate video scroll fraction
            window.addEventListener('scroll', () => {
                const containerRect = container.getBoundingClientRect();
                const containerTop = containerRect.top;
                const containerHeight = containerRect.height;
                const viewportHeight = window.innerHeight;
                
                // Effective scroll range within the sticky container
                // When containerTop = 0, scroll started
                // When containerTop = viewportHeight - containerHeight, scroll ended
                const scrollRange = containerHeight - viewportHeight;
                
                let scrollProgress = 0;
                
                if (containerTop <= 0 && containerTop >= -scrollRange) {
                    scrollProgress = Math.abs(containerTop) / scrollRange;
                } else if (containerTop < -scrollRange) {
                    scrollProgress = 1;
                }
                
                // Update video time based on progress
                if (video.duration && !isNaN(video.duration)) {
                    // Use requestAnimationFrame for smoother updates
                    window.requestAnimationFrame(() => {
                        const targetTime = scrollProgress * video.duration;
                        video.currentTime = targetTime;
                    });
                }
            });
        };
        
        // Fallback timeout in case video never triggers load
        let loadTimeout = setTimeout(() => {
            console.log("Video timeout: Keeping fallback image visible or handled manually.");
        }, 5000);

        video.addEventListener("loadedmetadata", () => {
             clearTimeout(loadTimeout);
             setupScrollVideo();
        });

        // Initialize immediately if it's already loaded metadata
        if (video.readyState >= 1) {
             clearTimeout(loadTimeout);
             setupScrollVideo();
        }
        
        // Handle video loading errors completely
        video.addEventListener('error', () => {
            console.warn("Hero video could not be loaded. Displaying fallback image. Please ensure assets/hero.mp4 exists.");
            if (fallbackImage) fallbackImage.style.display = 'block';
            if (container) container.style.height = '150vh';
        });
    }

    // 2. Active State Logic for Navbar
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const spanText = link.textContent.trim().toLowerCase();
        let targetTextMatches = false;
        if (currentPath === 'index.html' || currentPath === '') {
            // No strict highlight needed for Home unless they have 'Home' link.
        } else if (currentPath === 'produce.html' && spanText === 'produce') {
            targetTextMatches = true;
        } else if (currentPath === 'logistics.html' && spanText === 'logistics') {
            targetTextMatches = true;
        } else if (currentPath === 'sustainability.html' && spanText === 'sustainability') {
            targetTextMatches = true;
        } else if (currentPath === 'contact.html' && spanText === 'contact') {
            targetTextMatches = true;
        }

        if (targetTextMatches) {
            link.classList.remove('text-zinc-500', 'dark:text-zinc-400');
            link.classList.add('text-zinc-900', 'dark:text-zinc-50', 'font-bold', 'border-b', 'border-zinc-900', 'dark:border-zinc-50', 'pb-1');
        } else {
            link.classList.add('text-zinc-500', 'dark:text-zinc-400', 'hover:text-zinc-900', 'target-colors');
            link.classList.remove('text-zinc-900', 'dark:text-zinc-50', 'font-bold', 'border-b', 'border-zinc-900', 'dark:border-zinc-50');
        }
    });

});
