// Fetch data from external JSON file
var courseslength = 0;
fetch('../courses.json')
  .then(response => response.json())
  .then(data => {
    // Get container element
    var coursesRow = document.getElementById('coursesRow');
    courseslength = 12 / (data.courses.length);

    // Generate course items dynamically
    data.filteredCourses = data.courses; // Store original courses for filtering
    data.filteredLevel = 'all';
    data.filteredSemester = 'all';
    data.filteredCategory = 'all';

    data.filteredCourses.forEach(course => {
      coursesRow.innerHTML += generateCourseItem(course);
    });

    // Event listeners for filters
    var levelFilter = document.getElementById('levelFilter');
    var semesterFilter = document.getElementById('semesterFilter');
    var categoryFilter = document.getElementById('categoryFilter');

    levelFilter.addEventListener('change', () => {
      data.filteredLevel = levelFilter.value;
      filterCourses(data);
    });

    semesterFilter.addEventListener('change', () => {
      data.filteredSemester = semesterFilter.value;
      filterCourses(data);
    });

    categoryFilter.addEventListener('change', () => {
      data.filteredCategory = categoryFilter.value;
      filterCourses(data);
    });
  })
  .catch(error => console.error('Error fetching data:', error));

/* ========================= Filter ====================== */
function filterCourses(data) {
    var filteredCourses = data.courses.filter(course => {
      return (data.filteredLevel === 'all' || course.level === data.filteredLevel) &&
             (data.filteredSemester === 'all' || course.semester === data.filteredSemester) &&
             (data.filteredCategory === 'all' || course.course_details.category === data.filteredCategory);
    });
  
    var coursesRow = document.getElementById('coursesRow');
    coursesRow.innerHTML = '';
  
    if (filteredCourses.length === 0) {
      coursesRow.innerHTML = '<p class="text-muted text-center">No courses available for these filters</p>';
    } else {
      filteredCourses.forEach(course => {
        coursesRow.innerHTML += generateCourseItem(course);
      });
    }
  }



/* ===================================== Function to generate course items ================== */ 

function generateCourseItem(course) {
  const maxLength = 100;
  // Truncate the description if it exceeds the maximum length
  const truncatedDescription = course.course_details.description.length > maxLength ?
    course.course_details.description.substring(0, maxLength) + '...' :
    course.course_details.description;

  return `
    <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
      <div class="course-item mb-5">
        <img style="width: fit-content; height: 300px;" src="${course.course_details.image}" class="img-fluid" alt="Course Image">
        <div class="course-content">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h4>${course.course_details.category}</h4>
            <p class="price">${course.course_details.course_fee}</p>
          </div>
          <h3><a href="course-details.html" class="course-title" onclick="saveCourseTitle(event, '${course.course_details.title}')">${course.course_details.title}</a></h3>
          <p>${truncatedDescription}</p>
          <div class="trainer d-flex justify-content-between align-items-center">
            <div class="trainer-profile d-flex align-items-center">
              <img src="${course.course_details.trainerImage}" class="img-fluid" alt="Trainer Image">
              <span>${course.course_details.trainer}</span>
            </div>
            <div class="trainer-rank d-flex align-items-center">
              <i class="bx bx-user"></i>&nbsp;${50 - course.course_details.available_seats}
              &nbsp;&nbsp;
              <i class="bx bx-heart"></i>&nbsp;${course.course_details.likes}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Function to save course title to local storage
function saveCourseTitle(event, title) {
  localStorage.setItem('selectedCourse', title);
}
