async function loadAndDisplayProjects() {
    try {
      const response = await fetch("projects.json");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const projectsData = await response.json();
      
      generateAbbreviated(projectsData);
      generateProjectsHTML(projectsData);
    } catch (error) {
      console.error("Failed to fetch projects data:", error);
    }
  }

function generateAbbreviated(data) {
    const projectsContainer = document.getElementById("abbreviated-projects-container");

    data.forEach((project, index) => {
        //project container
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project-abbreviated-container");

        const projectIndex = document.createElement("p");
        projectIndex.classList.add("project-index");
        projectIndex.textContent = index+1;
        projectDiv.appendChild(projectIndex);

        //information
        const projectInformation = document.createElement("a");
        projectInformation.classList.add("abbreviated-item");
        projectInformation.classList.add("button");
        projectInformation.href = project.link;
        projectDiv.appendChild(projectInformation);

        //title
        const title = document.createElement("p");
        title.classList.add("project-title");
        title.textContent = project.title;
        projectInformation.appendChild(title);

        //type
        const type = document.createElement("p");
        type.classList.add("project-type");
        type.textContent = project.type;
        projectInformation.appendChild(type);
        
        // Append project to main container
        projectsContainer.appendChild(projectDiv);
        
    });

    

}

function generateProjectsHTML(data) {
    const projectsContainer = document.getElementById("projects-container");

    data.forEach(project => {
      // Create project container
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("project-item-container");

      // Images
      const imagesDiv = document.createElement("div");
      imagesDiv.classList.add("project-item-gallery");
      project.images.forEach(image => {
        const img = document.createElement("img");
        img.classList.add("project-gallery-images");
        img.classList.add("modal-trigger");
        img.src = image.src;
        img.alt = image.alt;
        imagesDiv.appendChild(img);
      });
      projectDiv.appendChild(imagesDiv);

      //Information

      const projectInformation = document.createElement("div");
      projectInformation.classList.add("project-item-information");
      projectDiv.appendChild(projectInformation);



      // Title
      const title = document.createElement("p");
      title.classList.add("project-title");
      title.textContent = project.title;
      projectInformation.appendChild(title);

      // Type
      const type = document.createElement("p");
      type.classList.add("project-type");
      type.textContent = project.type;
      projectInformation.appendChild(type);

      // Description
      const description = document.createElement("p");
      description.classList.add("project-description");
      description.textContent = project.description;
      projectInformation.appendChild(description);

      // Link
      const link = document.createElement("a");
      link.classList.add("button");
      link.href = project.link;
      link.textContent = "View Full Project";
      projectDiv.appendChild(link);

      // Append project to main container
      projectsContainer.appendChild(projectDiv);
    });
  }

document.addEventListener("DOMContentLoaded", loadAndDisplayProjects);