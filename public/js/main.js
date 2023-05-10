// main.js

import { fetchProjects, fetchTimeEntries } from './api.js';
import { addFormSubmitListener, addCreateProjectClickListener, addBackButtonClickListener } from './listeners.js';

async function populateProjects() {
    const projects = await fetchProjects();
    
    const projectSelect = document.getElementById('project');
  
    // Clear the existing options in the project select element
    projectSelect.innerHTML = '';
  
    // Add an "Add project" option to the project select element
    const addProjectOption = document.createElement('option');
    addProjectOption.value = 'add-project';
    addProjectOption.text = 'Add project';
    projectSelect.add(addProjectOption);
  
    // Add an option for each project to the project select element
    for (const project of projects) {
      const option = document.createElement('option');
      option.value = project.id;
      option.text = project.name;
      projectSelect.add(option);
    }
  }


// Call the populateProjects function when the page loads
populateProjects();

// Call the event listener functions
addFormSubmitListener();
addCreateProjectClickListener();
addBackButtonClickListener();

// Call the fetchTimeEntries function to populate the time entries table when the page loads
fetchTimeEntries();
