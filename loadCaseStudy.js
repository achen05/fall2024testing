// Media Slideshow
function renderMediaSlideshow(media) {
    if (!media || media.length === 0) return '';

    let thumbnails = media
        .map((item, index) => `
            <img class="thumbnail" src="${item.url}" alt="${item.alt || `Thumbnail ${index + 1}`}" data-index="${index}">
        `)
        .join('');

    return `
            <div class="media-slideshow-container">
            <img class="main-image modal-trigger" src="${media[0].url}" alt="${media[0].alt || 'Main Image'}">
            <div class="media-slideshow-buttons-container">
            <a class="button slideshow-button prev-btn"><</a>
            <div class="slideshow-counter">
                <span id="slideshow-current">1</span> / <span id="slideshow-total">${media.length}</span>
            </div>
            <a class="button slideshow-button next-btn">></a>
            </div>
            </div>
            <div class="thumbnail-grid">
                ${thumbnails}
            </div>
    `;
}

function setupSlideshow(media) {
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    const currentCounter = document.getElementById('slideshow-current');
    const totalCounter = document.getElementById('slideshow-total');
    
    let currentIndex = 0;

    function updateSlideshow(index) {
        currentIndex = (index + media.length) % media.length; // Loop index
        mainImage.src = media[currentIndex].url;
        mainImage.alt = media[currentIndex].alt || 'Main Image';
        currentCounter.textContent = currentIndex + 1; // Update counter (1-based index)
    }

    prevButton.addEventListener('click', () => updateSlideshow(currentIndex - 1));
    nextButton.addEventListener('click', () => updateSlideshow(currentIndex + 1));
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', (event) => {
            const index = parseInt(event.target.dataset.index, 10);
            updateSlideshow(index);
        });
    });
}




// Story

function renderStoryMedia(item) {
    if (item.type === 'video') {
        return `
            <div class="storyMedia-container">
                <video controls poster="${item.poster}" loading="lazy" preload="metadata" crossorigin="anonymous">
                    <source src="${item.url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <p>${item.caption}</p>
            </div>
        `;
    } else if (item.type === 'text') {
        return `
            <div class="storyMedia-container">
                <p>${item.content}</p>
            </div>
        `
    } else {
        return `
            <div class="storyMedia-container">
                <img class="modal-trigger" src="${item.url}" alt="${item.alt}">
                <p>${item.caption}</p>
            </div>
        `;
    }
}

function renderStory(project) {
    return `
        <div class="project-story">
            ${project.story.map(item => renderStoryMedia(item)).join('')}
        </div>
    `;
}


function renderMedia(project) {
    return `
         ${renderMediaSlideshow(project.media)}
    `;
}


// Paratext

function renderParatext(project) {
    return `
        <div class="paratext-container">
            <p class="">${project.title}</p>
            <p class="paratext-type">${project.type}</p>
     
        </div>
    `;
}



function renderError() {
    return `
        <div class="error-message">
            <h2>Project Not Found</h2>
            <p>The requested project could not be found</p>
        </div>
    `;
}

async function init() {
    const paratextContainer = document.getElementById("paratext-container");
    const mediaContainer = document.getElementById("media-container");
    const storyContainer = document.getElementById("story-container");

    if (!paratextContainer || !storyContainer || !mediaContainer) {
        console.error('Container element(s) not found');
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('project');

    try {
        const response = await fetch('projects-copy.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch projects data: ${response.status}`);
        }
        
        const projects = await response.json();
        
        if (projectId && projects[projectId]) {
            const project = projects[projectId];
            paratextContainer.innerHTML = renderParatext(project);
            mediaContainer.innerHTML = renderMedia(project);
            storyContainer.innerHTML = renderStory(project);
            document.title = `${project.title} - Case Study`;

            if (project.media && project.media.length > 0) {
                setupSlideshow(project.media); // Initialize slideshow after HTML is rendered
            }
        } else {
            paratextContainer.innerHTML = renderError();
            mediaContainer.innerHTML = renderError();
            storyContainer.innerHTML = renderError();
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        paratextContainer.innerHTML = renderError();
        mediaContainer.innerHTML = renderError();
        storyContainer.innerHTML = renderError();
    }
}

document.addEventListener('DOMContentLoaded', init);