document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskTitle = document.getElementById("task-title");
    const taskDesc = document.getElementById("task-desc");
    const taskDue = document.getElementById("task-due");
    const tasksList = document.getElementById("tasks");

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addTask(taskTitle.value, taskDesc.value, taskDue.value);
        taskTitle.value = ""; // Clear the title input field
        taskDesc.value = ""; // Clear the description input field
        taskDue.value = ""; // Clear the due date input field
    });

    //add task function
    function addTask(title, description, due) {
        const taskItem = document.createElement("li");
    
        // Create a container for task details
        const taskDetails = document.createElement("div");
    
        // Add title and ensure it's in uppercase
        const taskTitleElement = document.createElement("strong");
        taskTitleElement.textContent = title.toUpperCase();
    
        // Add description
        const taskDescElement = document.createElement("p");
        taskDescElement.textContent = description;
    
        // Add due date/time
        const taskDueElement = document.createElement("small");
        taskDueElement.textContent = `Due: ${new Date(due).toLocaleString()}`;
    
        taskDetails.appendChild(taskTitleElement);
        taskDetails.appendChild(taskDescElement);
        taskDetails.appendChild(taskDueElement);
    
        // Get the selected image type
        const taskImage = document.getElementById("task-image").value;
    
        // Create and add the image to the task
        const imgElement = document.createElement("img");
        imgElement.src = getImageSrc(taskImage);
        imgElement.alt = taskImage;
    
        taskItem.appendChild(imgElement);
        taskItem.appendChild(taskDetails);
    
        // Add status selector and delete button
        const statusSelect = document.createElement("select");
        const statuses = ["Undone", "Pending", "Complete"];
        statuses.forEach(status => {
            const option = document.createElement("option");
            option.value = status.toLowerCase();
            option.textContent = status;
            statusSelect.appendChild(option);
        });
    
        statusSelect.addEventListener("change", () => {
            taskItem.className = statusSelect.value;
            switch (statusSelect.value) {
                case "complete":
                    taskItem.style.backgroundColor = "#90EE90"; // light green
                    break;
                case "pending":
                    taskItem.style.backgroundColor = "#FFFF6E"; // light yellow
                    break;
                case "undone":
                    taskItem.style.backgroundColor = "#FF7F7F"; // light red
                    break;
                default:
                    taskItem.style.backgroundColor = "#f2f2f3"; // default
            }
        });
    
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", (e) => {
            e.stopPropagation();
            tasksList.removeChild(taskItem);
        });
    
        taskItem.appendChild(statusSelect);
        taskItem.appendChild(deleteButton);
    
        tasksList.appendChild(taskItem);
    }
    
    function getImageSrc(type) {
        // Return the image source URL based on the task type
        switch (type) {
            case "work":
                return "images/work.png"; // Example path
            case "shopping":
                return "images/shopping.png";
            case "exercise":
                return "images/exercise.png";
            // Add more cases for different task types
            default:
                return "images/default.png"; // Fallback image
        }
    }    
    
        // Function to apply styles to the task description
        window.applyStyle = function(style) {
            const selectedText = getSelectedText();
            if (!selectedText) return;
    
            let styledText;
            switch (style) {
                case 'bold':
                    styledText = `<strong>${selectedText}</strong>`;
                    break;
                case 'italic':
                    styledText = `<em>${selectedText}</em>`;
                    break;
                case 'heading':
                    styledText = `<h3>${selectedText}</h3>`;
                    break;
                case 'code':
                    styledText = `<code>${selectedText}</code>`;
                    break;
                case 'superscript':
                    styledText = `<sup>${selectedText}</sup>`;
                    break;
                case 'subscript':
                    styledText = `<sub>${selectedText}</sub>`;
                    break;
                default:
                    styledText = selectedText;
            }
    
            insertTextAtCursor(taskDesc, styledText);
        };
    
        function getSelectedText() {
            const textarea = taskDesc;
            return textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
        }
    
        function insertTextAtCursor(textarea, text) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const before = textarea.value.substring(0, start);
            const after = textarea.value.substring(end);
            textarea.value = before + text + after;
        }
});

//video background
document.addEventListener("DOMContentLoaded", () => {
    const videoElement = document.getElementById('background-video');
    const videoSources = ['video1.mp4', 'video2.mp4', 'video3.mp4']; // List of video files
    let currentVideoIndex = 0;

    videoElement.addEventListener('ended', () => {
        currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
        videoElement.src = videoSources[currentVideoIndex];
        videoElement.play();
    });

    // Optional: Preload next video to ensure smooth transition
    const preloadNextVideo = () => {
        const nextVideoIndex = (currentVideoIndex + 1) % videoSources.length;
        const nextVideo = document.createElement('video');
        nextVideo.preload = 'auto';
        nextVideo.src = videoSources[nextVideoIndex];
        nextVideo.load();
    };

    videoElement.addEventListener('play', preloadNextVideo);
});

//search input section
document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskTitle = document.getElementById("task-title");
    const taskDesc = document.getElementById("task-desc");
    const taskDue = document.getElementById("task-due");
    const taskImageUpload = document.getElementById("task-image-upload");
    const tasksList = document.getElementById("tasks");
    const searchBar = document.getElementById("search-bar");

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addTask(taskTitle.value, taskDesc.value, taskDue.value, taskImageUpload.files[0]);
        taskTitle.value = "";
        taskDesc.value = "";
        taskDue.value = "";
        taskImageUpload.value = ""; // Clear the file input
    });

    searchBar.addEventListener("input", () => {
        const searchTerm = searchBar.value.toLowerCase();
        filterTasks(searchTerm);
    });

    function addTask(title, description, due, imageFile) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        const taskDetails = document.createElement("div");

        const taskTitleElement = document.createElement("strong");
        taskTitleElement.textContent = title.toUpperCase();

        const taskDescElement = document.createElement("p");
        taskDescElement.textContent = description;

        const taskDueElement = document.createElement("small");
        taskDueElement.textContent = `Due: ${new Date(due).toLocaleString()}`;

        taskDetails.appendChild(taskTitleElement);
        taskDetails.appendChild(taskDescElement);
        taskDetails.appendChild(taskDueElement);

        if (imageFile) {
            const imgElement = document.createElement("img");
            imgElement.src = URL.createObjectURL(imageFile);
            imgElement.alt = "Task Image";
            taskItem.appendChild(imgElement);
        }

        taskItem.appendChild(taskDetails);

        const statusSelect = document.createElement("select");
        const statuses = ["Undone", "Pending", "Complete"];
        statuses.forEach(status => {
            const option = document.createElement("option");
            option.value = status.toLowerCase();
            option.textContent = status;
            statusSelect.appendChild(option);
        });

        statusSelect.addEventListener("change", () => {
            taskItem.className = statusSelect.value;
            switch (statusSelect.value) {
                case "complete":
                    taskItem.style.backgroundColor = "#d4edda"; // light green
                    break;
                case "pending":
                    taskItem.style.backgroundColor = "#fff3cd"; // light yellow
                    break;
                case "undone":
                    taskItem.style.backgroundColor = "#f8d7da"; // light red
                    break;
                default:
                    taskItem.style.backgroundColor = "#fff"; // default
            }
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", (e) => {
            e.stopPropagation();
            tasksList.removeChild(taskItem);
        });

        taskItem.appendChild(statusSelect);
        taskItem.appendChild(deleteButton);

        tasksList.appendChild(taskItem);
    }

    function filterTasks(searchTerm) {
        const taskItems = tasksList.getElementsByClassName("task-item");
        Array.from(taskItems).forEach(taskItem => {
            const title = taskItem.querySelector("strong").textContent.toLowerCase();
            const description = taskItem.querySelector("p").textContent.toLowerCase();
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                taskItem.style.display = "";
            } else {
                taskItem.style.display = "none";
            }
        });
    }
});