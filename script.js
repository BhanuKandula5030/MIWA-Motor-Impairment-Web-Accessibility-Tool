let currentSlide = 0;

function startGestureSetup() {
    document.querySelector('.welcome-screen').style.display = 'none';
    document.querySelector('.gesture-setup').style.display = 'block';
    navigateGestures(0); // Show the first gesture initially
}

function setOption(button, gesture) {
    // Get the parent container of the button (which is the gesture container)
    const container = button.parentElement;

    // Get the selected option within this gesture container
    const selectedOption = container.querySelector(`input[name=${gesture}-gesture]:checked`);

    // If an option is selected
    if (selectedOption) {
        // Get the label text of the selected option
        const selectedOptionText = selectedOption.nextElementSibling.textContent;

        // Show alert with the selected option
        alert(`Option "${selectedOptionText}" selected for ${gesture} gesture.`);

        // Enable forward arrow
        document.querySelector('.arrow.next').removeAttribute('disabled');
    } else {
        // If no option is selected, show an alert
        alert(`Please select an option for ${gesture} gesture.`);
        return; // Exit function if no option is selected
    }

    // Enable forward arrow if not on the last gesture
    if (currentSlide < document.querySelectorAll('.gesture-container').length - 1) {
        document.querySelector('.arrow.next').removeAttribute('disabled');
    } else {
        // Disable forward arrow if on the last gesture
        document.querySelector('.arrow.next').setAttribute('disabled', 'disabled');

        // Enable finish button for the last gesture
        document.querySelector('.finish-button').removeAttribute('disabled');
    }
}

function navigateGestures(direction) {
    const slides = document.querySelectorAll('.gesture-container');
    const totalSlides = slides.length;

    // Get the current gesture container
    const currentContainer = slides[currentSlide];

    // Get the selected option within the current gesture container
    const selectedOption = currentContainer.querySelector('input:checked');

    // If no option is selected and direction is forward
    if (!selectedOption && direction === 1) {
        // Show alert to select an option for the current gesture
        alert('Please select an option for the current gesture before proceeding.');
        return; // Exit the function
    }

    // Update current slide index based on direction
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    // Hide all slides
    slides.forEach(slide => {
        slide.style.display = 'none';
    });

    // Display the current slide
    slides[currentSlide].style.display = 'flex';

    // Disable backward arrow if on the first gesture
    if (currentSlide === 0) {
        document.querySelector('.arrow.prev').setAttribute('disabled', 'disabled');
    } else {
        document.querySelector('.arrow.prev').removeAttribute('disabled');
    }

    // Enable forward arrow if not on the last gesture
    if (currentSlide < totalSlides - 1) {
        document.querySelector('.arrow.next').removeAttribute('disabled');
    } else {
        // Disable forward arrow if on the last gesture
        document.querySelector('.arrow.next').setAttribute('disabled', 'disabled');
    }

    // Disable finish button if not on the last gesture
    if (currentSlide < totalSlides - 1) {
        document.querySelector('.finish-button').setAttribute('disabled', 'disabled');
    } else {
        // Enable finish button if on the last gesture and an option is set
        const lastSelectedOption = slides[currentSlide].querySelector('input:checked');
        if (lastSelectedOption) {
            document.querySelector('.finish-button').removeAttribute('disabled');
        }
    }
}

function finishSetup() {
    // Create a container to display the selected options
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('selected-options-container');

    // Display the options set for each gesture
    const gestures = document.querySelectorAll('.gesture');
    gestures.forEach(gesture => {
        const gestureName = gesture.querySelector('h2').textContent;
        const selectedOption = gesture.querySelector('input:checked + label');
        if (selectedOption) {
            const selectedOptionText = selectedOption.textContent;
            const optionItem = document.createElement('div');
            optionItem.classList.add('option-item');
            optionItem.innerHTML = `<p><strong>${gestureName}:</strong> ${selectedOptionText}</p>`;
            optionsContainer.appendChild(optionItem);
        }
    });

    // Create buttons for Go Back and Confirm
    const goBackButton = document.createElement('button');
    goBackButton.textContent = 'Go Back';
    goBackButton.classList.add('go-back-button');
    goBackButton.addEventListener('click', goBackToGestures);

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirm';
    confirmButton.classList.add('confirm-button');
    confirmButton.addEventListener('click', showConfirmationAlert);

    // Append the options container and buttons to the body
    document.body.appendChild(optionsContainer);
    optionsContainer.appendChild(goBackButton);
    optionsContainer.appendChild(confirmButton);

    // Hide the gesture setup screen
    document.querySelector('.gesture-setup').style.display = 'none';

    // Show the selected options container and buttons
    optionsContainer.style.display = 'block';
    goBackButton.style.display = 'block';
    confirmButton.style.display = 'block';
}

function goBackToGestures() {
    // Remove the selected options container and buttons
    const optionsContainer = document.querySelector('.selected-options-container');
    if (optionsContainer) {
        optionsContainer.remove();
    }
    const goBackButton = document.querySelector('.go-back-button');
    if (goBackButton) {
        goBackButton.remove();
    }
    const confirmButton = document.querySelector('.confirm-button');
    if (confirmButton) {
        confirmButton.remove();
    }

    // Show the gesture setup screen
    document.querySelector('.gesture-setup').style.display = 'block';
}

function showConfirmationAlert() {
    // Show an alert with a confirmation message
    alert('Thanks for setting your gestures!');
}
