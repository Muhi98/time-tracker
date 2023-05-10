// listeners.js
// has all button listeners
import { fetchTimeEntries } from "./api.js";

function addFormSubmitListener() {
    document.getElementById('add-time-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        console.log("submit clicked");
      
        const project = document.getElementById('project').value;
        const hours = document.getElementById('hours').value;
        const date = document.getElementById('date').value;
      
        // Send the data to the server
        try {
          const response = await fetch('/api/time-entries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ project, hours, date }),
          });
      
          if (!response.ok) {
            throw new Error('Failed to add time entry');
          }
      
          // Clear the input fields after successful submission
          document.getElementById('project').value = '';
          document.getElementById('hours').value = '';
          document.getElementById('date').value = '';
      
          // You can also refresh the time entries list here, if needed
        } catch (error) {
          console.error('Error:', error);
        }
      fetchTimeEntries();
    });
  }
  
  function addCreateProjectClickListener() {
    document.getElementById('create_project').addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = '/create_project';
      console.log("create new project clicked!");
    });
  }
  
  function addBackButtonClickListener() {
    const backButton = document.getElementById('back');
    if (backButton) {
      backButton.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = '/';
        console.log("backbutton clicked!");
      });
    }
  }
  
  // Export the event listener functions
  export { addFormSubmitListener, addCreateProjectClickListener, addBackButtonClickListener };
  