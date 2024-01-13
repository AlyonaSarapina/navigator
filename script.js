let mediaStream;

async function requestVideoAccess() {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    const square = document.querySelector('.square')
    const videoElement = document.getElementById('video');

    square.style.display = "none"
    videoElement.style.display = "block"

    videoElement.srcObject = mediaStream;

  } catch (error) {
    console.error('Error requesting video access:', error.message);
  }
}

async function showNotification() {
  if ('Notification' in window && 'geolocation' in navigator) {
    if (Notification.permission === 'granted') {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const notification = new Notification('Your Location and Video/Audio Info', {
          body: `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}\nVideo and Audio capabilities supported.`,
        });

        notification.onclick = function () {
          console.log('Notification clicked');
        };

        setTimeout(function () {
          notification.close();
        }, 5000);

      } catch (error) {
        console.error('Error showing notification:', error.message);
      }
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          showNotification();
        }
      });
    }
  } else {
    console.log('Notification or Geolocation API not supported in this browser.');
  }
}