// api.js has all the api calls the website makes

async function fetchProjects() {
    try {
      // Replace this URL with your API endpoint to fetch projects
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
  
      const projects = await response.json();
  
      const projectDropdown = document.getElementById('project-dropdown');
      projectDropdown.innerHTML = '';
  
      for (const project of projects) {
        const projectOption = document.createElement('a');
        projectOption.href = '#';
        projectOption.classList.add('dropdown-item');
        projectOption.textContent = project.name;
        projectOption.dataset.id = project.id;
        
        projectOption.addEventListener('click', (event) => {
          event.preventDefault();
          const projectButton = document.getElementById('project');
          projectButton.textContent = projectOption.textContent;
          projectButton.dataset.id = projectOption.dataset.id;
        });
  
        projectDropdown.appendChild(projectOption);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
async function fetchTimeEntries() {
try {
    const response = await fetch('/api/time-entries');
    if (!response.ok) {
        throw new Error('Failed to fetch time entries');
    }

    const timeEntries = await response.json();

    const timeEntriesTable = document.getElementById('time-entries');
    const tbody = timeEntriesTable.querySelector('tbody');
    tbody.innerHTML = '';

    for (const entry of timeEntries) {
        const row = document.createElement('tr');

        const projectCell = document.createElement('td');
        projectCell.textContent = entry.project;
        row.appendChild(projectCell);

        const hoursCell = document.createElement('td');
        hoursCell.textContent = entry.hours;
        row.appendChild(hoursCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = entry.date;
        row.appendChild(dateCell);

        tbody.appendChild(row);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

//fetch all time entries
export { fetchTimeEntries };
// Export the fetchProjects function
export { fetchProjects };


  