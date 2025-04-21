document.querySelector('.back').addEventListener('click', function() 
{window.location.href = 'index.html'})

const markerInfo = {
    one: {
      address: "Trabrennstraße 2",
      available: 4
    },
    two: {
      address: "Schrotzbergstraße 1",
      available: 2
    },
    three: {
      address: "Vorgartenstraße 5",
      available: 1
    }
  };

  document.querySelectorAll('.location').forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      
      // Remove active class from all markers first
      document.querySelectorAll('.location').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Get the info for this specific marker
      const info = markerInfo[this.id];
      
      // Update the info container content
      document.querySelector('#address p').textContent = info.address;
      document.querySelector('#available p').textContent = `Available: ${info.available}`;
      
      // Show the container and activate marker
      document.querySelector('.info').classList.add('visible');
      this.classList.add('active');
    });
  });
  
  // Close when clicking outside
  document.addEventListener('click', function(e) {
    const infoContainer = document.querySelector('.info');
    const markers = document.querySelectorAll('.location');
    
    if (!infoContainer.contains(e.target)) {
      infoContainer.classList.remove('visible');
      markers.forEach(btn => btn.classList.remove('active'));
    }
  });